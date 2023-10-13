import { type FC, type FormEvent, useEffect, useState } from "react";
import styles from "../styles/checkout.module.css";
import { useHyper, useWidgets, UnifiedCheckout } from "@juspay-tech/react-hyper-js";

export const CheckoutForm: FC = () => {
  const hyper = useHyper();
  const widgets = useWidgets();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPaymentCompleted, setIsPaymentCompleted] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const unifiedCheckoutOptions = {
    wallets: {
      walletReturnUrl: "http://localhost:3000",
    },
  };

  const handlePaymentStatus = (status: string) => {
    switch (status) {
      case "succeeded":
        setMessage("Successful");
        break;
      case "processing":
        setMessage("Your payment is processing.");
        break;
      case "requires_payment_method":
        setMessage("Your payment was not successful, please try again.");
        break;
      case "":
        break;
      default:
        setMessage("Something went wrong.");
        break;
    }
  };

  useEffect(() => {
    if (!hyper) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");

    if (!clientSecret) {
      return;
    }

    hyper.retrievePaymentIntent(clientSecret).then((resp: any) => {
      const status = resp?.paymentIntent?.status;
      if (status) {
        handlePaymentStatus(resp?.paymentIntent?.status);
      }
    });
  }, [hyper]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const response = await hyper.confirmPayment({
      widgets,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000",
      },
      redirect: "if_required",
    });

    if (response) {
      if (response.status === "succeeded") {
        setMessage("Payment Successful");
      } else if (response.error) {
        setMessage(response.error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
    setIsPaymentCompleted(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <UnifiedCheckout id="unified-checkout" options={unifiedCheckoutOptions} />
      <button className={styles.button} disabled={!hyper || !widgets || isPaymentCompleted}>
        {isLoading ? <div className={styles.spinner} id="spinner" /> : "Pay Now"}
      </button>
      {/* Show any error or success messages */}
      {message !== "" ? (
        <div id="payment-message" className={styles.paymentMessage}>
          {message}
        </div>
      ) : null}
    </form>
  );
};
