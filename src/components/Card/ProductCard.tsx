"use client";
import Image from "next/image";
import React, { useState } from "react";
import AddToCartModal from "../Modal/AddToCart";

const ProductCard = ({
  prices = [],
  name = "Product",
  image = "",
  product,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const onAddToCart = (productId, priceId, qty, unit) => {
    console.log(productId, priceId, qty, unit);
  };

  return (
    <>
      <figure className="bg-white rounded-xl flex flex-col justify-between h-full shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out relative">
        <Image
          width={200}
          height={200}
          src={image}
          alt={"product"}
          className="p-6 h-48 w-fit mx-auto"
        />
        <figcaption className="text-xl font-bold text-gray-800 px-2 text-center ">
          {name}
        </figcaption>
        <div className="py-2 text-center">
          {prices.map((prices) => (
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
            onClick={handleModal}
            className="w-full h-12 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors duration-300 ease-in-out"
          >
            ใส่ตะกร้า
          </button>
        </div>
      </figure>
      <AddToCartModal
        isOpen={isOpen}
        onClose={handleModal}
        product={product}
        onAddToCart={onAddToCart}
      />
    </>
  );
};

export default ProductCard;
