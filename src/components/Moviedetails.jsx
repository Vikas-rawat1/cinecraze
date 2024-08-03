import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removemovie } from "../store/actions/movieActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./partial/HorizontalCards";

function Moviedetails() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  const { pathname } = useLocation();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();
  console.log(info);

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [id]);
  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.7),rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${
          info.detail.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "top 10%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="relative w-screen min-h-[300vh] md:h-[300vw] lg:h-[110vw] px-[10%]"
    >
      {/* PART 1 NAVIGATION */}
      <nav className="mb-6 h-[10vh] w-full flex items-center gap-10 text-xl text-zinc-100">
        <Link
          onClick={goBack}
          className="text-white hover:text-[#6556CD] ri-arrow-left-line text-2xl"
        ></Link>
        <a target="_blank" href={info.detail.homepage}>
          <i className="ri-external-link-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
        >
          IMDB
        </a>
      </nav>

      {/* PART 2 POSTER AND DETAILS */}
      <div className="lg:w-full h-auto flex lg:flex-row flex-col">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0.0.0.5)] w-[50vh] object-cover"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt=""
        />

        <div className="content ml-[5%] text-white flex flex-col ">
          <h1 className="text-4xl  font-black ">
            {info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}

            <small className="text-xl font-bold text-zinc-200 ">
              ({info.detail.release_date.split("-")[0]})
            </small>
          </h1>{" "}
          <div className="mt-3 mb-5 flex  items-center gap-x-5 gap-y-10">
            <span className=" rounded-full font-semibold text-sm bg-yellow-500 text-white w-[8vh] h-[8vh] flex justify-center items-center">
              {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
            </span>
            <h1 className="w-[60px] font-semibold text-xl leading-6">
              User Score
            </h1>
            <h1 className="w">{info.detail.release_date}</h1>
            <h1 className="w">
              {info.detail.genres.map((g) => g.name).join(",")}
            </h1>
            <h1>{info.detail.runtime}min</h1>
          </div>
          <h1 className="text-2xl font-semibold italic text-zinc-200">
            {info.detail.tagline}
          </h1>
          <h1 className="text-xl mb-3 mt-3">Overview</h1>
          <p>{info.detail.overview}</p>
          <h1 className="text-xl mb-3 mt-5">Movie Translated</h1>
          <p className=" mb-10">{info.translations.join(", ")}</p>
          <Link
            className="p-3 overflow-hidden bg-[#6556CD] rounded-lg"
            to={`${pathname}/trailer`}
          >
            <i class="text-xl ri-play-fill mr-3"></i>
            Play Trailer
          </Link>
        </div>
      </div>

      {/* PART 3 available on PLATFORM*/}

      <div className="w-[80%] flex flex-col gap-y-5 mt-10">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on Platform</h1>

            {info.watchproviders.flatrate.map((w, index) => (
              <img
                key={index}
                title={w.title_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on Rent</h1>

            {info.watchproviders.rent.map((w, index) => (
              <img
                key={index}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available to Buy</h1>

            {info.watchproviders.buy.map((w, index) => (
              <img
                key={index}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
      </div>
      {/* PART 3 Recomendations and Similar Stuff*/}
      <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
      <h1 className="text-3xl   mt-5 mb-10 font-semibold text-white">
        Recommendations And Similar Stuff
      </h1>
      <HorizontalCards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      />
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
}

export default Moviedetails;
