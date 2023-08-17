import React, { useState, useRef, useEffect } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import Link from "next/link";

interface SideNavElementProps {
  elementHeader: string;
  element?: { name: string; href: string }[];
}

const SideNavElement: React.FunctionComponent<SideNavElementProps> = (
  props
) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

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
    <div className="group relative w-fit justify-center">
      <button
        onClick={toggleDropdown}
        className="dropdown-button relative flex h-20 w-44 items-center justify-center text-2xl font-semibold text-black
         hover:border-y-2 hover:border-violet-500 hover:text-violet-500"
      >
        {props.elementHeader}
        {showDropdown ? (
          <RiArrowUpSLine className="icon ml-1" />
        ) : (
          <RiArrowDownSLine className="icon ml-1" />
        )}
      </button>
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute z-10 w-44 flex-col items-center rounded-lg"
          style={{ backgroundColor: "rgba(196, 176, 255,1)" }}
        >
          {Array.isArray(props.element) && props.element.length > 0 ? (
            <div>
              {props.element.map((item, index) => (
                <Link
                  href={item.href}
                  className="text-stretch text-l block rounded px-3 py-2 text-gray-800 hover:bg-violet-400 hover:bg-opacity-30"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SideNavElement;
