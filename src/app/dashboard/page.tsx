import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Image from "next/image";
import Logout from "../components/Logout";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return (
    <div>
      <Image
        src={session?.user?.image!}
        alt="user profile image"
        width={100}
        height={100}
      />
      <p>Signed in as {session?.user?.email}</p>

      <p>{session.user?.name}</p>

      <Logout />
    </div>
  );
};

export default page;
