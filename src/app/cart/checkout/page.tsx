"use client";
import { useCartStore } from "@/store/useCartStore";
import { useUserStore } from "@/store/useUserStore";
import { numberWithCommas } from "@/utils/common";
import { useRouter } from "next/navigation";
import React from "react";

const CheckoutPage = () => {
  const router = useRouter();

  const { cartItems } = useCartStore();
  const { user } = useUserStore();

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

  const shippingFee = calculateTotal() > 1500 ? 0 : 100;
  const discountFee = calculateTotal() > 2000 ? 100 : 0;

  return (
    <div className="w-full">
      <section className="text-center py-4">
        <p className="text-3xl font-bold">ตรวจสอบคำสั่งซื้อ</p>
      </section>
      <section className="p-4 bg-white rounded-lg">
        <p className="text-xl font-semibold">รายการที่คุณเลือก</p>
        <hr />
        <ul>
          {cartItems.map((item, index) => {
            const priceDetails = Array.isArray(item.prices)
              ? item.prices.find((price) => price.id === item.priceId)
              : null;

            return (
              <li key={index}>
                <p className="inline-flex justify-between w-full pt-1 text-lg">
                  <span>
                    {item.name} {index + 1} x {item.quantity} x {item.unit}
                  </span>
                  <span className="text-gray-500 font-semibold">
                    {" "}
                    ฿ {numberWithCommas(priceDetails.value * item.quantity)}
                  </span>
                </p>
              </li>
            );
          })}
          <hr />
          <li>
            <p className="inline-flex justify-between w-full  text-lg underline">
              <span>ค่าส่ง</span>
              <span className="text-gray-500 font-semibold">
                ฿ {shippingFee}
              </span>
            </p>
          </li>
          <li className="text-red-normal">
            <p className="inline-flex justify-between w-full  text-lg underline">
              <span>ส่วนลด</span>
              <span className="font-semibold"> ฿ {discountFee}</span>
            </p>
          </li>
          <li>
            <p className="inline-flex justify-between w-full  text-lg decoration-double underline">
              <span>ยอดสุทธิ</span>
              <span className="text-gray-500 font-semibold">
                {" "}
                ฿ {numberWithCommas(calculateTotal())}
              </span>
            </p>
          </li>
        </ul>
      </section>
      <section className="bg-white rounded-lg mt-4 p-4">
        <p className="text-xl font-semibold">รายละเอียดการจัดส่ง</p>
        <hr />
        <div className="flex justify-between w-full pt-1 text-lg">
          <span className="flex-1">ชื่อผู้ซื้อ</span>
          <span className="text-gray-500 font-semibold flex-1">
            {user?.displayName}
          </span>
        </div>
        <div className="flex justify-between w-full pt-1 text-lg">
          <span className="flex-1">เบอร์โทรติดต่อ</span>
          <span className="text-gray-500 font-semibold flex-1">
            {user?.phoneNumber}
          </span>
        </div>
        <div className="flex justify-between w-full pt-1 text-lg">
          <span className="flex-1">ชื่อร้าน / สถานที่</span>
          <span className="text-gray-500 font-semibold flex-1">
            {user?.shopName}
          </span>
        </div>
        <div className="flex justify-between w-full pt-1 text-lg">
          <span className="flex-1">รายละเอียดเพิ่มเติม</span>
          <span className="text-gray-500 font-semibold flex-1">
            {user?.address}
          </span>
        </div>
      </section>
      <section className="fixed bottom-0 bg-white w-full left-0 p-4 h-fit">
        <button
          type="button"
          className="mx-auto border block w-full p-4 rounded-lg bg-green-dark text-white text-xl "
          onClick={() => router.push("/")}
        >
          ยืนยันการสั่งซื้อ
        </button>
      </section>
    </div>
  );
};

export default CheckoutPage;
