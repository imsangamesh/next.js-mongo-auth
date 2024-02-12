"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const logout = async () => {
    try {
      await axios.get("api/users/logout");
      toast.success("Logout success");

      router.push("/login");
    } catch (error: any) {
      console.log("Logout Error: ", error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setData(res.data.data._id);
    } catch (error: any) {
      console.log("Error getting data: ", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile Page</h1>

      <h2>
        {data === "nothing" ? (
          "Nothing!"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>

      {/* --------------- GET USER DETAILS */}
      <button
        onClick={getUserDetails}
        className="w-[250px] py-2 bg-purple-400 rounded-lg mt-10">
        Get data
      </button>

      {/* --------------- LOGOUT */}
      <button
        onClick={logout}
        className="w-[250px] py-2 bg-red-800 rounded-lg mt-10">
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
