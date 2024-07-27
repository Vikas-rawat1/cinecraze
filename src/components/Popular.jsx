import axios from "../utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "./partial/Dropdown";
import Topnav from "./partial/Topnav";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";
import Cards from "./partial/Cards";

function Popular() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const [category, setCategory] = useState("movie");
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "CineCraze | Popular " + category.toUpperCase();
  const GetPopular = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);
      console.log(data);
      if (data.results.length > 0) {
        setPopular((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refreshHandler = () => {
    if (popular.length === 0) {
      GetPopular();
    } else {
      setPage(1);
      setPopular([]);
      GetPopular();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);
  return popular.length > 0 ? (
    <>
      <div className="  w-screen h-screen ">
        <div className="px-[5%] w-full h-[10vh]  flex  items-center justify-between">
          <i
            onClick={goBack}
            className="hover:text-[#6556CD] ri-arrow-left-line text-3xl"
          ></i>{" "}
          <h1 className="text-xl text-zinc-400 font-semibold">Popular</h1>
          <div className="flex items-center w-[80%]">
            <Topnav />
            <Dropdown
              title="Category"
              options={["tv", "movie"]}
              func={(e) => setCategory(e.target.value)}
            />
            <div className="w-[2%]"></div>
          </div>
        </div>

        <InfiniteScroll
          dataLength={popular.length}
          next={GetPopular()}
          hasMore={hasMore}
          loader={<h1>loading</h1>}
        >
          <Cards data={popular} title={popular} />
        </InfiniteScroll>
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Popular;
