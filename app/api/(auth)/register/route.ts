import dbConnect from "@/lib/database/mongodb";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  const { name, email, password, phone, address } = await request.json();
  await dbConnect();
  try {
    // checkling if user already exists
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        {
          status: 400,
        }
      );
    }
    // creating new user
    const user = await User.create({
      name,
      email,
      phone,
      address,
      password: await bcrypt.hash(password, 10),
    });
    // sending verification email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "talhabinay@gmail.com",
        pass: "ogik jpre uyde kmdo",
      },
    });
    const mailOptions = {
      from: "talhabinay@gmail.com",
      to: email,
      subject: "Account Verification",
      text: `Hello ${name}, click on the link to verify your account: ${process.env.NEXTAUTH_URL}/api/verify/${user._id}`,
    };
    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      {
        success: true,
        message:
          "Account created successfully. \nPlease verify your email to login",
        user,
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

export async function GET(request: NextRequest) {
  await dbConnect();
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return NextResponse.json(
      {
        success: true,
        result: users,
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
