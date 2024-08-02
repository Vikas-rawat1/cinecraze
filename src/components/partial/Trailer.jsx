import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotFound from "../NotFound";

function Trailer() {
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";

  const ytvideo = useSelector((state) => state[category].info.videos);

  console.log(pathname.includes("movie"),ytvideo);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="bg-[rgba(0,0,0,.9)] absolute top-0 left-0 z-[100] w-screen h-screen flex item-center justify-center">
        {ytvideo ? (
          <ReactPlayer
            height={600}
            width={1000}
            url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
          />
        ) : (
          <NotFound />
        )}
        <Link
          onClick={goBack}
          className="absolute top-[5%] right-[5%] text-white hover:text-[#6556CD] ri-close-fill text-3xl"
        ></Link>
      </div>
    </>
  );
}

export default Trailer;
