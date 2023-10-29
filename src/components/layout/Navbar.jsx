/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { menuActions } from "../../store/menuSlice";
import { FiMenu } from "react-icons/fi";
import { BsFillBellFill, BsFillCollectionFill, BsSearch } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";
import { MdAdd } from "react-icons/md";
import { BiSolidTruck } from "react-icons/bi";
import { FaSignOutAlt } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { PiShoppingBagFill } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import Subnav from "./Subnav";
import Searchbar from "../Searchbar.jsx";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { useEffect } from "react";
import { signModalActions } from "../../store/signModalSlice";

const Navbar = (props) => {
  const menu = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  const { movieGenres, tvGenres } = useSelector((state) => state.movies);

  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["UserToken", "User"]);
  const [CurrUser, setCurrUser] = useState("");

  useEffect(() => {
    if (cookies.User) {
      setCurrUser(cookies.User);
      props.setUserStatus(true);
    } else {
      props.setUserStatus(false);
    }
  }, [cookies.User, props]);

  function signoutHandler() {
    removeCookie("UserToken");
    removeCookie("User");
    window.localStorage.removeItem("logged");
    navigate("/");
    window.location.reload();
  }

  return (
    <>
      <nav
        id="MainNav"
        className="fixed border-b border-gray-300  top-0  bg-white  h-15 w-full z-50 lg:px-1 px-1  flex justify-between"
      >
        <ul className="flex">
          {/* subnav icon */}
          <li
            className={
              menu.isSubVisible
                ? "cursor-pointer text-lg flex lg:hidden items-center px-2 py-1 lg:px-5 lg:py-3  text-text1 bg-primary"
                : "cursor-pointer  lg:hidden text-lg flex items-center  px-2 py-1  lg:px-5 lg:py-3  text-text1 hover:bg-primary"
            }
            onClick={() => dispatch(menuActions.toggleSubNav())}
          >
            <FiMenu size={30} />{" "}
          </li>
          {/* Logo */}
          <Link
            className="hidden md:flex items-center py-2 h-auto sm:w-56"
            to="/"
          >
            <li onClick={() => dispatch(menuActions.closeAllMenus())}>
              <span className="max-w-[160px] mb-[-8px] ml-4">WatchWise</span>
            </li>
          </Link>
          {/* Categories */}
          <li
            className={
              menu.isCategoryVisible
                ? "relative hidden lg:flex items-center  px-5 py-3  text-text1 bg-primary cursor-pointer gap-2"
                : "relative hidden lg:flex items-center  px-5 py-3  text-text1 hover:bg-primary cursor-pointer gap-2"
            }
            onClick={() => dispatch(menuActions.toggleCategories())}
          >
            <BsFillCollectionFill /> Movies
            {menu.isCatgMenuVisible && (
              <div className="bottom-[-250%] right-[-250%] rounded-md  z-40 absolute mt-2 w-[500%] text-center  bg-white  shadow-lg">
                <ul className="flex flex-wrap">
                  {movieGenres.map((genre) => {
                    return (
                      <li
                        // onClick={() =>
                        //   navigate(
                        //     `/services?category=${category.category_name}`
                        //   )
                        // }
                        className="border border-gray-100 cursor-pointer text-sm hover:bg-primary rounded-md  px-5 py-6 w-[25%]"
                        key={genre.id}
                      >
                        {genre}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </li>
        </ul>

        <ul className="flex">
          {/* Search */}
          <li
            className={
              menu.isSearchBarVisible
                ? "search flex items-center px-5 py-3 text-text1 bg-primary cursor-pointer"
                : "search flex items-center px-5 py-3 text-text1  hover:bg-primary cursor-pointer"
            }
            onClick={() => dispatch(menuActions.toggleSearchBar())}
          >
            <BsSearch size={20} />
          </li>
          {/* user  */}
          <li className="flex items-center py-2 sm:px-2 px-1  text-text1  text-sm:10 ">
            {props.userStatus ? (
              <div
                className="relative max-w-[100px] cursor-pointer  border-text1 border-2 rounded-full"
                onClick={() => dispatch(menuActions.toggleUserMenu())}
              >
                <div className="w-[45px] h-[45px] rounded-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={CurrUser.avatar}
                    alt="User Avatar"
                  />
                </div>
                {/* --------menu------ */}
                {menu.isUserMenuVisible && (
                  <>
                    <div className="relative z-30">
                      <ul className="flex flex-col gap-1 rounded-br-md rounded-bl-md absolute right-[-10px]   bottom-[-87px] min-w-[150px] bg-white  shadow-md ">
                        <li
                          className="flex gap-2 text-xs items-center z-10 py-2 pl-2 pr-6  font-semibold text-text1 hover:bg-primary cursor-pointer"
                          onClick={() => navigate("/userInfo")}
                        >
                          {" "}
                          <RxAvatar size={22} /> {CurrUser.first_name}{" "}
                          {CurrUser.last_name}
                        </li>

                        <li
                          onClick={signoutHandler}
                          className=" flex gap-2 items-center py-2 pl-2 pr-6  text-xs font-semibold text-text1 hover:bg-primary cursor-pointer"
                        >
                          <FaSignOutAlt className="ml-1" size={20} /> Sign Out{" "}
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                className="text-text1 transition-all whitespace-nowrap text-[13px] sm:text-[15px] rounded-md font-semibold border-2 hover:text-white hover:bg-text1 border-text1 px-1 sm:px-3 py-2"
                onClick={() => dispatch(signModalActions.toggleModal())}
              >
                Sign in
              </button>
            )}
          </li>
        </ul>
      </nav>
      <Searchbar isSearchBarVisible={menu.isSearchBarVisible} />
      {/* close overlay  */}
      {menu.isNotiMenuVisible ||
      menu.isUserMenuVisible ||
      menu.isCatgMenuVisible ||
      menu.isSearchBarVisible ? (
        <div
          className=" fixed top-0 left-0 w-full h-screen z-10 bg-opacity-40"
          onClick={() => dispatch(menuActions.closeAllMenus())}
        ></div>
      ) : (
        ""
      )}

      <Subnav isSubVisible={menu.isSubVisible} />
    </>
  );
};

export default Navbar;
