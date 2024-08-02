import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removemovie } from "../store/actions/movieActions";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";

function Moviedetails() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();
  console.log(info);

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, []);
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
      className="w-screen h-screen px-[10%]"
    >
      {/* PART 1 NAVIGATION */}
      <nav className="h-[10vh] w-full flex items-center gap-10 text-xl text-zinc-100">
        <Link
          onClick={goBack}
          className="hover:text-[#6556CD] ri-arrow-left-line text-3xl"
        ></Link>
        <a target="_blank" href={info.detail.homepage}>
          <i className="ri-external/-link-fill"></i>
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
          imdb
        </a>
      </nav>

      {/* PART 2 POSTER AND DETAILS */}
      <div className="w-full flex">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0.0.0.5)] w-[40vh] object-cover"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt=""
        />

        <div className="content ml-[5%]">
          <h1 className="text-5xl  font-black text-white">
            {info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}

            <small className="text-xl font-bold text-zinc-200 ">
              ({info.detail.release_date.split("-")[0]})
            </small>
          </h1>
        </div>
      </div>

      {/* PART 3 available on PLATFORM*/}

      <div className="w-[80%] flex flex-col gap-y-5 mt-10">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on Platform</h1>

            {info.watchproviders.flatrate.map((w) => (
              <img
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

            {info.watchproviders.rent.map((w) => (
              <img
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

            {info.watchproviders.buy.map((w) => (
              <img
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Moviedetails;
