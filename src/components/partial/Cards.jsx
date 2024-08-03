import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";

function Cards({ data, title }) {
  // console.log(data)
  return (
    <>
      <div className="w-full justify-center m-auto flex flex-wrap gap-10 p-[5%] bg-[#1F1E24] overflow-hidden overflow-x-hidden ">
        {data.map((card, index) => (
          <Link
            to={`/${card.media_type || title}/details/${card.id}`}
            className=" relative w-[40vh] mb-[5%]"
            key={index}
          >
            <img
              className="shadow-[8px_17px_38px_2px_rgba(0.0.0.5)] w-[40vh] object-cover rounded-md"
              src={
                card.poster_path || card.backdrop_path || card.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      card.poster_path ||
                      card.backdrop_path ||
                      card.profile_path
                    }`
                  : noimage
              }
              alt=""
            />
            <h1 className="text-xl text-zinc-200 mt-3 font-semibold">
              {card.title || card.original_name || card.original_title}
            </h1>

            {card.vote_average && (
              <div className="absolute right-[-15%] bottom-[25%] rounded-full font-semibold text-xl bg-yellow-500 text-white w-[8vh] h-[8vh] lg:w-[10vh]  lg:h-[10vh] flex justify-center items-center">
                {(card.vote_average * 10).toFixed()} <sup>%</sup>
              </div>
            )}
          </Link>
        ))}
      </div>
    </>
  );
}

export default Cards;
