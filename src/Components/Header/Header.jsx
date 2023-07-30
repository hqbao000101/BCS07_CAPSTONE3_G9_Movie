import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Dropdown } from "antd";

const items = [
  {
    key: "1",
    label: (
      <NavLink
        className="block p-2 pl-3 rounded-md hover:bg-blue-500"
        to="/info"
      >
        <i className="mr-2 fa-regular fa-id-badge hover:text-white"></i>
        My Info
      </NavLink>
    ),
  },
  {
    key: "2",
    label: (
      <NavLink
        className="block p-2 pl-3 rounded-md hover:bg-blue-500"
        to="/setting"
      >
        <i className="mr-2 fa-solid fa-gears"></i>
        Settings
      </NavLink>
    ),
  },
  {
    key: "3",
    label: (
      <div
        className="p-2 pl-3 duration-500 rounded-md hover:bg-blue-500"
        onClick={() => {
          localStorage.removeItem("user");
          window.location.reload();
        }}
      >
        <i className="mr-2 fa-solid fa-arrow-right-from-bracket"></i>
        Log out
      </div>
    ),
  },
];

const Header = () => {
  // ! ở đây có thể hiểu useSelector giúp truy cập tới initialState của Slice user nên có thể dùng bóc tách phần tử để bóc tách ra thuộc tính hoTen
  const { hoTen } = useSelector((state) => state.user.userData);
  // console.log(hoTen);

  // const [messageApi, contextHolder] = message.useMessage();
  // useEffect(() => {
  //   messageApi.success("Login successfully");
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [hoTen]);

  return (
    <nav className="top-0 left-0 z-20 w-full bg-white border-b border-gray-200 border-none shadow-md dark:bg-gray-900 shadow-stone-500/50">
      {/* {hoTen ? contextHolder : ""} */}
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
        <NavLink to="/" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Cyber Movie
          </span>
        </NavLink>
        {hoTen ? (
          <div className="flex md:order-2">
            <Dropdown
              menu={{
                items,
              }}
              placement="bottomLeft"
            >
              <div className="p-2 text-white cursor-pointer">
                <i className="mr-2 fa-regular fa-circle-user"></i>
                {hoTen}
              </div>
            </Dropdown>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
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
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex md:order-2">
            <NavLink to="/login">
              <button
                type="button"
                className="px-4 py-2 mr-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <i className="mr-2 fa-regular fa-circle-user"></i>
                Login
              </button>
            </NavLink>
            <NavLink to="/register">
              <button
                type="button"
                className="px-4 py-2 ml-3 mr-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <i className="mr-2 fa-solid fa-user-pen"></i>
                Register
              </button>
            </NavLink>

            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
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
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        )}
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg md:p-0 bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink
                to="/"
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page"
              >
                Lịch chiếu
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Cụm rạp
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Tin tức
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Ứng dụng
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
