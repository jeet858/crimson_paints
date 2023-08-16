import Link from "next/link";
import React, { useState, useEffect, useRef, MouseEvent } from "react";
import { RiArrowDownSLine } from "react-icons/ri";

const Navbar: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = (e: MouseEvent) => {
    const target = e.target as Node;

    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(target) &&
      !target.classList.contains("dropdown-button") &&
      !target.classList.contains("icon")
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", closeDropdown);
    return () => {
      window.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <nav className="mt-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="w-20"></div>
            <div className="hidden md:flex">
              <div className="group relative">
                <button
                  onClick={toggleDropdown}
                  className="dropdown-button relative flex items-center font-semibold text-black hover:text-violet-500"
                >
                  Order
                  <RiArrowDownSLine className="icon ml-1" />
                </button>
                {showDropdown && (
                  <div
                    ref={dropdownRef}
                    className="absolute w-40 flex-col items-center rounded-lg"
                    style={{ backgroundColor: "rgba(196, 176, 255,0.12)" }}
                  >
                    <Link
                      href="/Salesman"
                      className="text-stretch block rounded px-3 py-2 text-sm text-gray-800 hover:bg-violet-400 hover:bg-opacity-30"
                    >
                      By Salesman
                    </Link>
                    <Link
                      href="/Client"
                      className="text-stretch block rounded px-3 py-2 text-sm text-gray-800 hover:bg-violet-400 hover:bg-opacity-30"
                    >
                      By Client
                    </Link>
                    <Link
                      href="/Ordernumber"
                      className="text-stretch block rounded px-3 py-2 text-sm text-gray-800 hover:bg-violet-400 hover:bg-opacity-30"
                    >
                      By Order Number
                    </Link>
                    <Link
                      href="#"
                      className="text-stretch block rounded px-3 py-2 text-sm text-gray-800 hover:bg-violet-400 hover:bg-opacity-30"
                    >
                      My Order
                    </Link>
                    <Link
                      href="#"
                      className="text-stretch block rounded px-3 py-2 text-sm text-gray-800 hover:bg-violet-400 hover:bg-opacity-30"
                    >
                      My Order (Mobile)
                    </Link>
                    <Link
                      href="#"
                      className="text-stretch block rounded px-3 py-2 text-sm text-gray-800 hover:bg-violet-400 hover:bg-opacity-30"
                    >
                      My Order (Web)
                    </Link>
                  </div>
                )}
              </div>
              <div className="w-16"></div>
              <a
                href="#"
                className="relative flex items-center font-semibold text-black hover:text-violet-500"
              >
                Stock <RiArrowDownSLine className="icon ml-1" />
              </a>
              <div className="w-16"></div>
              <a
                href="#"
                className="relative flex items-center font-semibold text-black hover:text-violet-500"
              >
                Reports <RiArrowDownSLine className="icon ml-1" />
              </a>
              <div className="w-16"></div>
              <a
                href="#"
                className="relative flex items-center font-semibold text-black hover:text-violet-500"
              >
                Upload <RiArrowDownSLine className="icon ml-1" />
              </a>
              <div className="w-16"></div>
              <a
                href="#"
                className="relative flex items-center font-semibold text-black hover:text-violet-500"
              >
                Master <RiArrowDownSLine className="icon ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
