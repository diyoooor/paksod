"use client";

import Loading from "@/components/Loading/Loading";
import { fetcher } from "@/utils/fetcher";
import {
  IconPower,
  IconSquareRoundedArrowUp,
  IconSquareRoundedArrowDown,
  IconCircleCheckFilled,
  IconCircleCheck,
} from "@tabler/icons-react";
import Image from "next/image";
import React, { useState } from "react";
import useSWR from "swr";

interface Order {
  id: string;
  status: string;
  date: string;
  total: number;
  items: { name: string; quantity: number; price: number }[];
  timeline: { label: string; completed: boolean }[];
}
const ProfilePage = () => {
  const orders: Order[] = [
    {
      id: "12345",
      status: "จัดส่งสำเร็จ",
      date: "01/01/2024",
      total: 1000,
      items: [
        { name: "สินค้า 1", quantity: 2, price: 200 },
        { name: "สินค้า 2", quantity: 1, price: 600 },
      ],
      timeline: [
        { label: "วางคำสั่งซื้อ", completed: true },
        { label: "กำลังจัดเตรียมสินต้า", completed: true },
        { label: "กำลังจัดส่งสินค้า", completed: true },
        { label: "จัดส่งสินค้าสำเร็จ", completed: true },
      ],
    },
    {
      id: "67890",
      status: "รอจัดส่ง",
      date: "15/01/2024",
      total: 500,
      items: [{ name: "สินค้า 3", quantity: 1, price: 500 }],
      timeline: [
        { label: "วางคำสั่งซื้อ", completed: true },
        { label: "กำลังจัดเตรียมสินต้า", completed: false },
        { label: "กำลังจัดส่งสินค้า", completed: false },
        { label: "จัดส่งสินค้าสำเร็จ", completed: false },
      ],
    },
  ];

  const { data: user, error, isLoading } = useSWR("/api/users", fetcher);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>();

  const [userInfo, setUserInfo] = useState({
    pictureUrl: "/images/products/no-image.jpg",
    displayName: "",
    shopName: "-",
    phoneNumber: "-",
    address: "-",
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsEditing(false);
  };

  const handleEditToggle = () => {};

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  if (isLoading) return <Loading />;
  if (error) return <p>เกิดข้อ��ิดพลา��ในการเชื่อมต่อ��านข้อมูล</p>;
  console.log(user);

  return (
    <div className="  p-4">
      <h1 className="text-3xl font-semibold text-center mb-6">ข้อมูลส่วนตัว</h1>
      <div className="flex justify-center mb-6 space-x-2 ">
        <button
          onClick={() => handleTabChange("profile")}
          className={`py-2 px-4 rounded-xl w-full text-xl border ${
            activeTab === "profile"
              ? "bg-light-primary text-green-black border-green-dark"
              : "border-light-primary border text-green-medium border-green-medium"
          }`}
        >
          ข้อมูลส่วนตัว
        </button>
        <button
          onClick={() => handleTabChange("orderHistory")}
          className={`py-2 px-4 rounded-xl w-full text-xl border  ${
            activeTab === "orderHistory"
              ? "bg-light-primary text-green-dark border-green-dark "
              : " border-light-primary border text-green-medium border-green-medium"
          }`}
        >
          ประวัติการสั่งซื้อ
        </button>
      </div>

      <div className="bg-white shadow-xl rounded-lg p-4 max-w-md mx-auto mt-10">
        {activeTab === "profile" && (
          <section className=" relative">
            <div className="text-center mb-6">
              <Image
                src={userInfo.pictureUrl}
                alt="Profile"
                width={100}
                height={100}
                className="w-36 h-36 object-cover rounded-full mx-auto"
              />
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block font-semibold">ชื่อ</label>

                <p className="text-lg h-12 font-semibold block border rounded-xl bg-gray-100 p-2">
                  {userInfo.displayName}
                </p>
              </div>

              <div className="mb-4">
                <label className="block font-semibold">ชื่อร้าน</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="shopName"
                    value={userInfo.shopName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <p className="text-lg font-semibold block border rounded-xl bg-gray-100 p-2 h-12">
                    {userInfo.shopName}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block font-semibold">เบอร์โทรศัพท์</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="phoneNumber"
                    value={userInfo.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <p className="text-lg font-semibold block border rounded-xl bg-gray-100 p-2 h-12">
                    {userInfo.phoneNumber}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block font-semibold">รายละเอียดที่อยู่</label>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={userInfo.address}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <p className="text-lg font-semibold block border rounded-xl bg-gray-100 p-2 h-12">
                    {userInfo.address}
                  </p>
                )}
              </div>

              <div className="text-center space-x-4">
                {!isEditing && (
                  <button
                    type={"button"}
                    onClick={handleEditToggle}
                    className={`bg-light-primary text-white py-2 px-6 rounded-md font-semibold hover:bg-opacity-90`}
                  >
                    {"แก้ไขข้อมูล"}
                  </button>
                )}

                {isEditing && (
                  <>
                    <button
                      type={"submit"}
                      className={`bg-light-primary  text-white py-2 px-6 rounded-md font-semibold hover:bg-opacity-90`}
                    >
                      บันทึก
                    </button>

                    <button
                      type={"button"}
                      onClick={handleEditToggle}
                      className={`"border-green-600 border  border-green-500 text-green-500 py-2 px-6 rounded-md font-semibold hover:bg-opacity-90`}
                    >
                      ยกเลิก
                    </button>
                  </>
                )}
              </div>
            </form>

            <button className="absolute top-0 right-0  flex items-center justify-center  rounded-full border border-red-100  text-red-500 transition mx-auto ">
              <IconPower />
            </button>
          </section>
        )}

        {activeTab === "orderHistory" && (
          <>
            <h2 className="text-xl font-semibold mb-4">ประวัติการสั่งซื้อ</h2>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border p-4 rounded-lg text-sm">
                  <div className="flex justify-between items-center ">
                    <div>
                      <p className="font-semibold">
                        คำสั่งที่ #{order.id} - {order.status}
                      </p>
                      <p>วันที่สั่งซื้อ: {order.date}</p>
                      <p>รวมราคา: ฿{order.total.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => toggleOrderDetails(order.id)}
                      className="text-blue-500 underline"
                    >
                      {expandedOrderId === order.id ? (
                        <IconSquareRoundedArrowUp color="green" />
                      ) : (
                        <IconSquareRoundedArrowDown color="green" />
                      )}
                    </button>
                  </div>

                  {expandedOrderId === order.id && (
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold">รายการสินค้า</h3>
                      <ul className="list-disc list-inside">
                        {order.items.map((item, index) => (
                          <li key={index}>
                            {item.name} - จำนวน {item.quantity} - ราคา ฿
                            {(item.price * item.quantity).toFixed(2)}
                          </li>
                        ))}
                      </ul>

                      <h3 className="text-lg font-semibold mt-4">
                        Timeline การจัดส่ง
                      </h3>
                      <div className="space-y-2">
                        {order.timeline.map((step, index) => (
                          <div key={index} className="flex  items-baseline">
                            <div className={`h-4 w-4 rounded-full mr-2 `}>
                              {step.completed ? (
                                <IconCircleCheckFilled color="green" />
                              ) : (
                                <IconCircleCheck color="gray" />
                              )}
                            </div>
                            <p
                              className={`${
                                step.completed ? "text-black" : "text-gray-500"
                              }`}
                            >
                              {step.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
