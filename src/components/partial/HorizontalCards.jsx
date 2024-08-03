import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";

function HorizontalCards({ data }) {
  // const
  return (
    <>
      <div className="lg:w-[100%] lg:flex h-[70vh] overflow-y-scroll lg:overflow-y-hidden mb-5 p-5">
        {data.length > 0 ? (
          data.map((card, index) => (
            <Link
              to={`/${card.media_type}/details/${card.id}`}
              key={index}
              className="lg:min-w-[25%] lg:h-[30vw] w-[20vw] mr-5 mb-5 bg-zinc-900"
            >
              <img
                className="lg:w-full h-[55%] object-cover "
                src={
                  card.backdrop_path || card.backdrop_path
                    ? `https://image.tmdb.org/t/p/original/${
                        card.backdrop_path || card.poster_path
                      })`
                    : noimage
                }
                alt=""
              />
              <div className="text-white p-3 lg:h-[45%] overflow-y-auto">
                <h1 className="text-xl font-semibold mt-2">
                  {card.title || card.original_name || card.original_title}
                </h1>
                <p className="text-sm mt-3 ">
                  {card.overview.slice(0, 100)} ...
                  <span className="text-blue-400"> more</span>
                </p>
              </div>
            </Link>
          ))
        ) : (
          <h1 className="text-3xl font-black text-white text-center mt-5 ">
            Nothing to show
          </h1>
        )}
      </div>
    </>
  );
}

export default HorizontalCards;
