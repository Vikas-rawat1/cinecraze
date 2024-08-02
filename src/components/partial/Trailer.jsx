import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function Trailer() {
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";

  const ytvideo = useSelector((state) => state[category].info.videos);

  console.log(ytvideo);
  return (
    <>
      <div className="bg-[rgba(0,0,0,.9)] absolute top-0 left-0 z-[100] w-screen h-screen flex item-center justify-center">
        <ReactPlayer
          height={600}
          width={1000}
          url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
        />
      </div>
    </>
  );
}

export default Trailer;
