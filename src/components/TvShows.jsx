import axios from "../utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "./partial/Dropdown";
import Topnav from "./partial/Topnav";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";
import Cards from "./partial/Cards";

function TvShows() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const [category, setCategory] = useState("airing_today");
  const [tv, setTv] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "CineCraze | Tv Shows ";
  const GetTv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      console.log(data);
      if (data.results.length > 0) {
        setTv((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refreshHandler = () => {
    if (tv.length === 0) {
      GetTv();
    } else {
      setPage(1);
      setTv([]);
      GetTv();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);
  return tv.length > 0 ? (
    <>
      <div className="  w-screen h-screen ">
        <div className="px-[5%] w-full h-[10vh]  flex  items-center justify-between">
          <i
            onClick={goBack}
            className="hover:text-[#6556CD] ri-arrow-left-line text-3xl"
          ></i>{" "}
          <h1 className="text-xl text-zinc-400 font-semibold">
            Tv Shows
            <small className="text-sm ml-1 text-zinc-600">( {category})</small>
          </h1>
          <div className="flex items-center w-[80%]">
            <Topnav />
            <Dropdown
              title="Category"
              options={["on_the_air", "popular", "top_rated", , "airing_today"]}
              func={(e) => setCategory(e.target.value)}
            />
            <div className="w-[2%]"></div>
          </div>
        </div>

        <InfiniteScroll
          dataLength={tv.length}
          next={GetTv()}
          hasMore={hasMore}
          loader={<h1>loading</h1>}
        >
          <Cards data={tv} title={tv} />
        </InfiniteScroll>
      </div>
    </>
  ) : (
    <Loading />
  );
}
export default TvShows;
