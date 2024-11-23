"use client";

import { fetcher } from "@/utils/fetcher";
import {
  IconCarrot,
  IconFish,
  IconMeat,
  IconBottle,
  IconEggs,
  IconClockHour3,
} from "@tabler/icons-react";
import React, { useState, useMemo } from "react";
import useSWR from "swr";

import CardProduct from "./components/CardProduct";
import Loading from "@/components/Loading/Loading";

interface ICategories {
  id: number;
  name: string;
  icon: React.ReactNode;
}

const ProductsPage = () => {
  const { data: products, isLoading, error } = useSWR("/api/products", fetcher);
  const [category, setCategory] = useState("all");
  const [sortOption, setSortOption] = useState("none");

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
    { id: 5, name: "ไข่", icon: <IconEggs className="h-9 w-9" stroke={1.5} /> },
    {
      id: 6,
      name: "ผักดอง",
      icon: <IconClockHour3 className="h-9 w-9" stroke={1.5} />,
    },
  ];

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return category === "all"
      ? products
      : products.filter((product) => product.type === category);
  }, [products, category]);

  const sortedProducts = useMemo(() => {
    return filteredProducts.sort((a, b) => {
      if (sortOption === "low-high")
        return a.prices[0].value - b.prices[0].value;
      if (sortOption === "high-low")
        return b.prices[0].value - a.prices[0].value;
      if (sortOption === "a-z") return a.name.localeCompare(b.name);
      if (sortOption === "z-a") return b.name.localeCompare(a.name);
      return 0;
    });
  }, [filteredProducts, sortOption]);

  if (isLoading) return <Loading />;
  if (error)
    return <ErrorMessage message="เกิดข้อผิดพลาดในการโหลดข้อมูลสินค้า" />;

  return (
    <div className="w-full">
      <HeaderSection />

      <CategorySection
        categories={categories}
        category={category}
        setCategory={setCategory}
      />

      <SortSection
        productCount={sortedProducts.length}
        setSortOption={setSortOption}
      />

      <ProductGrid products={sortedProducts} />
    </div>
  );
};

export default ProductsPage;

const HeaderSection = () => (
  <section className="text-center py-4">
    <p className="text-3xl font-bold">รายการสินค้า</p>
  </section>
);

const CategorySection = ({
  categories,
  category,
  setCategory,
}: {
  categories: ICategories[];
  category: string;
  setCategory: (category: string) => void;
}) => (
  <section className="flex mt-4 flex-nowrap overflow-auto max-w-screen gap-4">
    {categories.map((item, index) => (
      <button
        key={index}
        aria-pressed={item.name === category}
        className={`min-w-30 py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-nowrap transition-all duration-300 ease-in-out
          ${
            item.name === category
              ? "bg-green-medium text-white shadow-lg"
              : "bg-white text-gray-700 "
          }
          `}
        onClick={() => setCategory(item.name)}
      >
        <p>{item.icon}</p>
        <p className="text-xl">{item.name}</p>
      </button>
    ))}
  </section>
);

const SortSection = ({
  productCount,
  setSortOption,
}: {
  productCount: number;
  setSortOption: (option: string) => void;
}) => (
  <section className="mt-4 flex justify-between py-2 text-lg">
    <div>
      <p>สินค้าทั้งหมด {productCount} รายการ</p>
    </div>
    <div>
      <select
        className="rounded w-full bg-transparent text-right pr-2 "
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="none"> เลือกการเรียง </option>
        <option value="low-high">ราคา: ต่ำ - สูง</option>
        <option value="high-low">ราคา: สูง - ต่ำ</option>
        <option value="a-z">ชื่อ: ก - ฮ</option>
        <option value="z-a">ชื่อ: ฮ - ก</option>
      </select>
    </div>
  </section>
);

const ProductGrid = ({ products }: { products: [] }) => (
  <section className="mt-6">
    <div className="grid grid-cols-2 gap-4">
      {products.map((item, index) => (
        <CardProduct item={item} key={index} />
      ))}
    </div>
  </section>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="text-center py-10">
    <p className="text-red-600 font-semibold text-lg">{message}</p>
  </div>
);
