import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getItemDetails } from "../store/movieSlice";

const ItemDetails = () => {
  const { media_type, id } = useParams();
  const { itemDetails } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItemDetails({ media_type, id }));
  }, []);

  useEffect(() => {
    console.log(itemDetails);
  }, [itemDetails]);

  return (
    <>
      <div className="grid grid-cols-12 gap-3 ">
        <div className="col-span-12 md:col-span-4 order-2 md:order-1">
          <img
            src={"https://image.tmdb.org/t/p/w500" + itemDetails.poster_path}
            className="lg:w-[75%] mx-auto rounded-md"
            alt=""
          />
        </div>
        <div className="col-span-12 md:col-span-8 order-1 md:order-2">
          <h3 className="font-bolder text-[2rem]">
            {itemDetails.title} {itemDetails.name}
          </h3>
          <div className="flex my-2">
            {itemDetails?.genres?.map((genre) => (
              <div className=" rounded bg-yellow-500 me-1 p-1">
                {genre.name}
              </div>
            ))}
          </div>
          <p className="text-muted">{itemDetails.overview}</p>
        </div>
      </div>
    </>
  );
};

export default ItemDetails;
