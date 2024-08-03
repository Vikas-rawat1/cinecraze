import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";

function Topnav() {
  const [query, setQuery] = useState("");
  // console.log(query);

  const [searches, setSearches] = useState([]);

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      // console.log(data);
      setSearches(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  useEffect(() => {
    GetSearches();
  }, [query]);
  return (
    <>
      <div className="w-full lg:w-[80%] h-[10vh] relative  items-center m-auto flex  ">
        <div className="lg:hidden ">
          <i className="text-[#6556CD] ri-menu-line text-2xl"></i>
        </div>
        <div>
          <i className="text-zinc-400 text-xl ri-search-line lg:mx-5 mx-2"></i>
          <input
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            type="text"
            placeholder="Search Anything"
            className="lg:w-[60%] text-zinc-200 lg:mx-1 lg:p-5 outline-none border-none bg-transparent"
          />
          {query.length > 0 && (
            <i
              onClick={() => setQuery("")}
              className=" text-zinc-400 text-3xl  ri-close-fill"
            ></i>
          )}
        </div>
        <div className="z-[100] absolute w-[60%] max-h-[50vh] bg-zinc-200 top-[90%] left-[2%] overflow-auto">
          {searches.map((s, index) => (
            <Link
              to={`/${s.media_type}/details/${s.id}`}
              key={index}
              className="hover:text-black hover:bg-zinc-300 font-semibold text-zinc-600 w-[100%] p-8 flex justify-start items-center border-b-2 border-zinc-100"
            >
              <img
                className="w-[13vh] h-[13vh] object-cover rounded mr-3 shadow-lg"
                src={
                  s.backdrop_path || s.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        s.backdrop_path || s.profile_path
                      }`
                    : noimage
                }
                alt=""
              />
              <span>{s.title || s.name || s.original_title}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Topnav;
