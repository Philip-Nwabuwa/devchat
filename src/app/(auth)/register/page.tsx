import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import RegisterForm from "@/app/components/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user?.email) {
    redirect("/dashboard");
  }

  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default page;
