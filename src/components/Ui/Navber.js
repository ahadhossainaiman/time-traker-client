import auth from "@/firebase/firebase.config";
import { logOut } from "@/redux/features/user/userSlice";
import { signOut } from "firebase/auth";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Navber = () => {
  const { name, email, photo_url } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    signOut(auth);
    dispatch(logOut());
  };

  return (
    <div className="navbar bg-[#66C5E1] ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {/* <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/products">Products</Link>
            </li> */}
            <li>
              <Link href="login">Login</Link>
            </li>
          </ul>
        </div>
        <Link href="/" className="btn w-52 btn-ghost text-xl">
          <img className="w-52 border-4 border-[#005975] rounded-full" src="https://i.ibb.co/bd5mw2Y/time-flies.gif" alt="" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {/* <li>
            <Link href="/">Home</Link>
          </li> */}
          {/* <li>
            <Link href="/products">Products</Link>
          </li> */}
        </ul>
      </div>
      <div className="navbar-end">
        {email ? (
          <>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-30 border-2 border-[#005975] rounded-full">
                  <img alt="Tailwind CSS Navbar component" src={photo_url} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-72"
              >
                <li>
                  <Link href="/dashboard" className="justify-between">
                    Dashboard
                    <span className="badge">{name}</span>
                  </Link>
                </li>

                <li>
                  <a onClick={handleLogOut}>Logout</a>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <div>
              <Link href="/login" className="btn">
                Login
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navber;
