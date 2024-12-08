"use client";
import Loading from "@/components/Loading/Loading";
import { IconSparkles } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { whyUs } from "@/constants/why-us";
import { categories } from "@/constants/category";
import { useEffect } from "react";
import { useProductStore } from "@/store/useProductStore";
import ProductCard from "@/components/Card/ProductCard";

export default function Home() {
  const router = useRouter();
  const { fetchHighlights, products, isLoading } = useProductStore();

  useEffect(() => {
    fetchHighlights();
  }, [fetchHighlights]);

  if (isLoading) return <Loading />;

  return (
    <div>
      <section className="inset-0 w-screen -mt-4 -mx-4 m-0 h-fit">
        <div>
          <Image
            alt={"banner"}
            src={"/images/logo/banner.png"}
            priority
            width={400}
            height={190}
            className=" object-contain"
          />
        </div>
      </section>
      <section className="flex mt-4 flex-nowrap overflow-auto max-w-screen gap-4">
        {categories.map((item) => {
          return (
            <button
              key={item.name}
              className="min-w-30 py-3 px-4 rounded-xl flex items-center gap-2 bg-white text-nowrap"
              onClick={() => router.push(`/category/${item.name}`)}
            >
              <p>{item.icon}</p>
              <p className="text-lg">{item.name}</p>
            </button>
          );
        })}
      </section>
      <section className="mt-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl p-4">
        <h1 className="text-3xl py-4 font-semibold inline-flex gap-2">
          <IconSparkles />
          สินค้าแนะนำ
        </h1>
        <div className="grid grid-cols-2 gap-4">
          {products.map((item) => {
            return (
              <ProductCard
                key={item.name}
                prices={item.prices}
                name={item.name}
                image={item.image}
                product={item}
              />
            );
          })}
        </div>
        <div className="w-full mt-4 flex">
          <button
            className="mx-auto rounded-lg bg-green-dark w-3/5"
            onClick={() => router.push("/product")}
          >
            <p className="text-lg font-semibold text-white p-2">ดูทั้งหมด</p>
          </button>
        </div>
      </section>
      <section className="mt-8 grid grid-cols-1 gap-6 px-4">
        {whyUs.map((item) => (
          <div
            key={item.topic}
            className="text-center bg-white shadow-md hover:shadow-lg rounded-xl transition-shadow duration-300"
          >
            <div className="p-6 flex flex-col items-center">
              <div className="text-green-500 text-5xl mb-4">{item.icon}</div>

              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                {item.topic}
              </h2>

              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
