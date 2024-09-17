// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import { PrismaClient } from '@prisma/client/extension';

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        contactNumber: { label: 'Contact Number', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await prisma.donor.findUnique({
          where: { contactNumber: credentials?.contactNumber },
        });

        if (user && credentials?.password) {
          const isValid = await compare(credentials.password, user.password);
          if (isValid) {
            return user;
          }
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
});
