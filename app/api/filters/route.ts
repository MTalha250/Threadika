import dbConnect from "@/lib/database/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/product";

export const POST = async (req: NextRequest, res: NextResponse) => {
  await dbConnect();
  try {
    const {
      formals,
      semiFormals,
      premium,
      price: { min, max },
    } = await req.json();
    const products = <any>[];
    const allProducts = await Product.find({
      price: { $gte: min, $lte: max },
    }).sort({ createdAt: -1 });
    if (formals) {
      const formalProducts = await Product.find({
        category: "formals",
        price: { $gte: min, $lte: max },
      }).sort({ createdAt: -1 });
      products.push(...formalProducts);
    }
    if (semiFormals) {
      const semiFormalProducts = await Product.find({
        category: "semi-formals",
        price: { $gte: min, $lte: max },
      }).sort({ createdAt: -1 });
      products.push(...semiFormalProducts);
    }
    if (premium) {
      const premiumProducts = await Product.find({
        category: "premium",
        price: { $gte: min, $lte: max },
      }).sort({ createdAt: -1 });
      products.push(...premiumProducts);
    }
    if (!formals && !semiFormals && !premium) {
      products.push(...allProducts);
    }
    return NextResponse.json(
      {
        success: true,
        products,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
        error: error,
      },
      {
        status: 500,
      }
    );
  }
};
