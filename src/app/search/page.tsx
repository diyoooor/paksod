import Image from "next/image";
import React from "react";

const SearchPage = () => {
  return (
    <div>
      <section>
        <input
          type="text"
          placeholder="ค้นหาสินค้า"
          className="w-full px-4 py-2 rounded-xl focus:outline-none text-xl"
        />
      </section>
      <section className="mt-4">
        <h2 className="text-2xl py-4">ผลลัพท์การค้นหา</h2>
        <ul>
          {[1, 2, 3, 4].map((item, index) => {
            return (
              <li
                key={index}
                className="h-32 border inline-flex w-full items-center bg-white p-2 first:rounded-t-lg last:rounded-b-lg"
              >
                <Image
                  src={"/products/cucumber.png"}
                  width={70}
                  height={70}
                  alt="product1"
                  className="drop-shadow-md"
                />
                <div className="ml-4">
                  <h3 className="text-xl">Product 1</h3>
                  <p className="text-gray-500">Lorem ipsum dolor sit amet.</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default SearchPage;
