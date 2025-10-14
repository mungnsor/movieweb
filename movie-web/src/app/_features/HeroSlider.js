"use client";

import { useEffect, useState } from "react";
import { HeroSliderPhoto } from "../_components/HeroSliderPhoto";
const apiLink =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};
export const HeroSlider = () => {
  const [upcomingMoviesData, setUpComingMoviesData] = useState([]);
  const [slideNumber, SetSlideNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  console.log("hahahahahaa");

  const handleNextSlide = () => {
    SetSlideNumber(slideNumber + 1);
  };
  const handleBackStep = () => {
    if (slideNumber === 0) {
      return;
    } else {
      SetSlideNumber(slideNumber - 1);
    }
  };

  const getData = async () => {
    setLoading(true);
    const data = await fetch(apiLink, options);
    const jsondata = await data.json();
    console.log("DADAA", jsondata);
    setUpComingMoviesData(jsondata.results);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="flex  w-full  mt-5 ">
        {Array.from({ length: 1 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-300 h-170 w-[1440px] ml-5 "></div>
          </div>
        ))}
      </div>
    );
  }
  console.log(upcomingMoviesData);
  console.log(slideNumber);

  return (
    <div>
      {upcomingMoviesData.length > 0 && (
        <HeroSliderPhoto
          key={slideNumber}
          img={upcomingMoviesData[slideNumber]?.backdrop_path}
          name={upcomingMoviesData[slideNumber]?.title}
          overview={upcomingMoviesData[slideNumber].overview}
          rate={Math.floor(upcomingMoviesData[slideNumber].vote_average)}
          movieId={upcomingMoviesData[slideNumber].id}
          handleNext={handleNextSlide}
          handleBack={handleBackStep}
        />
      )}
    </div>
  );
};
