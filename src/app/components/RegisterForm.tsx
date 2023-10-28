"use client";
import { useEdgeStore } from "@/lib/edgestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterForm = () => {
  const { edgestore } = useEdgeStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState<File>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Please fill all the fields");
      return;
    }

    const lowerCaseName = name.toLowerCase();
    setName(lowerCaseName);

    try {
      let NewImage: string | null = null;
      if (image) {
        console.log("image", image);

        const uploadedImage = await edgestore.publicFiles.upload({
          file: image,
        });
        console.log("uploadedImage", uploadedImage);

        NewImage = uploadedImage?.url;
      }

      console.log(NewImage);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: lowerCaseName,
          email,
          password,
          image: NewImage,
        }),
      });

      const data = await res.json();
      console.log(data);
      if (res.ok) {
        const form = e.target as HTMLFormElement;
        form.reset();
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
          type="file"
          onChange={(e) => {
            setImage(e.target.files?.[0]);
          }}
        />{" "}
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
        <button type="submit">Register</button>
        {error && <div className="bg-red-400 mt-3">{error}</div>}
      </form>
      <div>
        already have an account{" "}
        <Link href="/login" className="hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
