"use client";

import Image from "next/image";
import React, { useState } from "react";

interface Price {
  id: number;
  value: number;
  label: string;
}

interface Product {
  _id?: string;
  name: string;
  otherNames: string[];
  type: string;
  category: string[];
  image: string;
  prices: Price[];
}

interface AddToCartModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (
    productId: string | number,
    priceId: number | string,
    qty: number,
    unit: string
  ) => void;
}

const AddToCartModal: React.FC<AddToCartModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedPrice, setSelectedPrice] = useState<Price | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  if (!isOpen) return null;

  const handleAddToCart = () => {
    if (selectedPrice === null) {
      alert("กรุณาเลือกตัวเลือกสินค้า");
      return;
    }

    onAddToCart(product._id, selectedPrice.id, quantity, selectedPrice.label);
    onClose();
  };

  const handleChangeUnit = (price: Price) => {
    setSelectedPrice(price);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <div className="text-center">
          <Image
            src={product.image}
            alt={product.name}
            width={200}
            height={200}
            className="mx-auto w-32 h-32"
          />
          <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
          <p className="text-gray-500">{product.type}</p>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-medium">เลือกตัวเลือกสินค้า</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {product.prices.map((price) => (
              <button
                key={price.id}
                onClick={() => handleChangeUnit(price)}
                className={`px-4 py-2 border rounded-lg ${
                  selectedPrice === price
                    ? "bg-green-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                {price.label} - {price.value} บาท
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <label htmlFor="quantity" className="text-lg font-medium">
            จำนวน:
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="px-3 py-1 bg-gray-200 rounded-lg"
            >
              -
            </button>
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              className="w-16 text-center border rounded-lg"
            />
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="px-3 py-1 bg-gray-200 rounded-lg"
            >
              +
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            เพิ่มไปยังตะกร้า
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal;
