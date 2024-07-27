import React, { useEffect, useState } from "react";
import Sidenav from "./partial/Sidenav";
import Topnav from "./partial/Topnav";
import axios from "../utils/axios";
import Header from "./partial/Header";
import HorizontalCards from "./partial/HorizontalCards";
import Dropdown from "./partial/Dropdown";
import Loading from "./Loading";

function Home() {
  document.title = "CineCraze | HomePage" ;
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState("all");

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomdata =
        data.results[(Math.random() * data.results.length).toFixed()];
      setWallpaper(randomdata);
      // console.log(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // console.log(wallpaper);
  useEffect(() => {
    GetTrending();
    !wallpaper && GetHeaderWallpaper();
  }, [category]);

  return wallpaper && trending ? (
    <>
      <Sidenav />
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden">
        <Topnav />
        <Header data={wallpaper} />
        <div className="p-10  flex justify-between items-center">
          <h1 className="text-3xl text-zinc-400  font-semibold p-5 ">
            Trending
          </h1>
          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <Loading/>
  );
}

export default Home;
