"use client";

import CardProduct from "@/app/product/components/CardProduct";
import Loading from "@/components/Loading/Loading";
import { fetcherWithHeaders } from "@/utility/fetcher";
import { use, useEffect, useState } from "react";
import useSWR from "swr";

export default function CategoryType({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = use(params);
  const category = decodeURIComponent(type);

  const [categories, setCategories] = useState<
    Array<{
      label: string;
      value: string;
    }>
  >([]);

  const _static_category_vegetable_ = [
    {
      label: "ร้านส้มตำ",
      value: "1-1",
    },
    {
      label: "อาหารตามสั่ง",
      value: "1-2",
    },
  ];

  const _static_category_meat_ = [
    {
      label: "วัว",
      value: "2-1",
    },
    {
      label: "หมู",
      value: "2-2",
    },
    {
      label: "กบ",
      value: "2-3",
    },
  ];

  const _static_category_seafood_ = [
    {
      label: "ปลา",
      value: "3-1",
    },
    {
      label: "หอย",
      value: "3-2",
    },
    {
      label: "กุ้ง",
      value: "3-3",
    },
    {
      label: "หมึก",
      value: "3-4",
    },
  ];

  const _static_category_egg_ = [
    {
      label: "เบอร์ 0",
      value: "4-1",
    },
    {
      label: "เบอร์ 1",
      value: "4-2",
    },
    {
      label: "เบอร์ 2",
      value: "4-3",
    },
    {
      label: "เบอร์ 3",
      value: "4-4",
    },
  ];

  const _static_category_sauce_ = [
    {
      label: "ซีอิ้วขาว",
      value: "5-1",
    },
    {
      label: "ซีอิ้วดำ",
      value: "5-2",
    },
    {
      label: "น้ำปลา",
      value: "5-3",
    },
    {
      label: "น้ำส้มสายชู",
      value: "5-4",
    },
    {
      label: "ผงชูรส",
      value: "5-5",
    },
  ];

  const _static_category_kitchen_ = [
    {
      label: "ฟองน้ำ",
      value: "6-1",
    },
    {
      label: "น้ำยาล้างจาน",
      value: "6-2",
    },
    {
      label: "ถุง",
      value: "6-3",
    },
  ];

  const _static_category_aging_ = [
    {
      label: "ผักกาดดอง",
      value: "7-1",
    },
    {
      label: "หน่อไม้ดอง",
      value: "7-2",
    },
    {
      label: "งาน",
      value: "7-3",
    },
  ];

  const _static_category_ = [
    {
      label: "ผักสด",
      value: "1",
    },
    {
      label: "เนื้อสัตว์",
      value: "2",
    },
    {
      label: "อาหารทะเล",
      value: "3",
    },
    {
      label: "ไข่",
      value: "4",
    },
    {
      label: "เครื่องปรุง",
      value: "5",
    },
    {
      label: "ของใช้ในครัว",
      value: "6",
    },
    {
      label: "ของดอง",
      value: "7",
    },
  ];

  useEffect(() => {
    switch (category) {
      case "ผักสด":
        setCategories(_static_category_vegetable_);
        break;
      case "เนื้อสัตว์":
        setCategories(_static_category_meat_);
        break;
      case "อาหารทะเล":
        setCategories(_static_category_seafood_);
        break;
      case "ไข่":
        setCategories(_static_category_egg_);
        break;
      case "เครื่องปรุง":
        setCategories(_static_category_sauce_);
        break;
      case "ของใช้ในครัว":
        setCategories(_static_category_kitchen_);
        break;
      case "ของดอง":
        setCategories(_static_category_aging_);
        break;
      default:
        setCategories(_static_category_);
        break;
    }
  }, [category]);

  const {
    data: products,
    isLoading,
    error,
  } = useSWR(`/api/products/category?category=${category}`, fetcherWithHeaders);

  if (isLoading) return <Loading />;
  if (error) return <p>เกิดข้อ��ิดพลา��ในการ��หลดข้อมูลสินค้า</p>;

  return (
    <div>
      <section className="text-center py-4">
        <p className="text-3xl font-bold">รายการสินค้า</p>
        <p className="text-md font-bold">{category}</p>
      </section>
      <section className="flex mt-4 flex-nowrap overflow-auto max-w-screen gap-4">
        {categories.map((item, index) => {
          return (
            <div
              key={index}
              className="min-w-30 py-3 px-4 rounded-xl flex items-center gap-2 bg-white text-nowrap"
            >
              <p className="text-xl">{item.label}</p>
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
          {products.map((item, index) => {
            return <CardProduct item={item} key={index} />;
          })}
        </div>
      </section>
    </div>
  );
}
