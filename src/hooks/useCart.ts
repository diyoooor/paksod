import useSWR from "swr";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

export const useCart = () => {
  const { data, error, mutate } = useSWR("/api/cart", fetcher);

  const addToCart = async (
    productId: string,
    priceId: number,
    quantity: number
  ) => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, priceId, quantity }),
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
