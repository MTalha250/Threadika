import dbConnect from "@/lib/database/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/product";

export async function GET(request: NextRequest) {
  await dbConnect();
  try {
    const products = await Product.find().sort({ createdAt: -1 });
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
}

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const {
      name,
      price,
      discount,
      images,
      sizes,
      colors,
      category,
      stock,
      description,
      fabric,
      trouser,
      inner,
      dopatta,
      embroidery,
      weight,
      reviews,
    } = await request.json();
    const product = await Product.create({
      name,
      price,
      discount,
      images,
      sizes,
      colors,
      category,
      stock,
      description,
      fabric,
      trouser,
      inner,
      dopatta,
      embroidery,
      weight,
      reviews,
    });
    return NextResponse.json(
      {
        success: true,
        product,
      },
      {
        status: 201,
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
}
