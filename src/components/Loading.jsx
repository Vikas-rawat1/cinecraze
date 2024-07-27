import React from "react";
import loader from "/loader.webp";

function Loading() {
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center bg-black">
        <img className="w-[20%] object-cover" src={loader} alt="" />
      </div>
    </>
  );
}

export default Loading;
