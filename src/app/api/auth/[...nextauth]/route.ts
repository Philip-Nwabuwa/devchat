import User from "@/app/models/user";
import { connectMongoDB } from "@/lib/mongodb";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: {
    strategy: "jwt" as const,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},

      async authorize(credentials: any) {
        const user = { id: "1" };
        return user;
      },
    }),
  ],

  callbacks: {
    async signIn(user: any) {
      if (user.account?.provider === "google") {
        const { name, email, image } = user.user;
        try {
          await connectMongoDB();
          const userExists = await User.findOne({ email });
          if (!userExists) {
            const data = await fetch("http://localhost:3000/api/user", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name,
                email,
                image,
              }),
            });

            if (data.ok) {
              return user;
            }
          }
        } catch (error) {
          console.error(error);
        }
      }

      return user;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    // signOut: "/auth/signout",
    // error: "/auth/error",
    // verifyRequest: "/auth/verify-request",
    // newUser: "/auth/new-user",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
