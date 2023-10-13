import { NextResponse } from "next/server";

type PaymentResponse = {
  client_secret: string;
};

type RequestBody = {
  amount: number;
  currency: string;
  order_details: {
    product_name: string;
    quantity: number;
    unit_price: number;
  }[];
};

export async function POST(request: Request) {
  try {
    const { amount, currency, order_details } = (await request.json()) as RequestBody;

    const response = await fetch("https://sandbox.hyperswitch.io/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.HYPERSWITCH_API_KEY,
      },
      body: JSON.stringify({
        currency: currency,
        amount: amount,
        order_details,
      }),
    });

    const data = (await response.json()) as PaymentResponse;

    const clientSecret = data.client_secret;

    return NextResponse.json({ clientSecret, message: "Client secret found." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}
