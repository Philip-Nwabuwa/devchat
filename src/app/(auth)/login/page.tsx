import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginForm from "@/app/components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user?.email) {
    redirect("/dashboard");
  }

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default page;
