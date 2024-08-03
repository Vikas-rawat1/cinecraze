import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partial/Topnav";
import Dropdown from "./partial/Dropdown";
import axios from "../utils/axios";
import Cards from "./partial/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

function Trending() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "CineCraze | Trending " + category.toUpperCase();

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );

      if (data.results.length > 0) {
        setTrending((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }

      // setTrending(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  // console.log(trending);

  const refreshHandler = () => {
    if (trending.length === 0) {
      GetTrending();
    } else {
      setPage(1);
      setTrending([]);
      GetTrending();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  return trending.length > 0 ? (
  // return (
    <>
      <div className="lg:w-screen lg:h-screen w-full text-white">
        <div className="lg:px-[5%] lg:w-full lg:h-[10vh] flex flex-col lg:flex-row lg:items-center lg:justify-between p-2 ">
          <i
            onClick={goBack}
            className="lg:block hidden text-white hover:text-[#6556CD] ri-arrow-left-line text-3xl"
          ></i>{" "}
          <h1 className="lg:block hidden lg:text-xl text-zinc-400 font-semibold ">
            Trending
          </h1>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:w-[80%]  lg:mt-0  lg:space-y-0 lg:space-x-4">
            <Topnav />
            <div className="flex justify-center mt-2 space-x-4">
              <Dropdown
                title="Category"
                options={["movie", "tv", "all"]}
                func={(e) => setCategory(e.target.value)}
              />
              <Dropdown
                title="Duration"
                options={["week", "day"]}
                func={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>
        </div>

        <InfiniteScroll
          dataLength={trending.length}
          next={GetTrending()}
          hasMore={hasMore}
          loader={<h1>loading</h1>}
        >
          <Cards data={trending} title={trending} />
        </InfiniteScroll>
      </div>
    </>
  // );
  ) : (
    <Loading />
  );
}

export default Trending;
