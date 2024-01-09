import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
/* eslint-disable @next/next/no-img-element */
const DashboardLayouts = ({ children }) => {
  const { name, email, photo_url } = useSelector((state) => state.userSlice);
  return (
    <div className="drawer lg:drawer-open " data-theme="light">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {children}
        <label
          htmlFor="my-drawer-2"
          className="btn bg-green-400 drawer-button lg:hidden absolute top-0 left-0"
        >
          Open
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content relative">
          <li className="py-[20px]">
            {
              photo_url ? <img className="w-24 rounded-full mx-auto border-green-500" src={photo_url} alt="" />:<img
              className="w-16 border-2 border-green-500 rounded-full mx-auto"
              src='https://www.shutterstock.com/image-vector/human-icon-people-picture-profile-260nw-1011951676.jpg'
              alt="photo"
            />
            }
            <Link className="text-2xl mx-auto" href="/">{name || "User Name"}</Link>
          </li>
          
          <li>
            <Link className="text-xl bg-green-500 hover:bg-purple-500 hover:text-white " href='/dashboard/'>My Task</Link>
          </li>
          <Link className="absolute bottom-3 text-xl" href='/'>Back To Home</Link>
        </ul>
       
      </div>
    </div>
  );
};

export default DashboardLayouts;
