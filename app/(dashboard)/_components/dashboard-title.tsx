import React from "react";

const DashboardTitle = ({
  heading,
  description,
}: {
  heading: string;
  description: string;
}) => {
  return (
    <div className="space-y-2">
      <h1 className="font-bold text-2xl lg:text-[2rem]">{heading}</h1>
      <p className="text-gray-400 text-lg">{description}</p>
    </div>
  );
};

export default DashboardTitle;
