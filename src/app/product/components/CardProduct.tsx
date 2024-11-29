import { IconHeart } from "@tabler/icons-react";
import Image from "next/image";
import React, { useState } from "react";
import AddToCartModal from "./AddToCart";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";

interface ICardProductProps {
  item: Product;
}

interface Price {
  id: number;
  value: number;
  label: string;
}

interface Product {
  _id: string;
  name: string;
  otherNames: string[];
  type: string;
  category: string[];
  image: string;
  prices: Price[];
}

const CardProduct: React.FC<ICardProductProps> = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCartStore();
  const router = useRouter();
  const handleAddToCart = (productId, priceId, qty, unit) => {
    addToCart(productId, priceId, qty, unit);
  };

  return (
    <>
      <div className="bg-white rounded-xl flex flex-col justify-between h-full shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out relative">
        <Image
          alt={"highlight"}
          src={item.image}
          width={100}
          height={90}
          className="object-contain mx-auto p-6 drop-shadow-sm h-fit w-auto"
          onClick={() => router.push(`/product/${item._id}`)}
        />
        <div className="py-2 text-center">
          <p className="text-lg font-bold text-gray-800">{item.name}</p>
          {item.prices.map((prices) => (
            <p key={prices.label} className="text-sm text-gray-600">
              {prices.label}:{" "}
              <span className="text-green-700 font-semibold">
                {prices.value} บาท
              </span>
            </p>
          ))}
        </div>
        <div className="mt-auto p-2">
          <button
            className="w-full h-12 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors duration-300 ease-in-out"
            onClick={() => setIsModalOpen(true)}
          >
            ใส่ตะกร้า
          </button>
        </div>
        <div className="absolute top-4 right-4">
          <button className="text-gray-400 ">
            <IconHeart className="hover:fill-red-500 hover:stroke-red-500" />
          </button>
        </div>
      </div>
      <AddToCartModal
        product={item}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={handleAddToCart}
      />
    </>
  );
};

export default CardProduct;
