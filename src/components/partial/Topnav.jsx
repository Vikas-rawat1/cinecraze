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

  const [toggle, setToggle] = useState();

  const handleOpenMenu = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <div className="w-full lg:w-[80%] h-[10vh] relative items-center m-auto flex  justify-between p-2">
        <div className="lg:hidden ">
          <i
            onClick={handleOpenMenu}
            className="text-zinc-400 ri-menu-line text-3xl ml-4 "
          ></i>
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

        {/* Mobile Menu */}

        {toggle && (
          <div className="fixed top-0 left-0 w-full h-full bg-[#0c0c0c] text-white flex flex-col px-6 py-4 z-50">
            <div className="flex flex-col gap-4 font-poppins font-bold">
              <i
                onClick={handleOpenMenu}
                className="fixed right-0 text-zinc-400 text-4xl  ri-close-fill mt-5"
              ></i>
              <nav className="flex flex-col text-zinc-400 text-sm">
                <h1 className="text-white font-semibold text-4xl mt-6">
                  New Feeds
                </h1>
                <Link
                  to="/trending"
                  className="hover:bg-[#6556CD] hover:text-white rounded-lg  p-5 text-2xl mt-5"
                >
                  <i className="ri-fire-line"></i> Trending
                </Link>
                <Link
                  to="/popular"
                  className="hover:bg-[#6556CD] hover:text-white rounded-lg  p-5 text-2xl mt-2"
                >
                  <i className="ri-bard-fill"></i> Popular
                </Link>
                <Link
                  to="/movie"
                  className="hover:bg-[#6556CD] hover:text-white rounded-lg  p-5 text-2xl mt-2"
                >
                  <i className="ri-movie-2-fill"></i> Movies
                </Link>
                <Link
                  to="/tv"
                  className="hover:bg-[#6556CD] hover:text-white rounded-lg  p-5 text-2xl mt-2"
                >
                  <i className="ri-tv-fill"></i> TV Shows
                </Link>
                <Link
                  to="/person"
                  className="hover:bg-[#6556CD] hover:text-white rounded-lg  p-5 text-2xl mt-2"
                >
                  <i className="ri-team-fill"></i> People
                </Link>
              </nav>
            </div>
          </div>
        )}

        <div className="z-[100] absolute w-[90%] lg:w-[60%] max-h-[50vh] bg-zinc-200 top-[18vw] left-[4%] lg:top-[90%] lg:left-[2%] overflow-auto">
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
