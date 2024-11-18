"use client";
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
      topic: "สดใหม่",
      description:
        "��ักสดมี��ท��ิ์อา��ารที่มีคุ����า��ที่ดีที่สุดสำหรับ��ู้สัตว์ และมีคุ����า��ในการรับประทานอา��ารต่อเนื่อง",
    },
    {
      icon: <IconTruckDelivery className="h-32 w-32" stroke={1} />,
      topic: "สะดวก รวดเร็ว",
      description:
        "อา��ารทะเลมีคุ����า��ที่ดีที่สุดสำหรับสัตว์ และมีคุ����า��ในการรับประทานอา��ารต่อเนื่อง",
    },
    {
      icon: <IconCurrencyBaht className="h-32 w-32" stroke={1} />,
      topic: "ราคาโดนใจ",
      description:
        "เนื้อสัตว์มีคุ��สมบัติที่ดีที่สุดสำหรับสัตว์ และมีคุ��สมบัติในการรับประทานอา��ารต่อเนื่อง",
    },
  ];

  return (
    <div>
      <section className="inset-0 w-screen -mt-4 -mx-4 m-0 h-64 ">
        <div>
          <Image
            alt={"banner"}
            src={"/logo/banner.png"}
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
                    ใส่ตะกร้า
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full mt-4 flex">
          <button className="mx-auto rounded-lg bg-green-dark w-3/5">
            <p className="text-lg font-semibold text-white p-2">ดูทั้งหมด</p>
          </button>
        </div>
      </section>
      <section className="mt-4 grid grid-flow-row gap-4 px-4">
        {whyUs.map((item, index) => {
          return (
            <div key={index} className="text-center bg-white rounded-xl">
              <div className="p-4 flex flex-col">
                <p className="mx-auto">{item.icon}</p>
                <h1 className="text-3xl font-semibold py-4">{item.topic}</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  consectetur, nisi sed viverra ultricies, nunc odio consectetur
                  ligula, ac varius sem lectus ut velit.
                </p>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
