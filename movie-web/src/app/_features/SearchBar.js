"use client";

import { useEffect, useState } from "react";
import { DownIcon } from "../_icons/DownIcon";
import { SearchIcon } from "../_icons/SearchIcon";
import { SearchList } from "./SearchList";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const SearchBar = (props) => {
  const { value, setValues } = props;
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [openGenre, setOpenGenre] = useState(false);
  const handleSearch = (e) => {
    setValues(e.target.value);
    setOpenGenre(false);
  };
  const handleRemove = () => {
    setOpenSearchBar(null);
  };
  return (
    <div className="w-[450px] flex bg-[f0f0f0] min-sm:hidden">
      <div className="flex gap-2 w-[450px] justify-between ml-4 ">
        <div className="flex flex-row w-80 h-9 ">
          <div className="flex gap-3 w-full ">
            <button className="border-1 border-zinc-400 h-9 w-10 rounded-lg items-center flex justify-center cursor-pointer">
              <DownIcon />
            </button>
            <div className="flex items-center border-1 border-zinc-400 rounded-lg w-75 gap-3 ">
              <div>
                <SearchIcon />
              </div>
              <input
                className="w-30 h-full text-xs flex outline-0"
                placeholder="Search..."
                onChange={handleSearch}
                value={value}
                type="text"
              ></input>
            </div>
          </div>
          {value > 1 && <SearchList value={value} />}
        </div>
        <button
          className="w-9 h-9 rounded-full bg-[f0f0f0] border flex justify-center items-center border-gray-100 cursor-pointer "
          onClick={handleRemove}
        >
          x
        </button>
      </div>
    </div>
  );
};
