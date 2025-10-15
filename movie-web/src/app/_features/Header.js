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
    <>
      <div className="flex   w- h-18 justify-between p-4 relative ">
        {!openSearch && (
          <>
            <div className="flex  md:items-start  ">
              <div className="flex gap-3 justify-center items-center mt-1  sm:w-90 w-30 ">
                <Logo />
                <p className="text-sky-700 font-bold text-base ">MovieZ</p>
              </div>
            </div>
            <div className="flex flex-row gap-2 sm:w-[1300px]  justify-between w-[80px]  items-center">
              <div className="flex h-[36px] gap-3 ">
                <div className="sm:flex justify-center flex-col hidden">
                  <button
                    className="w-[97px] h-[36px] border-gray-400 flex items-center rounded-lg gap-1.5 cursor-pointer border justify-center "
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

                <div className="flex items-center border-1 border-gray-400 rounded-lg w-75 gap-3 max-sm:hidden ">
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
                <div className="flex  h-[330px]  gap-2  rounded-lg cursor-pointer border   z-10 border-none absolute top-1">
                  {value.length > 1 && <SearchList value={value} />}{" "}
                </div>
              </div>

              <div className="flex flex-row sm:items-end justify-center sm:hidden ">
                <button
                  className="border-gray-400 w-8 h-8 rounded-lg border flex justify-center items-center min-sm:hidden"
                  onClick={() => {
                    setOpenSearch(!openSearch);
                  }}
                >
                  <SearchIcon />
                </button>
                <div className="flex  h-[330px] items-center gap-2  rounded-lg cursor-pointer border justify-center  z-10 border-none absolute top-1">
                  {value.length > 1 && <SearchList value={value} />}{" "}
                </div>
              </div>

              <div className="  w-20 flex justify-center items-center">
                <button className="border-gray-400 w-8 h-8 rounded-lg border flex justify-center items-center">
                  <MoonIcon />
                </button>
              </div>
            </div>
          </>
        )}
        {openSearch && (
          <SearchBar
            value={value}
            setValues={setValues}
            setOpenSearch={setOpenSearch}
          />
        )}
      </div>
    </>
  );
};
