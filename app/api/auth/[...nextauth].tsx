import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import { PrismaClient } from '@prisma/client';

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
        const donor = await prisma.donor.findUnique({
          where: { contactNumber: credentials?.contactNumber },
        });

        if (donor && credentials?.password) {
          const isValid = await compare(credentials.password, donor.password);
          if (isValid) {
            return {
              id: donor.id.toString(),
              name: donor.name,
              orgName: donor.orgName,
              contactNumber: donor.contactNumber,
              address: donor.address,
              password: donor.password,
            };
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
