"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { ActionTooltip } from "./tooltip";

interface NavitemsProps {
  id: string;
  imageUrl: string;
  name: string;
}

const Navitems = ({ id, imageUrl, name }: NavitemsProps) => {
  const params = useParams();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/server/${id}`);
  };
  return (
    <ActionTooltip label={name} side="right" align="center">
      <button
        onClick={handleClick}
        className="group relative flex items-center"
      >
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
            params?.serverId !== id && "group-hover:h-[20px]",
            params?.serverId === id ? "h-[36px]" : "h-[8px]"
          )}
        />
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-3xl group-hover:rounded-2xl transition-all overflow-hidden",
            params?.serverId === id && "bg-primary/10 text-primary rounded-2xl"
          )}
        >
          <Image src={imageUrl} alt={name} fill />
        </div>
      </button>
    </ActionTooltip>
  );
};

export default Navitems;
