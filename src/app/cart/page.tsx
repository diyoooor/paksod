"use client";
import { useCartStore } from "@/store/useCartStore";
import { numberWithCommas } from "@/utils/common";
import { IconShoppingBag, IconTrash } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const CartPage = () => {
  const router = useRouter();
  const {
    cartItems,
    isCartLoading,
    fetchCart,
    addToCart,
    removeFromCart,
    totalItems,
  } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const calculateTotal = () =>
    cartItems.reduce(
      (total, item) =>
        total +
        (Array.isArray(item.prices)
          ? (item.prices.find((price) => price.id === item.priceId)?.value ||
              0) * item.quantity
          : 0),
      0
    );

  const handleIncrement = (item) => {
    addToCart(item.productId, item.priceId, +1, item.unit);
  };

  const handleDecrement = (item) => {
    addToCart(item.productId, item.priceId, -1, item.unit);
  };

  return (
    <div className="w-full relative max-w-lg">
      {/* Header Section */}
      <section className="text-center py-4">
        <p className="text-3xl font-bold">ตะกร้าสินค้า</p>
      </section>

      {/* Cart Overview Section */}
      <section>
        <div className="flex items-center py-2 w-full justify-between">
          <div className="inline-flex font-medium text-lg text-green-black">
            <IconShoppingBag stroke={1} className="w-8 h-8" />
            <p>ทั้งหมด {cartItems.length} รายการ</p>
          </div>
          <button
            hidden={cartItems.length === 0}
            className="text-red-500 hover:underline"
            onClick={() => removeFromCart("")}
          >
            ลบทั้งหมด
          </button>
        </div>
      </section>

      {/* Cart Items Section */}
      <section>
        <ul>
          {!isCartLoading && cartItems.length === 0 && (
            <li className="text-center text-gray-500 gap-4 flex flex-col">
              <p>ไม่มีสินค้าในตะกร้า</p>
              <Link
                href="/product"
                className="text-green-dark underline text-lg"
              >
                เลือกซื้อสินค้า
              </Link>
            </li>
          )}

          {!isCartLoading &&
            cartItems.map((item, index) => {
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
                        onClick={() => handleDecrement(item)}
                        className="bg-gray-200 rounded-full p-1 w-8 h-8 text-center"
                        aria-label="ลดจำนวนสินค้า"
                      >
                        -
                      </button>
                      <p>{item.quantity}</p>
                      <button
                        onClick={() => handleIncrement(item)}
                        className="bg-gray-200 rounded-full p-1 w-8 h-8 text-center"
                        aria-label="เพิ่มจำนวนสินค้า"
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
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="absolute top-2 right-2 inline-flex gap-2"
                    aria-label="ลบสินค้า"
                  >
                    <IconTrash
                      stroke={1.5}
                      className="w-6 h-6 stroke-red-normal rounded-full"
                    />
                  </button>
                </li>
              );
            })}
        </ul>
      </section>

      {/* Footer Section */}
      <section className="fixed bottom-0 bg-white w-full left-0 p-4 h-fit">
        <div className="text-2xl my-2 inline-flex justify-between w-full font-bold">
          <p>ทั้งหมด</p>
          <p>฿ {numberWithCommas(calculateTotal().toFixed(2))}</p>
        </div>
        <button
          type="button"
          className={`mx-auto border block w-full p-4 rounded-lg  text-xl ${
            totalItems > 0
              ? "bg-green-dark text-white"
              : `bg-gray-300 text-gray-400`
          }`}
          onClick={() => router.push("/cart/checkout")}
          disabled={totalItems < 1}
        >
          ดำเนินการต่อ
        </button>
      </section>
    </div>
  );
};

export default CartPage;
