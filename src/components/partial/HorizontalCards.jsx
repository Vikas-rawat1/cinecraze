import React from "react";

function HorizontalCards({ data }) {
  // const
  return (
    <>
      {/* <div className="w-full h-[50vh] p-5"> */}

      <div className="w-[100%] flex h-[70vh] overflow-y-hidden mb-5 p-5">
        {data.map((card, index) => (
          <div key={index} className="min-w-[25%] h-full mr-5 mb-5 bg-zinc-900">
            <img
              className="w-full h-[55%] object-cover"
              src={`https://image.tmdb.org/t/p/original/${
                card.backdrop_path || card.poster_path
              })`}
              alt=""
            />
            <div className="text-white p-3 h-[45%]">
              <h1 className="text-xl font-semibold mt-2">
                {card.title || card.original_name || card.original_title}
              </h1>
              <p className="text-sm mt-3 ">
                {card.overview.slice(0, 100)} ...
                <span className="text-blue-400"> more</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* </div> */}
    </>
  );
}

export default HorizontalCards;
