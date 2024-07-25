import { Link } from "react-router-dom";

function Sidenav() {
  return (
    <>
      <div className="w-[20%] h-[100%] border-r-2 border-zinc-400 p-10">
        <h1 className="text-2xl text-white font-bold">
          <i className="text-[#6556CD] ri-tv-fill mr-2"></i>
          <span className="text-2xl">SCDB</span>
        </h1>
        <nav className="flex flex-col text-zinc-400 text-sm">
          <h1 className="text-white font-semibold text-xl mt-6">New Feeds</h1>
          <Link className="hover:bg-[#6556CD] hover:text-white rounded-lg  p-5">
            <i className="ri-fire-line"></i> Trending
          </Link>
          <Link className="hover:bg-[#6556CD] hover:text-white rounded-lg  p-5">
            <i className="ri-bard-fill"></i> Popular
          </Link>
          <Link className="hover:bg-[#6556CD] hover:text-white rounded-lg  p-5">
            <i className="ri-movie-2-fill"></i> Movies
          </Link>
          <Link className="hover:bg-[#6556CD] hover:text-white rounded-lg  p-5">
            <i className="ri-tv-fill"></i> TV Shows
          </Link>
          <Link className="hover:bg-[#6556CD] hover:text-white rounded-lg  p-5">
            <i className="ri-team-fill"></i> People
          </Link>
        </nav>
        <hr className="border-none h-[1px] bg-zinc-400" />
        <nav className="flex flex-col text-zinc-400 text-sm">
          <h1 className="text-white font-semibold text-sm mt-6">
            Website Information
          </h1>
          <Link className="hover:bg-[#6556CD] hover:text-white rounded-lg  p-5">
            <i className="ri-information-fill"></i> About Moviex
          </Link>
          <Link className="hover:bg-[#6556CD] hover:text-white rounded-lg  p-5">
            <i className="ri-phone-fill"></i> Contact Us
          </Link>
        </nav>
      </div>
    </>
  );
}

export default Sidenav;
