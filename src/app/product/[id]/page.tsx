import Image from "next/image";

interface IProductDetail {
  params: Promise<{ id: string }>;
}

export default async function ProductDetail({ params }: IProductDetail) {
  const detail = decodeURIComponent((await params).id);

  return (
    <div className="w-full">
      <section>สินค้าทั้งหมด / ผักสด / มะเขือเทศ</section>
      <section className="mt-10 w-full">
        <Image
          src={"/products/tomato.png"}
          width={250}
          height={250}
          alt="product-name"
          className=" mx-auto border w-full"
        />
      </section>
      <section>
        <h1 className="text-center text-3xl font-semibold">มะเขือเทศ</h1>
        <ul className={`w-full grid grid-cols-3 text-center mt-6 gap-5`}>
          {[1, 2, 3].map((item, index) => {
            return (
              <li key={index}>
                <div className="border  rounded-xl py-2 bg-green-medium font-bold">
                  หมวดหมู่ {item}
                </div>
              </li>
            );
          })}
        </ul>
      </section>
      <section className="mt-4">
        <h1 className="text-start text-2xl font-semibold">รายละเอียดสินค้า</h1>
        <p className=" indent-4">มะเขือเทศท้อ ราคาประหยัด 1 กก. 100 บาท</p>
        <p className=" indent-4">มะเขือเทศท้อ ราคาประหยัด 10 กก. 1000 บาท</p>
      </section>
      <section className="mt-4">
        <button className="w-full h-10 bg-green-dark text-white font-semibold rounded-xl">
          สั่งซื้อ
        </button>
      </section>
      <section className="mt-4">
        <h1 className="text-start text-2xl font-semibold">
          สินค้าที่เกี่ยวข้อง
        </h1>
        <ul className={`w-full flex flex-row overflow-auto gap-5 border`}>
          {[1, 2, 3, 4, 5].map((item, index) => {
            return (
              <div key={index} className="bg-white rounded-xl min-w-48">
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
                    สั่งซื้อ
                  </button>
                </div>
              </div>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
