import dbConnect from "../database/mongodb";
import User from "@/models/user";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
export async function login(credentials: any) {
  try {
    const { email, password } = credentials;
    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid password");
    }
    if (!user.isVerified) {
      throw new Error("Email not verified");
    }
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const authOptions: any = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err: any) {
          console.log(err);
          throw new Error(err.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
      trigger,
      session,
    }: {
      token: any;
      user: any;
      trigger: any;
      session: any;
    }) {
      if (trigger == "update") {
        return { ...token, ...session.user };
      }
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.id = user.id;
        token.address = user.address;
        token.phone = user.phone;
        token.isVerified = user.isVerified;
        token.role = user.role;
        token.cart = user.cart;
        token.wishlist = user.wishlist;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user.email = token.email;
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.address = token.address;
      session.user.phone = token.phone;
      session.user.isVerified = token.isVerified;
      session.user.role = token.role;
      session.user.cart = token.cart;
      session.user.wishlist = token.wishlist;
      return session;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    maxAge: 10 * 60,
  },
};
