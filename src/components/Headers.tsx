import { useCallback, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import SeasideVacationLogo from "../assets/seasidebeachvacationslogo.png";
import { GetData } from "../lib/getSinglePageContent";

import { cn } from "../utils/cn";

interface DataItem {
  title: string;
  slug: string;
}

export default function Headers() {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [data, setData] = useState<DataItem[]>([]);
  const [scrolly, setScrolly] = useState<number>(0);

  const fetchData = useCallback(async () => {
    try {
      const data = await GetData();
      setData(
        data.map((item: { title: string; slug: string }) => ({
          title: item.title,
          slug: item.slug,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleScroll = useCallback(() => {
    setScrolly(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <nav
      className={cn("z-50 bg-white w-full", {
        "fixed top-0 left-0 right-0 transition-all duration-300 ": true,
        "shadow-md": scrolly > 0,
        "shadow-none": scrolly <= 0,
        "py-2": scrolly > 0, // Add padding when scrolled
        "py-4": scrolly <= 0, // Larger padding when at the top
      })}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        <Link to="/">
          <img src={SeasideVacationLogo} className="w-20" alt="logo" />
        </Link>

        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          onClick={() => setOpenMenu(!openMenu)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-dropdown"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          className={cn("hidden w-full md:block md:w-auto", {
            "block absolute top-16 left-0 px-8 md:block md:static": openMenu,
          })}
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent shadow-xl md:shadow-none">
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 hover:text-blue-700 md:p-0"
                    : "block py-2 px-3 text-black bg-transparent rounded-sm md:bg-transparent  md:p-0 hover:text-blue-700"
                }
              >
                Home
              </NavLink>
            </li>
            <li className="group relative">
              <button
                onClick={() => setShowDropDown(!showDropDown)}
                id="dropdownNavbarLink"
                className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto "
              >
                House
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {/* <!-- Dropdown menu --> */}
              <div
                className={cn(
                  "z-10 hidden md:group-hover:block md:group-hover:absolute left-0 top-5 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-md w-44 ",
                  {
                    "block w-full": showDropDown,
                  }
                )}
              >
                <ul className="py-2 text-sm text-gray-700 ">
                  {data.map((item, index) => (
                    <li key={index}>
                      <Link
                        to={"/" + item.slug}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li>
              <Link
                to="#"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                How To Book
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
