import dbConnect from "@/lib/database/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/order";

export async function GET(request: NextRequest) {
  await dbConnect();
  try {
    const orders = await Order.find()
      .populate("user", "name email phone")
      .populate({
        path: "orderItems",
        populate: {
          path: "product",
          model: "Product",
        },
      });
    return NextResponse.json(
      {
        success: true,
        orders,
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
      user,
      orderItems,
      status,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      delivery,
      totalPrice,
    } = await request.json();
    const order = await Order.create({
      user,
      orderItems,
      status,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      delivery,
      totalPrice,
    });
    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully",
        order,
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
