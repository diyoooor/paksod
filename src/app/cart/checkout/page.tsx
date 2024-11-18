"use client";
import { useRouter } from "next/navigation";
import React from "react";

const CheckoutPage = () => {
  const router = useRouter();
  return (
    <div className="w-full">
      <section className="text-center py-4">
        <p className="text-3xl font-bold">ตรวจสอบคำสั่งซื้อ</p>
      </section>
      <section className="p-4 bg-white rounded-lg">
        <p className="text-xl font-semibold">รายการที่คุณเลือก</p>
        <hr />
        <ul>
          {[1, 2, 3, 4, 5].map((item, index) => {
            return (
              <li key={index}>
                <p className="inline-flex justify-between w-full pt-1 text-lg">
                  <span>
                    {index + 1}. Item {index + 1} x 10 kg
                  </span>
                  <span className="text-gray-500 font-semibold"> ฿ 10,000</span>
                </p>
              </li>
            );
          })}
          <hr />
          <li>
            <p className="inline-flex justify-between w-full  text-lg underline">
              <span>ค่าส่ง</span>
              <span className="text-gray-500 font-semibold"> ฿ 10,000</span>
            </p>
          </li>
          <li className="text-red-normal">
            <p className="inline-flex justify-between w-full  text-lg underline">
              <span>ส่วนลด</span>
              <span className="font-semibold"> ฿ 10,000</span>
            </p>
          </li>
          <li>
            <p className="inline-flex justify-between w-full  text-lg decoration-double underline">
              <span>ยอดสุทธิ</span>
              <span className="text-gray-500 font-semibold"> ฿ 10,000</span>
            </p>
          </li>
        </ul>
      </section>
      <section className="bg-white rounded-lg mt-4 p-4">
        <p className="text-xl font-semibold">รายละเอียดการจัดส่ง</p>
        <hr />
        <div className="flex justify-between w-full pt-1 text-lg">
          <span className="flex-1">ชื่อผู้ซื้อ</span>
          <span className="text-gray-500 font-semibold flex-1">กฟไก</span>
        </div>
        <div className="flex justify-between w-full pt-1 text-lg">
          <span className="flex-1">เบอร์โทรติดต่อ</span>
          <span className="text-gray-500 font-semibold flex-1">
            ดฟไดดฟไดฟดฟหดฟ
          </span>
        </div>
        <div className="flex justify-between w-full pt-1 text-lg">
          <span className="flex-1">ชื่อร้าน / สถานที่</span>
          <span className="text-gray-500 font-semibold flex-1">
            afokawfjkoafo
          </span>
        </div>
        <div className="flex justify-between w-full pt-1 text-lg">
          <span className="flex-1">รายละเอียดเพิ่มเติม</span>
          <span className="text-gray-500 font-semibold flex-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
            tenetur placeat cupiditate. Assumenda aut libero ut obcaecati! Quos
            dolorum, corporis impedit in est, laborum nesciunt odit ipsa
            veritatis enim consequuntur.
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
