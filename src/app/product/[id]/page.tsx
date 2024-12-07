"use client";
import Loading from "@/components/Loading/Loading";
import { fetcherWithHeaders } from "@/utility/fetcher";
import Image from "next/image";
import { use } from "react";
import useSWR from "swr";

interface IProductDetail {
  params: Promise<{ id: string }>;
}

export default function ProductDetail({ params }: IProductDetail) {
  const { id } = use(params);

  const {
    data: product,
    isLoading,
    error,
  } = useSWR(`/api/products?id=${id}`, fetcherWithHeaders);

  if (isLoading) return <Loading />;
  if (error) return <p>เกิดข้อ��ิดพลา��ในการ��หลดข้อมูลสินค้า</p>;

  return (
    <div className="w-full px-4">
      <section className="text-sm text-gray-600">
        สินค้าทั้งหมด / {product.type} / {product.name}
      </section>

      <section className="mt-10 w-full">
        <Image
          src={product.image}
          width={250}
          height={250}
          alt="รูปภาพมะเขือเทศ"
          className="mx-auto border w-full max-w-sm rounded-lg"
        />
      </section>

      <section className="mt-6 text-center">
        <h1 className="text-3xl font-semibold">{product.name}</h1>
        <ul className="w-full grid  grid-cols-3 text-center mt-6 gap-5">
          {product.category.map((item, index) => (
            <li key={index}>
              <div className="border rounded-xl py-2 bg-green-medium text-white font-bold">
                {item}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">รายละเอียดสินค้า</h2>
        <div className="mt-4 text-gray-700">
          {product.prices.map((price, index) => {
            return (
              <p key={index} className="indent-4">
                {product.name} 1 {price.label} ราคา {price.value} บาท
              </p>
            );
          })}
        </div>
      </section>

      <section className="mt-6">
        <button className="w-full h-12 bg-green-dark text-white font-bold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-medium">
          ใส่ตะกร้า
        </button>
      </section>

      <RelatedProductsSection />
    </div>
  );
}

const RelatedProductsSection = () => (
  <section className="mt-8">
    <h2 className="text-2xl font-semibold mb-4">สินค้าที่เกี่ยวข้อง</h2>
    <ul className="w-full flex flex-nowrap overflow-auto gap-5">
      {[1, 2, 3, 4, 5].map((item, index) => (
        <RelatedProductCard
          key={index}
          name={`สินค้าที่ ${index + 1}`}
          price="15"
          image="/products/broccoli.png"
        />
      ))}
    </ul>
  </section>
);

const RelatedProductCard = ({
  name,
  price,
  image,
}: {
  name: string;
  price: string;
  image: string;
}) => (
  <div className="bg-white rounded-xl min-w-[200px] shadow-md hover:shadow-lg transition-shadow duration-300">
    <Image
      src={image}
      alt={name}
      width={100}
      height={90}
      className="object-contain mx-auto py-6 drop-shadow-sm h-40 w-auto"
    />
    <div className="p-4">
      <p className="text-xl font-semibold text-green-dark text-center">
        {name}
      </p>
      <p className="text-gray-700 text-center">กิโลกรัมละ {price} บาท</p>
    </div>
    <div className="p-4">
      <button className="w-full h-10 bg-green-dark text-white font-bold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-medium">
        สั่งซื้อ
      </button>
    </div>
  </div>
);
