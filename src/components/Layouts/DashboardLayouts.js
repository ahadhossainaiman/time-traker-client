import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

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
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <li className="py-[20px]">
            <Link href="/">{name || "User Name"}</Link>
          </li>
          <li>
            <a>All Task</a>
          </li>
          <li>
            <a>My Task</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayouts;
