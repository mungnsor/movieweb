import { useState } from "react";
import { BackButtonIcon } from "../_icons/BackButtonIcon";
import { ContinueIcon } from "../_icons/ContinueIcon";
import { NextButtonIcon } from "../_icons/NextButtonIcon";
import { StarIcon } from "../_icons/StarIcon";
import { Trailer } from "../_features/Trailer";
import { useEffect } from "react";
import { DownIcons } from "../_icons/DownIcons";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};
export const HeroSliderPhoto2 = (props) => {
  const { img, name, rate, handleNext, handleBack, overview, movieId } = props;
  console.log("this is props", props);
  const [trailers, setTrailers] = useState();
  const [movie, setMovie] = useState();
  const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
  const getData = async () => {
    const data = await fetch(url, options);
    const jsonDta = await data.json();
    setMovie(jsonDta);
  };
  useEffect(() => {
    getData();
  }, [movieId]);
  const handleTrailerClick = () => {
    setTrailers(!trailers);
  };
  return (
    <div className="min-sm:hidden">
      <div className=" w-full  m-auto h-[450px] flex flex-col gap-5  items-center">
        <img
          className=" w-[430px] h-[246px] "
          src={`https://image.tmdb.org/t/p/original${img}`}
        ></img>

        <div className="flex flex-col justify-center gap-2.5   text-black ">
          <div className="flex justify-between">
            <div className="w-55 flex flex-col">
              <span>Now Playing: </span>
              <span>{name}</span>
            </div>
            <div className="flex flex-row">
              <StarIcon />
              <p className="text-black"> {rate}/10</p>
            </div>
          </div>
          <div className="w-100 text-black">{overview}</div>
          <button
            className="w-40 light: bg-black rounded-sm h-8 items-center justify-center flex gap-2 mt-4"
            onClick={handleTrailerClick}
          >
            <DownIcons />
            <p className=" text-white">Watch Trailer</p>
          </button>
        </div>
        {trailers && <Trailer movieId={movieId} />}
      </div>
    </div>
  );
};
