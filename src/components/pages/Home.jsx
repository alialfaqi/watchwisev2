import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrending } from "../../store/movieSlice";
import MediaItem from "../MediaItem";
import { FaSpinner } from "react-icons/fa";
import Slider from "../../UI/Slider";

const Home = () => {
  const { trendingMovies, loading } = useSelector((state) => state.movies);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTrending());
  }, []);

  return (
    <>
      <Slider trendingMovies={trendingMovies} />
      {!loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-6 gap-3 mx-4">
          {trendingMovies.map((item, index) => (
            <MediaItem key={index} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[100vh] w-full">
          <FaSpinner className="animate-spin font-bolder   text-[10rem]" />
        </div>
      )}
    </>
  );
};

export default Home;
