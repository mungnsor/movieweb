"use client";
import { useState } from "react";
import { DownIcon } from "../_icons/DownIcon";
import { MoonIcon } from "../_icons/MoonIcon";
import { GenreList } from "./Genre";
import { Logo } from "../_icons/logo";
import { SearchList } from "./SearchList";
import { SearchIcon } from "../_icons/SearchIcon";
import { SearchBar } from "./SearchBar";
export const Header = () => {
  const [openGenre, setOpenGenre] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [value, setValues] = useState("");
  const handleSearch = (e) => {
    setValues(e.target.value);
    setOpenGenre(false);
  };
  return (
    <div className="flex   w-full h-18 justify-between p-4 relative ">
      <div className="flex gap-2  md:items-start  ">
        <Logo />
        <p className="text-sky-700 font-bold text-base ">MovieZ</p>
      </div>
      <div className="flex flex-row gap-2 ">
        <div className="flex h-[36px] ">
          <div className="flex justify-center flex-col ">
            <button
              className="w-[97px] h-[36px] border-gray-400 flex items-center rounded-lg gap-1.5 cursor-pointer border justify-center max-sm:hidden "
              onClick={() => {
                setOpenGenre(!openGenre);
              }}
            >
              <DownIcon /> Genre
            </button>
          </div>
          <div className="flex  h-[330px] items-center gap-2  rounded-lg cursor-pointer border justify-center top-20 z-10 border-none absolute">
            {" "}
            {openGenre && <GenreList />}
          </div>
          <div className="flex items-center border-1 border-zinc-400 rounded-lg w-75 gap-3 max-sm:hidden ">
            <div>
              <SearchIcon />
            </div>
            <input
              className="w-30 h-full text-xs flex outline-0 text-black"
              placeholder="Search..."
              onChange={handleSearch}
              value={value}
              type="text"
            ></input>
          </div>
        </div>
        <div className="flex flex-row md:items-end ">
          <button
            className="border-gray-400 w-8 h-8 rounded-lg border flex justify-center items-center min-sm:hidden"
            onClick={() => {
              setOpenSearch(!openSearch);
            }}
          >
            <SearchIcon />
          </button>
          {value.length > 1 && <SearchList value={value} />}
          {openSearch && <SearchBar />}
        </div>
        <div>
          <div className="w-9 h-9">
            <button className="border-gray-400 w-8 h-8 rounded-lg border flex justify-center items-center">
              <MoonIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
