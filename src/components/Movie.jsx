import axios from "../utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "./partial/Dropdown";
import Topnav from "./partial/Topnav";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";
import Cards from "./partial/Cards";

function Movie() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const [category, setCategory] = useState("now_playing");
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "CineCraze | movie ";
  const GetMovie = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);
      // console.log(data);
      if (data.results.length > 0) {
        setMovie((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refreshHandler = () => {
    if (movie.length === 0) {
      GetMovie();
    } else {
      setPage(1);
      setMovie([]);
      GetMovie();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);
  return movie.length > 0 ? (
    <>
      <div className="  w-screen h-screen ">
        <div className="px-[5%] w-full h-[10vh]  flex  items-center justify-between">
          <i
            onClick={goBack}
            className="text-white hover:text-[#6556CD] ri-arrow-left-line text-2xl"
          ></i>{" "}
          <h1 className="text-xl text-zinc-400 font-semibold">
            Movie{" "}
            <small className="text-sm ml-1 text-zinc-600">({category})</small>
          </h1>
          <div className="flex items-center w-[80%]">
            <Topnav />
            <Dropdown
              title="Category"
              options={["popular", "top_rated", "upcoming", "now_playing"]}
              func={(e) => setCategory(e.target.value)}
            />
            <div className="w-[2%]"></div>
          </div>
        </div>

        <InfiniteScroll
          dataLength={movie.length}
          next={GetMovie()}
          hasMore={hasMore}
          loader={<h1>loading</h1>}
        >
          <Cards data={movie} title="movie" />
        </InfiniteScroll>
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Movie;
