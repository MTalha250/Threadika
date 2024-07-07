import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      isVerified: boolean;
      address: string;
      phone: string;
      cart: any[];
      wishlist: any[];
    };
  }
}
