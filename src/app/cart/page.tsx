"use client";
import Loading from "@/components/Loading/Loading";
import { fetcherWithHeaders } from "@/utils/fetcher";
import { IconShoppingBag, IconTrash } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import useSWR from "swr";
import Swal from "sweetalert2";

const CartPage = () => {
  const router = useRouter();
  const {
    data: cart,
    isLoading,
    mutate,
  } = useSWR("/api/cart", fetcherWithHeaders);
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    if (cart) {
      setCarts(cart.products);
    }
  }, [cart]);

  const calculateTotalPrice = () => {
    return carts?.reduce(
      (total, item) =>
        total +
        (item.prices.find((price) => price.id === item.priceId)?.value || 0) *
          item.quantity,
      0
    );
  };

  const handleQuantityChange = (productId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity <= 0) {
      Swal.fire({
        title: "คุณต้องการลบสินค้านี้ใช่หรือไม่?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ใช่",
        cancelButtonText: "ไม่",
      }).then((result) => {
        if (result.isConfirmed) {
          handleRemoveItem(productId);
        }
      });
      return;
    }
    setCarts((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = async (productId) => {
    try {
      await fetcherWithHeaders(`/api/cart/${productId}`, "DELETE");
      mutate();
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleClearCart = async () => {
    Swal.fire({
      title: "คุณต้องการลบสินค้าทั้งหมดใช่หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetcherWithHeaders("/api/cart", "DELETE");
          mutate();
        } catch (error) {
          console.error("Error clearing cart:", error);
        }
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="w-full relative max-w-lg">
      <section className="text-center py-4">
        <p className="text-3xl font-bold">ตะกร้าสินค้า</p>
      </section>

      <section>
        <div className="flex items-center py-2 w-full justify-between">
          <div className="inline-flex font-medium text-lg text-green-black">
            <IconShoppingBag stroke={1} className="w-8 h-8" />
            <p>ทั้งหมด {carts.length || 0} รายการ</p>
          </div>
          <button
            onClick={handleClearCart}
            className="text-red-500 hover:underline"
          >
            ลบทั้งหมด
          </button>
        </div>
      </section>

      <section>
        <ul>
          {carts.map((item, index) => {
            const priceDetails = Array.isArray(item.prices)
              ? item.prices.find((price) => price.id === item.priceId)
              : null;

            return (
              <li
                key={`${index}-${item.productId}`}
                className="h-32 border inline-flex w-full items-center bg-white p-2 first:rounded-t-lg last:rounded-b-lg relative"
              >
                <Image
                  src={item?.image || "/default-product.png"}
                  width={70}
                  height={70}
                  alt={item.name || "product"}
                  className="drop-shadow-md flex-1 w-20"
                />
                <div className="ml-4 flex-[3]">
                  <h3 className="text-xl">
                    {item.name} x {item.quantity} {priceDetails?.label}
                  </h3>
                  <p className="text-gray-500">
                    {priceDetails?.label} ละ {priceDetails?.value} บาท
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.productId, item.quantity, -1)
                      }
                      className="bg-gray-200 rounded-full p-1 w-8 h-8 text-center"
                    >
                      -
                    </button>
                    <p>{item.quantity}</p>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.productId, item.quantity, 1)
                      }
                      className="bg-gray-200 rounded-full p-1 w-8 h-8 text-center"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex-1 text-center text-2xl">
                    <p>
                      {" ฿"}
                      {priceDetails?.value * item.quantity}
                    </p>
                  </div>
                </div>
                {item.quantity === 0 && (
                  <button
                    onClick={() => handleRemoveItem(item.productId)}
                    className="absolute top-2 right-2 inline-flex gap-2"
                  >
                    <IconTrash
                      stroke={1.5}
                      className="w-6 h-6 stroke-red-normal rounded-full"
                    />
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="fixed bottom-0 bg-white w-full left-0 p-4 h-fit">
        <div className="text-2xl my-2 inline-flex justify-between w-full font-bold">
          <p>ทั้งหมด</p>
          <p>฿ {calculateTotalPrice()}</p>
        </div>
        <button
          type="button"
          className="mx-auto border block w-full p-4 rounded-lg bg-green-dark text-white text-xl"
          onClick={() => router.push("/cart/checkout")}
        >
          ดำเนินการต่อ
        </button>
      </section>
    </div>
  );
};

export default CartPage;
