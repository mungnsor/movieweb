"use client";
import { useEffect, useState } from "react";
import { MovieCard } from "../_components/MovieCard";
import { RightIcon } from "../_icons/RightIcon";
import Link from "next/link";
const url =
  " https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};
export const UpcomingMovieList = (props) => {
  const { count } = props;
  const [UpcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);
    const data = await fetch(url, options);
    const jsonData = await data.json();
    setUpcomingMovies(jsonData.results);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  console.log(UpcomingMovieList);
  if (loading) {
    return (
      <div className="flex flex-wrap gap-5 justify-center w-340 mt-5 ml-80">
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
    <div className="w-full flex justify-center mt-5 ">
      <div className="w-full flex text-black flex-col ">
        <div className="w-full flex justify-between">
          <div className="w-60 ml-2 text-2xl font-semibold ">Upcoming</div>
          <Link href={"/upcoming"}>
            <button className="w-50 justify-end flex  items-center gap-1">
              See more
              <span className="flex items-center ">
                <RightIcon />
              </span>
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-5 w-full mt-2 justify-around gap-3 max-sm:grid-cols-2  items-center">
          {UpcomingMovies.slice(0, count).map((movie, index) => {
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
  );
};
