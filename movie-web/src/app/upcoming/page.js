"use client";
import { useEffect, useState } from "react";
import { Header } from "../_features/Header";
import { Footer } from "../_features/Footer";
import { MovieCard } from "../_components/MovieCard";
import { UpcomingMovieList } from "../_features/Upcoming";
import { BackButtonIcon } from "../_icons/BackButtonIcon";
import { NextButtonIcon } from "../_icons/NextButtonIcon";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};
export default function Home() {
  const [UpcomingMovies, setUpcomingMovieList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`;
  const getData = async () => {
    setLoading(true);
    const data = await fetch(url, options);
    const jsonData = await data.json();
    setUpcomingMovieList(jsonData.results);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, [page]);
  console.log(UpcomingMovieList);
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
  if (loading) {
    return (
      <div className="flex flex-wrap gap-5 mt-5 justify-center ml-30 w-340">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-300 h-100 w-63 rounded-md mb-2"></div>
            <div className="bg-gray-300 h-100 w-63 rounded"></div>
          </div>
        ))}
      </div>
    );
  }
  if (!loading && typeof UpcomingMovieList === undefined) {
    return <div>Something wrong</div>;
  }
  return (
    <div>
      <Header />
      <div className="sm:w-[1440px] m-auto">
        <div className="w-full flex justify-center mt-5 ">
          <div className="w-full flex text-black flex-col ">
            <div className="w-full flex justify-between">
              <div className="w-60 ml-2 text-2xl font-semibold ">Upcoming</div>
            </div>
            <div className="grid grid-cols-5 w-full mt-2 justify-around px-3  gap-3 max-sm:grid-cols-2   items-center">
              {UpcomingMovies.slice(0, 20).map((movie, index) => {
                return (
                  <MovieCard
                    key={index}
                    title={movie.title}
                    image={movie.backdrop_path}
                    vote={movie.vote_average}
                    movieId={movie.id}
                    imgSrc={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center mt-5 mb-5 ">
          <div className="w-full flex flex-row justify-between ">
            <div className="w-full flex-row flex items-center gap-2 justify-end">
              <BackButtonIcon />{" "}
              <span className="text-gray-300" onClick={handleBackButton}>
                Previous{" "}
              </span>
              {page > 1 && <button className="w-9 h-9 ">{page - 1} </button>}
              <button className="w-9 h-9  border border-gray-300 rounded-lg">
                {page}
              </button>
              <button className="w-9 h-9 ">{page + 1}</button>
              <button className="w-9 h-9 ">...</button>
              <button className="w-9 h-9  ">10</button>
              <p
                className="text-black items-center flex gap-2"
                onClick={handleNextButton}
              >
                {" "}
                Next <NextButtonIcon />
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
