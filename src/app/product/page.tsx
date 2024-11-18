"use client";
import {
  IconCarrot,
  IconFish,
  IconMeat,
  IconBottle,
  IconEggs,
  IconClockHour3,
} from "@tabler/icons-react";
import Image from "next/image";
import React from "react";

interface ICategories {
  id: number;
  name: string;
  icon: React.ReactNode;
}

const ProductsPage = () => {
  const categories: ICategories[] = [
    {
      id: 1,
      name: "ผักสด",
      icon: <IconCarrot className="h-9 w-9" stroke={1.5} />,
    },
    {
      id: 2,
      name: "อาหารทะเล",
      icon: <IconFish className="h-9 w-9" stroke={1.5} />,
    },
    {
      id: 3,
      name: "เนื้อสัตว์",
      icon: <IconMeat className="h-9 w-9" stroke={1.5} />,
    },
    {
      id: 4,
      name: "เครื่องปรุง",
      icon: <IconBottle className="h-9 w-9" stroke={1.5} />,
    },
    {
      id: 5,
      name: "ไข่",
      icon: <IconEggs className="h-9 w-9" stroke={1.5} />,
    },
    {
      id: 6,
      name: "ผักดอง",
      icon: <IconClockHour3 className="h-9 w-9" stroke={1.5} />,
    },
  ];
  return (
    <div className="w-full">
      <section className="text-center py-4">
        <p className="text-3xl font-bold">รายการสินค้า</p>
      </section>
      <section className="flex mt-4 flex-nowrap overflow-auto max-w-screen gap-4">
        {categories.map((item, index) => {
          return (
            <div
              key={index}
              className="min-w-30 py-3 px-4 rounded-xl flex items-center gap-2 bg-white text-nowrap"
            >
              <p>{item.icon}</p>
              <p className="text-xl">{item.name}</p>
            </div>
          );
        })}
      </section>
      <section className="mt-4 flex justify-between  py-2 text-lg ">
        <div>
          <p>สินค้าทั้งหมด {"10"} รายการ</p>
        </div>
        <div>
          <select className="rounded w-full bg-transparent text-right pr-2">
            <option value="price-low-high">ราคา: ต่ำ - สูง</option>
            <option value="price-high-low">ราคา: สูง - ต่ำ</option>
            <option value="name-a-z">ชื่อ: ก - ฮ</option>
            <option value="name-z-a">ชื่อ: ฮ - ก</option>
          </select>
        </div>
      </section>
      <section>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6].map((item, index) => {
            return (
              <div key={index} className="bg-white rounded-xl ">
                <Image
                  alt={"highlight"}
                  src={`/products/broccoli.png`}
                  width={100}
                  height={90}
                  className="object-contain mx-auto py-10 drop-shadow-sm h-48 w-fit"
                />
                <div className="p-2">
                  <p className="text-xl font-semibold text-green-dark">
                    สินค้าที่ {index}
                  </p>
                  <p>กิโลกรัมละ 15 </p>
                </div>
                <div className="p-2">
                  <button className="w-full h-10 bg-green-dark text-white font-semibold rounded-xl">
                    สั่งซื้อ
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
