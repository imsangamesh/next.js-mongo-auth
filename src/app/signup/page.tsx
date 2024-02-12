"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SignupPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/signup", user);

      console.log("Signup Success ", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Sign up failed: ", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl mb-5">
        {loading ? "-------- loading ---------" : "Sign Up"}
      </h1>
      {/* ---------------------- username */}
      <hr />
      <label htmlFor="username">username</label>
      <input
        type="text"
        id="username"
        placeholder="username"
        value={user.username}
        onChange={(e) =>
          setUser((prev) => ({ ...prev, username: e.target.value }))
        }
        className="p-2 border bg-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      />

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
        onClick={onSignup}
        className="w-[250px] py-2 bg-gray-800 rounded-lg mb-4">
        {buttonDisabled ? "No Sign up" : "Sign up"}
      </button>

      <Link href="/login">Login Page</Link>
    </div>
  );
};

export default SignupPage;
