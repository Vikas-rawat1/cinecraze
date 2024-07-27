import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./Topnav";
import Dropdown from "./Dropdown";
import axios from "../../utils/axios";
import Cards from "./Cards";
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
  const [hasMore, setHasMore] = useState(1);

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );

      if (data.results.length > 0) {
        setTrending((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(fales);
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
      // GetTrending();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  return trending.length > 0 ? (
    <>
      <div className="  w-screen h-screen ">
        <div className="px-[5%] w-full h-[10vh]  flex  items-center justify-between">
          <i
            onClick={goBack}
            className="hover:text-[#6556CD] ri-arrow-left-line text-3xl"
          ></i>{" "}
          <h1 className="text-xl text-zinc-400 font-semibold">Trending</h1>
          <div className="flex items-center w-[80%]">
            <Topnav />
            <Dropdown
              title="Category"
              options={["movie", "tv", "all"]}
              func={(e) => setCategory(e.target.value)}
            />
            <div className="w-[2%]"></div>
            <Dropdown
              title="Duration"
              options={["week", "day"]}
              func={(e) => setDuration(e.target.value)}
            />
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
  ) : (
    <Loading />
  );
}

export default Trending;
