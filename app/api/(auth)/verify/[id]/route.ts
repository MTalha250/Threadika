import dbConnect from "@/lib/database/mongodb";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> => {
  const { id } = params;
  await dbConnect();
  try {
    const user = await User.findByIdAndUpdate(id, { isVerified: true });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 400,
        }
      );
    }
    return new NextResponse(
      ` <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f8f9fa;
          margin: 0;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          height: 100vh;
        }
        .container {
          text-align: center;
          background-color: #ffffff;
          border-radius: 10px;
          padding: 40px;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          width: 90%;
        }
        h1 {
          color: black;
          margin-bottom: 20px;
        }
        p {
          color: #555555;
          margin-bottom: 30px;
        }
        a {
          color:black;
          text-decoration: none;
          background-color: #FA89A9;
          padding: 10px 20px;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }
        a:hover {
          background-color: #F86094;
        }
      </style>
      </head>
      <body>
        <div class="container">
          <h1>Your email has been verified</h1>
          <p>You can now login.</p>
          <a href="/login">Go to Login Page</a>
        </div>
      </body>
      </html>
      
  `,
      { status: 200, headers: { "content-type": "text/html" } }
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
