"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/login", user);
      console.log("login success:");

      router.push("/profile");
    } catch (error: any) {
      console.log("Error logging in: ", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl mb-5">
        {loading ? "-------- loading ---------" : "Login"}
      </h1>
      {/* ---------------------- email */}
      <hr />
      <label htmlFor="email">email</label>
      <input
        type="text"
        id="email"
        placeholder="email"
        value={user.email}
        onChange={(e) =>
          setUser((prev) => ({ ...prev, email: e.target.value }))
        }
        className="p-2 border bg-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      />

      {/* ---------------------- password */}
      <hr />
      <label htmlFor="password">password</label>
      <input
        type="text"
        id="password"
        placeholder="password"
        value={user.password}
        onChange={(e) =>
          setUser((prev) => ({ ...prev, password: e.target.value }))
        }
        className="p-2 border bg-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      />

      {/* ---------------------- button */}
      <button
        onClick={onLogin}
        className="w-[250px] py-2 bg-gray-800 rounded-lg mb-4">
        Login up
      </button>

      <Link href="/signup">Signup Page</Link>
    </div>
  );
};

export default LoginPage;
