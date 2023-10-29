import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MediaItem = ({ item }) => {
  return (
    <>
      <div>
        <Link to={`/itemdetails/${item.id}/${item.media_type}`}>
          <div className="movie relative transform transition-transform hover:scale-105 ">
            <img
              src={"https://image.tmdb.org/t/p/w500" + item.poster_path}
              className="w-full rounded-md"
              alt=""
            />
            <h3 className="absolute text-white font-bold bottom-2 left-2">
              {item.name ?? item.title}
            </h3>
            <div className="absolute text-[1.2rem] px-2 py-1 top-2 right-2 bg-yellow-500 b rounded-md">
              {item.vote_average?.toFixed(1)}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default MediaItem;
