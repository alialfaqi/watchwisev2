import { useSelector } from "react-redux";
import MediaItem from "./MediaItem";
import { FaSpinner } from "react-icons/fa";

const Search = () => {
  const { data, loading } = useSelector((state) => state.search);

  return (
    <>
      {!loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-6 gap-3 mx-4">
          {data.map((item, index) => (
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

export default Search;
