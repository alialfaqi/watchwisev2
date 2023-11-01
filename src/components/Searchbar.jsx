/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Transition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { menuActions } from "../store/menuSlice";
import { handleSearch } from "../store/searchSlice";

const Searchbar = (props) => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const searchBar = useRef();
  const dispatch = useDispatch();

  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

  const handleSearchInput = (e) => {
    setSearchText(e.target.value);
  };

  const getSearchResult = (e) => {
    e.preventDefault();
    dispatch(handleSearch(searchText));
    dispatch(menuActions.closeAllMenus());
    navigate("/search");
  };

  return (
    <Transition
      in={props.isSearchBarVisible}
      timeout={300}
      mountOnEnter
      unmountOnExit
    >
      {(state) => (
        <div
          className="fixed z-20 top-[58px] left-0 w-full"
          style={{
            transition: "all 0.3s ease-in-out",
            transform:
              state === "entering" || state === "entered"
                ? "translateY(0)"
                : "translateY(-100%)",
          }}
        >
          <form
            className="flex items-center justify-center"
            action=""
            onSubmit={getSearchResult}
          >
            <input
              onChange={handleSearchInput}
              ref={searchBar}
              type="text"
              autoFocus
              className="realtive px-5 py-5 w-full text-text1 bg-white border-2 border-primary   outline-none  "
              placeholder="Search..."
            />
          </form>
        </div>
      )}
    </Transition>
  );
};

export default Searchbar;
