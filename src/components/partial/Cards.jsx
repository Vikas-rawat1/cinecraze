import { data } from "autoprefixer";
import React from "react";
import { Link } from "react-router-dom";

function Cards({ data, title }) {
  return (
    <>
      <div className="w-full flex flex-wrap gap-10 h-[vh] p-[5%] bg-[#1F1E24]">
        {data.map((card, index) => (
          <Link className="w-[40vh]   mb-[5%]" key={index}>
            <img
              className="shadow-[8px_17px_38px_2px_rgba(0.0.0.5)] w-[40vh] object-cover"
              src={`https://image.tmdb.org/t/p/original/${
                card.poster_path || card.backdrop_path
              }`}
              alt=""
            />
            <h1 className="text-2xl text-zinc-200 mt-3 font-semibold">
              {card.title || card.original_name || card.original_title}
            </h1>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Cards;
