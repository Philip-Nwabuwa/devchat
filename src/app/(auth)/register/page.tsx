import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import RegisterForm from "@/app/components/RegisterForm";
import { getServerSession } from "next-auth";
import React from "react";

const page = async () => {
  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default page;
