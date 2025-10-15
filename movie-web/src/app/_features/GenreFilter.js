"use client";
import { useEffect, useState } from "react";
import { Genres } from "../_components/Genres";
const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const GenreList3 = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);
    const data = await fetch(url, options);
    const jsonData = await data.json();

    setGenres(jsonData.genres);

    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <div className="text-white">Loading</div>;
  }
  if (!loading && typeof genres === undefined) {
    return <div>Something wrong</div>;
  }
  return (
    <div className="w-[387px] h-[352px]  text-black rounded-lg border-none p-5 flex gap-5 flex-col max-sm:w-[375px] max-sm:h-[384px]">
      <div className="flex flex-col ml-3 w-54 h-15 gap-1">
        <p className="font-semibold tetx-2xl">Genres</p>{" "}
        <p className="font-base text-base w-55 h-15">
          See lists of movies by genre{" "}
        </p>{" "}
      </div>{" "}
      <div className="flex flex-wrap gap-3 w-[387px] h-[272px] max-sm:w-[335px] max-sm:h-[308px]">
        {genres.map((genre, index) => {
          return <Genres key={index} name={genre.name} genreId={genre.id} />;
        })}
      </div>{" "}
    </div>
  );
};
