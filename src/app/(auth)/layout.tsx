import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-red-200 h-full">{children}</div>;
};

export default layout;
