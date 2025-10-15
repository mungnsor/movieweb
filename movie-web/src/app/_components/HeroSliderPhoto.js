import { useState } from "react";
import { BackButtonIcon } from "../_icons/BackButtonIcon";
import { ContinueIcon } from "../_icons/ContinueIcon";
import { NextButtonIcon } from "../_icons/NextButtonIcon";
import { StarIcon } from "../_icons/StarIcon";
import { Trailer } from "../_features/Trailer";
import { useEffect } from "react";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};
export const HeroSliderPhoto = (props) => {
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
    <div className=" w-full  m-auto h-170 flex relative object-cover max-sm:hidden  ">
      <img
        className=" absolute -z-1 h-full w-full max:sm:w-[375px] max:sm:h-[246px]"
        src={`https://image.tmdb.org/t/p/original${img}`}
      ></img>
      <div className="flex items-center justify-between">
        <div className="flex items-center ">
          <div className="w-35 justify-end h-20 flex pr-8">
            <button
              onClick={handleBack}
              className="bg-[#f4f4f5] h-9 w-9 flex items-center justify-center rounded-full  "
            >
              {" "}
              <BackButtonIcon />
            </button>
          </div>
          <div className="flex flex-col justify-center pl-10 w-280 text-white max-sm:hidden">
            <div className="w-36">
              <span>Now Playing: </span>
              <span>{name}</span>
            </div>
            <div className="flex items-center">
              <StarIcon />
              <p className="text-gray-200"> {rate}/10</p>
            </div>
            <div className="w-100 text-white">{overview}</div>
            <button
              className="w-40 light: bg-white rounded-sm h-8 items-center justify-center flex gap-2 mt-4"
              onClick={handleTrailerClick}
            >
              <ContinueIcon />
              <p className=" text-black">Watch Trailer</p>
            </button>
          </div>
          {trailers && <Trailer movieId={movieId} />}
          <div className="w-60 h-20 flex justify-end pr-8">
            <button
              onClick={handleNext}
              className=" light: bg-[#f4f4f5] h-9 w-9 flex items-center
            justify-center rounded-full "
            >
              <NextButtonIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
