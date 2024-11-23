import { IconHeart } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";

interface ICardProductProps {
  item: IProductItem;
}

interface IProductItem {
  id: number;
  name: string;
  image: string;
  prices: { label: string; value: number }[];
}

const CardProduct: React.FC<ICardProductProps> = ({ item }) => {
  return (
    <div className="bg-white rounded-xl flex flex-col justify-between h-full shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out relative">
      <Image
        alt={"highlight"}
        src={item.image}
        width={100}
        height={90}
        className="object-contain mx-auto py-6 drop-shadow-sm h-40 w-auto"
      />
      <div className="px-4 py-2 text-center">
        <p className="text-lg font-bold text-gray-800">{item.name}</p>
        {item.prices.map((prices, idx) => (
          <p key={idx} className="text-sm text-gray-600">
            {prices.label}:{" "}
            <span className="text-green-700 font-semibold">
              {prices.value} บาท
            </span>
          </p>
        ))}
      </div>
      <div className="mt-auto p-4">
        <button className="w-full h-12 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors duration-300 ease-in-out">
          ใส่ตะกร้า
        </button>
      </div>
      <div className="absolute top-4 right-4">
        <button className="text-gray-400 ">
          <IconHeart className="hover:fill-red-500 hover:stroke-red-500" />
        </button>
      </div>
    </div>
  );
};

export default CardProduct;
