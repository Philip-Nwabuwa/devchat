"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
const page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill all the fields");
      return;
    }

    try {
      const resUserExists = await fetch("/api/auth/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        console.log("user already exists");
        setError("User already exists");
        return;
      }

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      console.log(data);
      if (res.ok) {
        const form = e.target as HTMLFormElement;
        form.reset();
        router.push("/login");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-6">
      <h2>Register with email and password</h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="name"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <button>Login</button>
        {error && <div className="bg-red-400 mt-3">{error}</div>}
      </form>
      <div>
        already have an account{" "}
        <Link href="/" className="hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
};

export default page;
