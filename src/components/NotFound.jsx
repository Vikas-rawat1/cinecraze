import React from "react";
import notfound from "/404.webp";

function NotFound() {
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center bg-black">
        <img className="w-[20%] object-cover" src={notfound} alt="" />
      </div>
    </>
  );
}

export default NotFound;
