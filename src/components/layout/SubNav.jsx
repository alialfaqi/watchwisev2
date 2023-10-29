import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { menuActions } from "../../store/menuSlice";
import { toast } from "react-toastify";
import { Transition } from "react-transition-group";
import { Link } from "react-router-dom";
import { BsFillCollectionFill, BsSearch } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { BiSolidTruck } from "react-icons/bi";
import { PiShoppingBagFill } from "react-icons/pi";
import { MdAdd, MdDragIndicator } from "react-icons/md";
import { handleSearch } from "../../store/searchSlice";
import { getMovieGenres, getTvGenres } from "../../store/movieSlice";

const Subnav = () => {
  const menu = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  const searchBar = useRef();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const { data } = useSelector((state) => state.search);
  const { movieGenres, tvGenres } = useSelector((state) => state.movies);

  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

  // const changeHandler = debounce((e) => {
  //   setSearchText(e.target.value.toLowerCase());
  // }, 900);

  // useEffect(() => {
  //   dispatch(handleSearch(searchText));
  // }, [searchText]);

  useEffect(() => {
    dispatch(getMovieGenres());
    dispatch(getTvGenres());
  }, []);

  const handleSearchInput = (e) => {
    setSearchText(e.target.value);
  };

  const getSearchResult = (e) => {
    e.preventDefault();
    dispatch(handleSearch(searchText));
    dispatch(menuActions.closeAllMenus());
    navigate("/search");
  };

  // const navToResults = () => {
  //   dispatch(menuActions.closeAllMenus());
  //   setSearchText("");
  //   navigate(`/services?keyword=${searchText}`);
  //   searchBar.current.value = "";
  // };

  function navTo(destination) {
    if (window.localStorage.getItem("logged")) {
      dispatch(menuActions.closeAllMenus());
      // navigate(destination);
    } else {
      toast.info("please sign in first !", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  function navToChoosenCatg(catg) {
    dispatch(menuActions.closeAllMenus());
    // navigate(`/services?category=${catg}`);
  }

  return (
    <>
      <div className="fixed z-10">
        <Transition
          in={menu.isSubVisible}
          timeout={300}
          mountOnEnter
          unmountOnExit
        >
          {(state) => (
            <ul
              style={{
                transition: "all 0.3s ease-in-out",
                transform:
                  state === "entering" || state === "entered"
                    ? "translateX(0)"
                    : "translateX(-100%)",
              }}
              className="py-3  bg-white w-[200px] md:w-[240px] h-[95vh] top-[58px]  absolute text-text1 z-[51] shadow-md"
            >
              {/* ---------searchbar------  */}
              <li className="relative  mb-5 flex">
                <form action="" onSubmit={getSearchResult}>
                  <input
                    onChange={handleSearchInput}
                    ref={searchBar}
                    type="text"
                    className="realtive mx-3 px-5 py-3 w-full text-text1 bg-primary border-2 border-transparent focus:border-text1 rounded-lg shadow-primary  outline-none "
                    placeholder="Search..."
                  />
                </form>

                {/* <BsSearch
                  size={22}
                  className="absolute right-5 top-3  cursor-pointer"
                  //onClick={navToResults}
                /> */}
              </li>

              {/* ----------catgories-------- */}
              <li
                className="hover:bg-primary cursor-pointer text-md md:text-lg py-3 pl-4 flex justify-start items-center gap-2"
                onClick={() => dispatch(menuActions.toggleSubCategories())}
              >
                <BsFillCollectionFill /> Categories
              </li>

              <Transition
                in={menu.isCatgSubMenuVisible}
                timeout={300}
                mountOnEnter
                unmountOnExit
              >
                {(state) => (
                  <ul
                    className="cursor-pointer mx-5  text-xs md:text-sm py-2 text-start flex flex-col justify-start  gap-1"
                    style={{
                      transition: "all 0.3s ease-in-out",
                      transform:
                        state === "entering" || state === "entered"
                          ? "translateX(0)"
                          : "translateX(-100%) ",
                      opacity:
                        state === "entering" || state === "entered"
                          ? "opacity-1"
                          : "opacity-0 ",
                    }}
                  >
                    {movieGenres.map((genre, index) => (
                      <li
                        key={index}
                        className="font-[400] pb-2 hover:bg-primary flex items-center gap-2"
                      >
                        <MdDragIndicator /> <span> {genre} </span>
                      </li>
                    ))}
                  </ul>
                )}
              </Transition>
            </ul>
          )}
        </Transition>
      </div>
    </>
  );
};

export default Subnav;
