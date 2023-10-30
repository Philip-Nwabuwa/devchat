import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOptions)
  
  if (session?.user?.email) {
    redirect("/dashboard");
  }
  return (
    <div>
      <h1>Welcome to Dev Chat</h1>
      <p>Please Login</p>
      <Link href="/login">Login</Link>
    </div>
  );
};

export default page;
