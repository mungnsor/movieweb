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
        <div className="w-146 text-[30px] flex h-30 items-center justify-center ml-50">
          Search results
        </div>
        <div className="w-[1140px] flex justify-between m-auto">
          <div className="border-r-1 w-300">
            <div className="w-180  flex justify-center mt-3">
              {MoviesData.length == 0 && (
                <div className="w-[970px] h-[95px] border border-gray-300 flex items-center justify-center">
                  not results found{" "}
                </div>
              )}
            </div>
            {MoviesData.length > 0 && (
              <div>
                <div>
                  {MoviesData.length} results for "{value}"{" "}
                </div>
                <div className="flex flex-wrap w-230 mt-4 gap-3 justify-center items-center">
                  {MoviesData.slice(0, 6).map((movie, index) => {
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
          <div className="w-80">
            <GenreList2 />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center mt-5 mb-5 ">
        <div className="w-340 flex flex-row justify-between ">
          <div className="w-340 flex-row flex items-center gap-2 justify-center ">
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
