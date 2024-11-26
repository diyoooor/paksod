import { useState, useCallback } from "react";
import useSWR from "swr";
import debounce from "lodash.debounce";
import { fetcherWithHeaders } from "@/utils/fetcher";
import Swal from "sweetalert2";

export const useUser = () => {
  const { data, error, mutate, isLoading } = useSWR(
    "/api/users",
    fetcherWithHeaders
  );

  const [users, setUsers] = useState(data || []);

  const createUser = async (userData) => {
    try {
      setUsers((prev) => [...prev, userData]); // Optimistic update
      await fetcherWithHeaders("/api/users", "POST", userData);
      mutate(); // Revalidate user data
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  const updateUser = async (userId, updatedData) => {
    try {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, ...updatedData } : user
        )
      );
      await fetcherWithHeaders(`/api/users/${userId}`, "PUT", updatedData);
      mutate();
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const debouncedUpdateUser = useCallback(
    debounce((userId, updatedData) => {
      updateUser(userId, updatedData);
    }, 500),
    []
  );

  const deleteUser = async (userId) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setUsers((prev) => prev.filter((user) => user.id !== userId)); // Optimistic update
          await fetcherWithHeaders(`/api/users/${userId}`, "DELETE");
          mutate();
        }
      });
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return {
    users,
    error,
    isLoading,
    createUser,
    updateUser: debouncedUpdateUser,
    deleteUser,
    mutate,
  };
};
