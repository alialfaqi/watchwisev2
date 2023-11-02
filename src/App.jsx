import "./App.css";

import Home from "./components/pages/Home";
import { Route, Routes } from "react-router-dom";
import ItemDetails from "./components/ItemDetails";
import Search from "./components/Search";
import { useDispatch, useSelector } from "react-redux";
import { menuActions } from "./store/menuSlice";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import UserInfo from "./components/pages/UserInfo";
import Navbar from "./components/layout/Navbar";

function App() {
  const [cookies, setCookies] = useCookies(["UserToken", "User"]);
  const signModal = useSelector((state) => state.signModal);
  const menu = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  const [userStatus, setUserStatus] = useState(
    window.localStorage.getItem("logged") || false
  );

  useEffect(() => {
    if (!cookies.User || !cookies.UserToken) {
      window.localStorage.removeItem("logged");
    }
  }, []);

  return (
    <>
      {menu.isSubVisible ? (
        <div
          className="bg-black opacity-30 min-w-full min-h-full fixed z-[9] top-0 left-0"
          onClick={() => dispatch(menuActions.toggleSubNav())}
        ></div>
      ) : (
        ""
      )}
      {/* sign in Modals */}
      {signModal.modalIsShown && signModal.loginModalStatus && <Login />}
      {signModal.modalIsShown && signModal.signUpModalStatus && <Signup />}

      <div className=" block top-0  mb-[5rem]">
        <Navbar userStatus={userStatus} setUserStatus={setUserStatus} />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/itemdetails/:id/:media_type" element={<ItemDetails />} />
        <Route path="/search" element={<Search />}></Route>
        <Route path="/userInfo" element={<UserInfo />}></Route>
      </Routes>
    </>
  );
}

export default App;
