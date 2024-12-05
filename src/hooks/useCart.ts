import { useState, useCallback } from "react";
import useSWR from "swr";
import debounce from "lodash.debounce";
import { fetcherWithHeaders } from "@/utils/fetcher";
import Swal from "sweetalert2";

export const useCart = () => {
  // Use SWR for fetching cart data
  const { data, error, mutate, isLoading } = useSWR(
    "/api/cart",
    fetcherWithHeaders
  );

  // State to handle optimistic updates
  const [cart, setCart] = useState(data?.products || []);

  // Handle adding a product to the cart
  const addProduct = async (productId, priceId, quantity, unit) => {
    try {
      const newProduct = { productId, priceId, quantity, unit };
      setCart((prev) => [...prev, newProduct]);
      await fetcherWithHeaders("/api/cart", "POST", newProduct);
      mutate();
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  };

  // Handle updating product quantity
  const updateQuantity = async (productId, quantity) => {
    try {
      setCart((prev) =>
        prev.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        )
      ); // Optimistic update
      await fetcherWithHeaders("/api/cart", "PUT", { productId, quantity });
      mutate();
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  // Debounced version of updateQuantity to prevent frequent API calls
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdateQuantity = useCallback(
    debounce((productId, quantity) => {
      updateQuantity(productId, quantity);
    }, 500),
    []
  );

  const removeProduct = async (productId) => {
    try {
      await Swal.fire({
        title: "คุณต้องการลบสินค้านี้ใช่หรือไม่?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ใช่",
        cancelButtonText: "ไม่",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setCart((prev) =>
            prev.filter((item) => item.productId !== productId)
          );
          await fetcherWithHeaders(`/api/cart/${productId}`, "DELETE");
          mutate();
        }
      });
    } catch (error) {
      console.error("Failed to remove product from cart:", error);
    }
  };

  const clearCart = async () => {
    try {
      await Swal.fire({
        title: "คุณต้องการลบสินค้าทั้งหมดใช่หรือไม่?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ใช่",
        cancelButtonText: "ไม่",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setCart([]); // Optimistic update
          await fetcherWithHeaders("/api/cart", "DELETE");
          mutate();
        }
      });
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    return cart.reduce(
      (total, item) =>
        total +
        (item.prices?.find((price) => price.id === item.priceId)?.value || 0) *
        item.quantity,
      0
    );
  };

  return {
    cart,
    error,
    isLoading,
    addProduct,
    updateQuantity: debouncedUpdateQuantity,
    removeProduct,
    clearCart,
    calculateTotalPrice,
    mutate,
  };
};
