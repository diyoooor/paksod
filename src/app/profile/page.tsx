"use client";

import { useUserStore } from "@/store/useUserStore";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const { isUSerLoading, user, getUser, updateUser } = useUserStore(); // Add updateUser from store
  console.log(`isUSerLoading => `, isUSerLoading);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const [userInfo, setUserInfo] = useState({
    pictureUrl: "/images/products/no-image.jpg",
    displayName: "",
    shopName: "-",
    phoneNumber: "-",
    address: "-",
  });

  useEffect(() => {
    getUser(); // Fetch user data on mount
  }, [getUser]);

  useEffect(() => {
    if (user) {
      setUserInfo({
        pictureUrl: user.pictureUrl || "/images/products/no-image.jpg",
        displayName: user.displayName || "",
        shopName: user.shopName || "-",
        phoneNumber: user.phoneNumber || "-",
        address: user.address || "-",
      });
    }
  }, [user]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsEditing(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateUser(userInfo); // Update user in the store
      setIsEditing(false); // Exit editing mode after successful update
      getUser();
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold text-center mb-6">ข้อมูลส่วนตัว</h1>
      <div className="flex justify-center mb-6 space-x-2">
        <button
          onClick={() => handleTabChange("profile")}
          className={`py-2 px-4 rounded-xl w-full text-xl border ${
            activeTab === "profile"
              ? "bg-light-primary text-green-black border-green-dark"
              : "border-light-primary text-green-medium"
          }`}
        >
          ข้อมูลส่วนตัว
        </button>
        <button
          onClick={() => handleTabChange("orderHistory")}
          className={`py-2 px-4 rounded-xl w-full text-xl border ${
            activeTab === "orderHistory"
              ? "bg-light-primary text-green-black border-green-dark"
              : "border-light-primary text-green-medium"
          }`}
        >
          ประวัติการสั่งซื้อ
        </button>
      </div>

      <div className="bg-white shadow-xl rounded-lg p-4 max-w-md mx-auto mt-10">
        {activeTab === "profile" && (
          <form onSubmit={handleSubmit}>
            <div className="text-center mb-6">
              <Image
                src={userInfo.pictureUrl}
                alt="Profile"
                width={100}
                height={100}
                className="w-36 h-36 object-cover rounded-full mx-auto"
              />
            </div>
            {["displayName", "shopName", "phoneNumber", "address"].map(
              (field) => (
                <div key={field} className="mb-4">
                  <p className="block font-semibold">
                    {field === "displayName"
                      ? "ชื่อ"
                      : field === "shopName"
                      ? "ชื่อร้าน"
                      : field === "phoneNumber"
                      ? "เบอร์โทรศัพท์"
                      : "รายละเอียดที่อยู่"}
                  </p>
                  {isEditing ? (
                    <input
                      type={field === "address" ? "textarea" : "text"}
                      name={field}
                      readOnly={field === "displayName"}
                      disabled={field === "displayName"}
                      value={userInfo[field as keyof typeof userInfo]}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    />
                  ) : (
                    <p className="text-lg font-semibold block border rounded-xl bg-gray-100 p-2 h-12">
                      {userInfo[field as keyof typeof userInfo]}
                    </p>
                  )}
                </div>
              )
            )}
            <div className="text-center space-x-4">
              {!isEditing && (
                <button
                  type="button"
                  onClick={handleEditToggle}
                  className="bg-light-primary text-green-dark border border-green-dark py-2 px-6 rounded-md font-semibold hover:bg-opacity-90"
                >
                  แก้ไขข้อมูล
                </button>
              )}
              {isEditing && (
                <>
                  <button
                    type="submit"
                    className="bg-light-primary text-green-dark border border-green-dark py-2 px-6 rounded-md font-semibold hover:bg-opacity-90"
                  >
                    บันทึก
                  </button>
                  <button
                    type="button"
                    onClick={handleEditToggle}
                    className="border border-gray-500 text-gray-500 py-2 px-6 rounded-md font-semibold hover:bg-opacity-90"
                  >
                    ยกเลิก
                  </button>
                </>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
