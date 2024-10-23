import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { verify } from "argon2";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        contactNumber: { label: "Contact Number", type: "text" },
        password: { label: "Password", type: "password" },
        userType: { label: "User Type", type: "text" },
      },
      async authorize(credentials) {
        if (
          !credentials?.contactNumber ||
          !credentials?.password ||
          !credentials?.userType
        ) {
          return null;
        }

        let user;
        if (credentials.userType === "admin") {
          user = await prisma.admin.findUnique({
            where: { contactNumber: credentials.contactNumber },
            select: {
              id: true,
              contactNumber: true,
              name: true,
              password: true,
              barangayId: true,
              barangay: {
                select: {
                  name: true,
                },
              },
            },
          });
        } else if (credentials.userType === "donor") {
          user = await prisma.donor.findUnique({
            where: { contactNumber: credentials.contactNumber },
          });
        } else {
          return null;
        }

        if (!user) {
          return null;
        }

        const isPasswordValid = await verify(
          user.password,
          credentials.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id.toString(),
          contactNumber: user.contactNumber,
          name: user.name,
          userType: credentials.userType,
          brgyName: user.barangay?.name || null,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.userType = user.userType;
        token.contactNumber = user.contactNumber;
        token.brgyName = user.brgyName;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name,
        userType: token.userType,
        contactNumber: token.contactNumber,
        brgyName: token.brgyName,
      };
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/api/auth/signout",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
