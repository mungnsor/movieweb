"use client";
import { Footer } from "@/app/_features/Footer";
import { Header } from "@/app/_features/Header";
import { useEffect, useState } from "react";
import { StarIcon } from "@/app/_icons/StarIcon";
import { MoreLikeList2 } from "@/app/_features/MoreLike2";
import { ContinueIcon } from "@/app/_icons/ContinueIcon";
import { MoreLikeList } from "@/app/_features/MoreLike";
import { useParams } from "next/navigation";
import { Trailer2 } from "@/app/_features/Trailer2";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};
export default function MovieDetail() {
  const param = useParams();
  const { id } = param;
  const [movie, setMovie] = useState();
  const [actors, setActors] = useState();
  const [loading, setLoading] = useState(false);
  const [trailer, setTrailer] = useState(false);
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const url2 = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;

  const getData = async () => {
    setLoading(true);
    const data = await fetch(url, options);
    const jsonData = await data.json();
    setMovie(jsonData);
    setLoading(false);
  };
  const getData2 = async () => {
    const data = await fetch(url2, options);
    const jsonDta = await data.json();
    setActors(jsonDta);
  };
  useEffect(() => {
    getData();
    getData2();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-wrap gap-5 mt-5 justify-center ml-30 w-340">
        {Array.from({ length: 1 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="flex justify-between flex-row ml-20">
              <div className="bg-gray-300 h-[428px] w-[450px] rounded-md mb-2"></div>
              <div className="bg-gray-300 h-[428px] w-[760px] rounded-md mb-2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (!loading && typeof MoreLikeList2 === undefined) {
    return <div>Something wrong</div>;
  }
  const handleTrailerClick = () => {
    setTrailer(!trailer);
  };
  return (
    <div>
      <Header />
      <div className="w-full mt-5  flex justify-center max-sm:mt-2">
        <div className="w-360 flex justify-between h-18 max-sm:w-[430px] max-sm:h-23 ">
          <div className="w-340  h-[72px] flex flex-col justify-around ">
            <div className="font-bold text-4xl max-sm:text-xl max-sm:font-base">
              {movie?.title}
            </div>
            <div>
              {movie?.release_date} - PG - {movie?.runtime} min
            </div>
          </div>
          <div className="mr-10">
            <p>Rating</p>
            <div className="flex flex-row gap-2">
              <StarIcon />
              {movie?.vote_average}/10
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-5 flex justify-center">
        <div className="w-340 h-[428px]  flex  justify-around max-sm:flex-col max-sm:h-[211px]">
          <div className="w-[450px] h-[428px] border rounded-lg max-sm:w-[100px] max-sm:h-[148px] sm:flex hidden">
            <img
              className="w-full h-full  rounded-lg "
              src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
            />
          </div>
          <div className="w-[760px] h-[428px] border rounded-lg cursor-pointer relative flex object-cover max-sm:w-[450px] max-sm:h-[211px]">
            <img
              className="w-full h-full  rounded-lg absolute -z-1 "
              src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
            />
            <div className="flex items-end ml-4 gap-2 mb-4 ">
              <button
                className="rounded-full bg-white flex items-center mt-2 w-8 h-8 justify-center "
                onClick={handleTrailerClick}
              >
                <ContinueIcon />
              </button>
              <p onClick={handleTrailerClick} className="text-white text-base ">
                Play Trailer
              </p>
            </div>
          </div>
          {trailer && <Trailer2 movieId={id} />}
        </div>
      </div>
      <div className="w-full flex justify-center mt-5 max-sm:w-[375px] max-sm:h-[360px]">
        <div className="w-[450px] h-[428px] border rounded-lg max-sm:w-[100px] max-sm:h-[148px] sm:hidden ">
          <img
            className="w-full h-full  rounded-lg "
            src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
          />
        </div>
        <div className="sm:flex-col">
          <div className="flex flex-row gap-3 w-335 h-[20px] items-center ml-10 max-sm:flex-wrap max-sm:w-[200px] max-sm:h-[84px]">
            <button className="w-20 h-5 text-black font-semibold text-xs border border-gray-300 items-center rounded-lg ">
              Fairy Tale
            </button>
            <button className="w-20 h-5 text-black font-semibold text-xs border border-gray-300 items-center rounded-lg ">
              Pop Musical
            </button>
            <button className="w-20 h-5 text-black font-semibold text-xs border border-gray-300 items-center rounded-lg ">
              Fantasy
            </button>
            <button className="w-20 h-5 text-black font-semibold text-xs border border-gray-300 items-center rounded-lg ">
              Musical
            </button>
            <button className="w-20 h-5 text-black font-semibold text-xs border border-gray-300 items-center rounded-lg ">
              Romance
            </button>
          </div>
          <div className=" flex justify-center mt-3 w-full ">
            <div className="w-335 h-[58px] items-center ml-10 max-sm:w-[230px] ">
              {movie?.overview}
            </div>
          </div>
        </div>
      </div>
      {actors && (
        <div className="w-340 h-auto m-auto items-center max-sm:w-[430px] max-sm:h-[203px] ">
          <div className="mt-5 w-full">
            <div className="flex gap-5 h-[41px] ml-5 max-sm:w-full">
              <p className="text-base font-bold">Director</p>
              {actors?.cast?.slice(0, 1).map((item, index) => {
                return <span key={index}>{item.name}</span>;
              })}
            </div>
            <div className="h-0.5 w-330 bg-gray-300 ml-5 max-sm:w-full"></div>
            <div className="flex gap-5 h-[41px] ml-5">
              <p className="text-base font-bold">Writer</p>
              {actors?.cast?.slice(2, 4).map((item, index) => {
                return <span key={index}>{item.name}</span>;
              })}
            </div>
            <div className="h-0.5 w-330 bg-gray-300 ml-5 max-sm:w-full"></div>
            <div className="flex gap-5 ml-5 h-[42px] ">
              <p className="text-base font-bold">Stars</p>
              {actors?.cast?.slice(0, 3).map((item, index) => {
                return <span key={index}>{item.character}</span>;
              })}
            </div>
            <div className="h-0.5 w-330 bg-gray-300 ml-5 max-sm:w-full"></div>
          </div>
        </div>
      )}
      <MoreLikeList />
      <Footer />
    </div>
  );
}
