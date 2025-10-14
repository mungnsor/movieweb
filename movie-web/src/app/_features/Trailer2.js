"use client";
import { useState } from "react";
import { useEffect } from "react";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};
export const Trailer2 = ({ movieId }) => {
  const [Trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(false);
  const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;

  const getData = async () => {
    setLoading(true);
    const data = await fetch(url, options);
    const jsonData = await data.json();
    console.log(jsonData, "hegegege");

    setTrailers(jsonData.results);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [movieId]);
  if (loading) {
    return (
      <div className="flex flex-wrap gap-5 mt-5 justify-center ml-30 w-340">
        {Array.from({ length: 1 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-300 h-100 w-63 rounded-md mb-2"></div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="flex w-[1100px]  h-[458px] items-center gap-2  cursor-pointer border justify-center  z-10 border-none absolute ">
      <div className="w-[1100px] h-full bg-gray flex">
        <iframe
          width="1100"
          height="458"
          src={`https://www.youtube.com/embed/${Trailers[0]?.key}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};
