import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Logout from "../components/Logout";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { FileImage } from "lucide-react";

const page = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;  


  return (
    <div>
      <Avatar>
        {user?.image && (
          <AvatarImage src={`${user.image}`} alt="Preview" />
        )}
        <AvatarFallback>
          <FileImage />
        </AvatarFallback>
      </Avatar>
      <p>Signed in as {user?.email}</p>

      <p>{user?.name}</p>

      <Logout />
    </div>
  );
};

export default page;
