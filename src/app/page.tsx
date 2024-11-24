"use client";
import Loading from "@/components/Loading/Loading";
import { fetcher } from "@/utils/fetcher";
import {
  IconBottle,
  IconCarrot,
  IconClockHour3,
  IconCurrencyBaht,
  IconEggs,
  IconFish,
  IconMeat,
  IconSalad,
  IconSparkles,
  IconTruckDelivery,
} from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import CardProduct from "./product/components/CardProduct";

interface ICategories {
  id: number;
  name: string;
  icon: React.ReactNode;
}

interface IWhyUs {
  icon: React.ReactNode;
  topic: string;
  description: string;
}

export default function Home() {
  const router = useRouter();
  const {
    data: products,
    isLoading,
    error,
  } = useSWR("/api/products/highlight", fetcher);
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

  const whyUs: IWhyUs[] = [
    {
      icon: <IconSalad className="h-32 w-32" stroke={1} />,
      topic: "สดใหม่ทุกวัน",
      description:
        "ผักสดจากฟาร์มที่คัดสรรอย่างดี ส่งตรงถึงร้านทุกวัน เพื่อความสดใหม่และคุณภาพสูงสุดสำหรับลูกค้า",
    },
    {
      icon: <IconTruckDelivery className="h-32 w-32" stroke={1} />,
      topic: "สะดวก รวดเร็ว",
      description:
        "บริการจัดส่งทั้งขายปลีกและส่ง ตรงเวลา รวดเร็ว เพื่อความสะดวกของลูกค้าทุกท่าน",
    },
    {
      icon: <IconCurrencyBaht className="h-32 w-32" stroke={1} />,
      topic: "ราคาย่อมเยา",
      description:
        "เสนอราคาที่คุ้มค่า ทั้งขายปลีกและส่ง พร้อมโปรโมชั่นพิเศษสำหรับลูกค้าประจำ",
    },
  ];

  if (isLoading) return <Loading />;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <section className="inset-0 w-screen -mt-4 -mx-4 m-0 h-64 ">
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
        {categories.map((item, index) => {
          return (
            <div
              key={index}
              className="min-w-30 py-3 px-4 rounded-xl flex items-center gap-2 bg-white text-nowrap"
              onClick={() => router.push(`/category/${item.name}`)}
            >
              <p>{item.icon}</p>
              <p className="text-xl">{item.name}</p>
            </div>
          );
        })}
      </section>
      <section className="mt-4 bg-red-400 rounded-xl p-4">
        <h1 className="text-3xl py-4 font-semibold inline-flex gap-2">
          <IconSparkles />
          สินค้าแนะนำ
        </h1>
        <div className="grid grid-cols-2 gap-4">
          {products.map((item, index) => {
            return <CardProduct item={item} key={index} />;
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
        {whyUs.map((item, index) => (
          <div
            key={index}
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
