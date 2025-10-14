"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { RightIcon } from "../_icons/RightIcon";
import { MovieCard } from "../_components/MovieCard";
import { useParams } from "next/navigation";
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
export const MoreLikeList = () => {
  const [morelike, setMoreLike] = useState([]);
  const [loading, setLoading] = useState(false);

  const param = useParams();
  const { id } = param;
  const url = ` https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`;
  const getData = async () => {
    setLoading(true);
    const data = await fetch(url, options);
    const jsonData = await data.json();
    setMoreLike(jsonData.results);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, [id]);
  console.log(morelike);

  if (loading) {
    return (
      <div className="flex flex-wrap gap-2 mt-2 justify-center ml-30 w-340">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-300 h-100 w-63 rounded-md mb-2"></div>
            <div className="bg-gray-300 h-100 w-63 rounded"></div>
          </div>
        ))}
      </div>
    );
  }
  if (!loading && typeof morelike === undefined) {
    return <div>Something wrong</div>;
  }
  return (
    <div className="sm:w-[1440px] m-auto">
      <div className="w-full flex justify-center mt-5">
        <div className="w-full flex text-black flex-col">
          <div className="w-full flex justify-between">
            <div className="w-50 ml-2 text-2xl font-semibold">
              More like this
            </div>
            <Link href={`/morelike?id=${id}`}>
              <button className="w-50 justify-end flex  items-center gap-1 ">
                See more
                <span className="flex items-center ">
                  <RightIcon />
                </span>
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-5 w-full mt-2 justify-around gap-3 max-sm:grid-cols-2  items-center">
            {morelike.slice(0, 5).map((movie, index) => {
              return (
                <MovieCard
                  key={index}
                  title={movie.title}
                  vote={movie.vote_average}
                  image={movie.backdrop_path}
                  movieId={movie.id}
                  imgSrc={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
