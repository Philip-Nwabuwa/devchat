import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main>
      This is a protected route{" "}
      <div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </main>
  );
}
