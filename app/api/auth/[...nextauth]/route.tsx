import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        contactNumber: { label: "Contact Number", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" }, // Either 'donor' or 'admin'
      },
      async authorize(credentials) {
        const { contactNumber, password, role } = credentials;

        let user;

        // Check which role is trying to log in (Donor or Admin)
        if (role === "donor") {
          user = await prisma.donor.findUnique({
            where: { contactNumber },
          });
        } else if (role === "admin") {
          user = await prisma.admin.findUnique({
            where: { contactNumber },
          });
        } else {
          throw new Error("Invalid role");
        }

        // If user not found
        if (!user) {
          throw new Error("User not found");
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        // Return user data on successful authentication
        return {
          id: user.id,
          contactNumber: user.contactNumber,
          role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Optional: Custom sign-in page
  },
});

// Export named handlers for GET and POST requests
export { handler as GET, handler as POST };
