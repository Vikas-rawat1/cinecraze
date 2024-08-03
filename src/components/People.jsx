import axios from "../utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "./partial/Dropdown";
import Topnav from "./partial/Topnav";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";
import Cards from "./partial/Cards";

function People() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const [category, setCategory] = useState("popular");
  const [person, setPerson] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "CineCraze | People ";
  const GetPerson = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      // console.log(data);
      if (data.results.length > 0) {
        setPerson((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refreshHandler = () => {
    if (person.length === 0) {
      GetPerson();
    } else {
      setPage(1);
      setPerson([]);
      GetPerson();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);
  return person.length > 0 ? (
    <>
      <div className="lg:w-screen lg:h-screen w-full">
        <div className="lg:px-[5%] lg:w-full lg:h-[10vh] flex flex-col lg:flex-row lg:items-center lg:justify-between p-2 ">
          <i
            onClick={goBack}
            className="lg:block hidden text-white hover:text-[#6556CD] ri-arrow-left-line text-3xl"
          ></i>{" "}
          <h1 className="lg:block hidden lg:text-xl text-zinc-400 font-semibold ">
            People
            <small className="text-sm ml-1 text-zinc-600">({category})</small>
          </h1>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:w-[80%]  lg:mt-0  lg:space-y-0 lg:space-x-4">
            <Topnav />
            <h1 className="lg:hidden ml-6 lg:text-xl text-zinc-400 font-semibold ">
             People
              <small className="text-sm ml-1 text-zinc-600">
                ( {category})
              </small>
            </h1>
          </div>
        </div>

        <InfiniteScroll
          dataLength={person.length}
          next={GetPerson()}
          hasMore={hasMore}
          loader={<h1>loading</h1>}
        >
          <Cards data={person} title="person" />
        </InfiniteScroll>
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default People;
