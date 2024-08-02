import React from "react";
import { Link } from "react-router-dom";

function HorizontalCards({ data }) {
  // const
  return (
    <>
      {/* <div className="w-full h-[50vh] p-5"> */}

      <div className="w-[100%] flex h-[70vh] overflow-y-hidden mb-5 p-5">
        {data.map((card, index) => (
          <Link
            to={`/${card.media_type}/details/${card.id}`}
            key={index}
            className="min-w-[25%]  mr-5 mb-5 bg-zinc-900"
          >
            <img
              className="w-full h-[55%] object-cover"
              src={`https://image.tmdb.org/t/p/original/${
                card.backdrop_path || card.poster_path
              })`}
              alt=""
            />
            <div className="text-white p-3 h-[45%] overflow-y-auto">
              <h1 className="text-xl font-semibold mt-2">
                {card.title || card.original_name || card.original_title}
              </h1>
              <p className="text-sm mt-3 ">
                {card.overview.slice(0, 100)} ...
                <span className="text-blue-400"> more</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
      {/* </div> */}
    </>
  );
}

export default HorizontalCards;
