"use client";
import { loadHyper } from "@juspay-tech/hyper-js";
import { HyperElements } from "@juspay-tech/react-hyper-js";
import { useCallback, useEffect, useState } from "react";
import { CheckoutForm } from "./checkout-form";

type Options = {
  clientSecret: string;
  appearance: {
    theme: string;
  };
};

type CreatePaymentResponse = {
  clientSecret: string;
};

let hyperPromise: Promise<unknown> | undefined = undefined;

if (typeof window !== "undefined") {
  hyperPromise = loadHyper(process.env.NEXT_PUBLIC_HYPERSWITCH_PUBLISHABLE_KEY);
}

export default function Home() {
  const [options, setOptions] = useState<Options | undefined>(undefined);

  const loadOptions = useCallback(async () => {
    try {
      console.log("loading options");
      const response = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_details: [{ product_name: "razors", quantity: 5, amount: 1 }], //example value
          currency: "USD", //example value
          amount: 100, //example value
        }),
      });
      const data = (await response.json()) as CreatePaymentResponse;
      setOptions({
        clientSecret: data.clientSecret,
        appearance: {
          theme: "default",
        },
      });
    } catch (error) {
      alert("An error has occured loading options.");
      console.log(error);
    }
  }, []);

  useEffect(() => {
    loadOptions();
  }, [loadOptions]);

  return (
    <div className="main">
      {options !== undefined && hyperPromise !== undefined ? (
        <HyperElements options={options} hyper={hyperPromise}>
          <CheckoutForm />
        </HyperElements>
      ) : null}
    </div>
  );
}
