import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white shadow dark:bg-gray-900">
      <div className="w-full max-w-screen-xl p-4 mx-auto md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <NavLink
            href="https://flowbite.com/"
            className="flex items-center mb-4 sm:mb-0"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8 mr-3"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Cyber Movie
            </span>
          </NavLink>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <NavLink href="/" className="mr-4 hover:underline md:mr-6 ">
                About
              </NavLink>
            </li>
            <li>
              <NavLink href="/" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </NavLink>
            </li>
            <li>
              <NavLink href="/" className="mr-4 hover:underline md:mr-6 ">
                Licensing
              </NavLink>
            </li>
            <li>
              <NavLink href="/" className="hover:underline">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <NavLink href="https://flowbite.com/" className="hover:underline">
            Flowbite™
          </NavLink>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
