import { fetcherWithHeaders } from "@/utils/fetcher";
import useSWR from "swr";

export const useCart = () => {
  const { data, error, mutate } = useSWR("/api/cart", (url) =>
    fetcherWithHeaders(url)
  );

  const addToCart = async (
    productId: string,
    priceId: number,
    quantity: number,
    unit: string
  ) => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("id_token")}`,
        },
        body: JSON.stringify({ productId, priceId, quantity, unit }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      const updatedCart = await response.json();
      mutate(updatedCart.cart, false);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const clearCart = async () => {
    try {
      await fetch("/api/cart", {
        method: "DELETE",
      });
      mutate([], false);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return {
    cart: data?.cart || [],
    isLoading: !error && !data,
    isError: error,
    addToCart,
    clearCart,
  };
};
