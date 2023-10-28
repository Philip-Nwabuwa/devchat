import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Image from "next/image";
import Logout from "../components/Logout";

const page = async () => {
  const session = await getServerSession(authOptions);

  console.log(session);

  return (
    <div>
      <Image
        src={session?.user?.image!}
        alt="user profile image"
        width={100}
        height={100}
      />
      <p>Signed in as {session?.user?.email}</p>

      <Logout />
    </div>
  );
};

export default page;
