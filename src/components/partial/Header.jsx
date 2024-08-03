import React from "react";
import { Link } from "react-router-dom";

function Header({ data }) {
  // console.log(data);
  return (
    <>
      <div
        style={{
          background: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.7),rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${
            data.backdrop_path || data.profile_path
          })`,
          backgroundPosition: "top 10%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="w-full h-[70vh] flex flex-col justify-center lg:justify-end items-start p-[5%]"
      >
        <h1 className="w-[70%] w-[70%]text-5xl font-black text-white">
          {data.title || data.original_name || data.original_title}
        </h1>
        <p className="text-white mt-3 ">
          {data.overview.slice(0, 200)} ...
          <Link
            to={`/${data.media_type}/details/${data.id}`}
            className="text-blue-400"
          >
            more
          </Link>
        </p>
        <p className="mt-3 flex text-white">
          <i className=" text-yellow-500 ri-megaphone-fill"></i>{" "}
          {data.release_date || "No release date"}
          <i className="ml-5 text-yellow-500 ri-album-fill"></i>{" "}
          {data.media_type.toUpperCase()}
        </p>
        <Link
          to={`/${data.media_type}/details/${data.id}/trailer`}
          className=" p-2 rounded text-white mt-6 bg-[#6556CD]"
        >
          Watch Trailers
        </Link>
      </div>
    </>
  );
}

export default Header;
