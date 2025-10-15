"use client";
import { Header } from "@/app/_features/Header";
import { Footer } from "@/app/_features/Footer";
import { MovieCard } from "@/app/_components/MovieCard";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { GenreList2 } from "@/app/_features/GenreSearch";
import { BackButtonIcon } from "@/app/_icons/BackButtonIcon";
import { NextButtonIcon } from "@/app/_icons/NextButtonIcon";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};
export default function SearchALL() {
  const param = useParams();
  const { value } = param;
  const [MoviesData, setMoviesData] = useState([]);
  const [page, setPage] = useState(1);
  const url = `https://api.themoviedb.org/3/search/movie?query=${value}&language=en-US&page=${page}`;

  const getData = async () => {
    const data = await fetch(url, options);
    const jsonData = await data.json();

    setMoviesData(jsonData.results);
  };

  useEffect(() => {
    getData();
  }, [value]);
  useEffect(() => {
    getData();
  }, [page]);
  const handleNextButton = () => {
    setPage(page + 1);
  };
  const handleBackButton = () => {
    if (page === 1) {
      return;
    } else {
      setPage(page - 1);
    }
  };
  return (
    <>
      <Header />
      <div>
        <div className=" text-[30px] flex h-30 items-center justify-center ml-50 max-sm:items-start max-sm:justify-start max-sm:h-15 max-sm:ml-5">
          Search results
        </div>
        <div className="w-[1140px] flex justify-between m-auto max-sm:flex-col max-sm:w-[430px]">
          <div className=" border-r-1 w-300 max-sm:w-[430px]">
            <div className=" flex justify-center mt-3 max-sm:items-start max-sm:justify-start max-sm:ml-5">
              {MoviesData.length == 0 && (
                <div className="w-[970px] h-[95px] border border-gray-300 flex items-center justify-center max-sm:w-[430px]">
                  not results found{" "}
                </div>
              )}
            </div>
            {MoviesData.length > 0 && (
              <div>
                <div className="max-sm:items-start max-sm:justify-start max-sm:ml-5">
                  {MoviesData.length} results for "{value}"
                </div>
                <div className="grid grid-cols-5 w-full mt-2 justify-around px-3 gap-3 max-sm:grid-cols-2   items-center  max-sm:w-[430px]">
                  {MoviesData.slice(0, 8).map((movie, index) => {
                    return (
                      <MovieCard
                        key={index}
                        title={movie.original_title}
                        vote={movie.vote_average}
                        movieId={movie.id}
                        image={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <div className="w-80 max-sm:60">
            <GenreList2 />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center mt-5 mb-5 ">
        <div className="w-full flex flex-row justify-between ">
          <div className="w-full flex-row flex items-center gap-2 justify-center ">
            <BackButtonIcon />{" "}
            <span className="text-gray-300" onClick={handleBackButton}>
              Previous{" "}
            </span>
            {page > 1 && <button className="w-9 h-9 ">{page - 1} </button>}
            <button className="w-9 h-9  border border-gray-300 rounded-lg">
              {page}
            </button>
            <p
              className="text-gray-300 items-center flex gap-2"
              onClick={handleNextButton}
            >
              {" "}
              Next <NextButtonIcon />
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
