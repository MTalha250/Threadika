import dbConnect from "@/lib/database/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/product";

export async function GET(
  request: NextRequest,
  { params }: { params: { query: string } }
) {
  await dbConnect();
  try {
    const { query } = params;
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { sizes: { $regex: query, $options: "i" } },
        { colors: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { fabric: { $regex: query, $options: "i" } },
        { trouser: { $regex: query, $options: "i" } },
        { inner: { $regex: query, $options: "i" } },
        { dopatta: { $regex: query, $options: "i" } },
        { embroidery: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });
    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
}
