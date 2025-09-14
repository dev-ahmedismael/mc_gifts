import WheelSVG from "@/components/WheelSVG";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen flex justify-center items-center relative">
      <div className="absolute top-0 left-0 w-full flex justify-between p-5">
        <div>
          <Image src={"/images/2.jpg"} alt="logo" width={400} height={100} />
        </div>
        <div>
          <Image src={"/images/logo.png"} alt="logo" width={250} height={250} />
        </div>
      </div>
      <div className="relative z-50">
        <WheelSVG />
      </div>
      <div
        className="absolute bottom-0 left-0 w-full h-[150px] bg-repeat-x bg-bottom"
        style={{ backgroundImage: "url('/images/1.jpg')" }}
      />
    </div>
  );
};

export default page;
