"use client";
import { IconShoppingBag, IconTrash } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const CartPage = () => {
  const router = useRouter();
  return (
    <div className="w-full relative max-w-lg ">
      <section className="text-center py-4">
        <p className="text-3xl font-bold">ตะกร้าสินค้า</p>
      </section>
      <section>
        <div className="flex items-center py-2 w-full justify-between">
          <div className="inline-flex font-medium text-lg text-green-black">
            <IconShoppingBag stroke={1} className="w-8 h-8" />
            <p>ทั้งหมด {"10"} รายการ</p>
          </div>
          <p>ลบทั้งหมด</p>
        </div>
      </section>
      <section>
        <ul>
          {[1, 2, 3, 4].map((item, index) => {
            return (
              <li
                key={index}
                className="h-32 border inline-flex w-full items-center bg-white p-2 first:rounded-t-lg last:rounded-b-lg relative"
              >
                <Image
                  src={"/products/cucumber.png"}
                  width={70}
                  height={70}
                  alt="product1"
                  className="drop-shadow-md flex-1 w-20"
                />
                <div className="ml-4 flex-[3]">
                  <h3 className="text-xl">สินค้า 1 x 2 กก.</h3>
                  <p className="text-gray-500">กิโลกรัมละ 10 บาท</p>
                </div>
                <div className="flex-1 text-center text-2xl">
                  <p>฿ 100 </p>
                </div>
                <button className="absolute top-2 right-2 inline-flex gap-2">
                  <IconTrash
                    stroke={1.5}
                    className="w-6 h-6 stroke-red-normal rounded-full "
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </section>
      <section className="fixed bottom-0 bg-white w-full left-0 p-4 h-fit ">
        <div className="text-2xl my-2 inline-flex justify-between w-full font-bold">
          <p>ทั้งหมด</p>
          <p>฿ 1000</p>
        </div>
        <button
          type="button"
          className="mx-auto border block w-full p-4 rounded-lg bg-green-dark text-white text-xl "
          onClick={() => router.push("/cart/checkout")}
        >
          ดำเนินการต่อ
        </button>
      </section>
    </div>
  );
};

export default CartPage;
