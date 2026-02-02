// "use client";

// import { useParams } from "next/navigation";
// import { useState } from "react";
// import { MovieCard } from "@/app/_components/MovieCard";
// import { GenreList3 } from "@/app/_features/GenreFilter";
// import { Header } from "@/app/_features/Header";
// import { Footer } from "@/app/_features/Footer";
// import { useEffect } from "react";
// import { BackButtonIcon } from "@/app/_icons/BackButtonIcon";
// import { NextButtonIcon } from "@/app/_icons/NextButtonIcon";
// const options = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
//   },
// };
// export default function MovieClick() {
//   const [click, setClick] = useState([]);
//   const [MovieClick, setMovieClick] = useState([]);
//   const [page, setPage] = useState(1);
//   const param = useParams();
//   const { id } = param;
//   const url = ` https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${id}&page=${page}`;
//   const url2 = `https://api.themoviedb.org/3/genre/movie/list?language=en`;
//   const getData = async () => {
//     const data = await fetch(url, options);
//     const jsonData = await data.json();

//     setMovieClick(jsonData.results);
//   };
//   const getData2 = async () => {
//     const data = await fetch(url2, options);
//     const jsonData = await data.json();
//     setClick(jsonData.genres);
//   };
//   useEffect(() => {
//     getData();
//     getData2();
//   }, [id]);
//   useEffect(() => {
//     getData();
//     getData2();
//   }, [page]);

//   const handleNextButton = () => {
//     setPage(page + 1);
//   };
//   const handleBackButton = () => {
//     if (page === 1) {
//       return;
//     } else {
//       setPage(page - 1);
//     }
//   };
//   const GenreClick = click.filter((item) => item.id == id);

//   return (
//     <>
//       <Header />
//       <div>
//         <div className=" text-[30px] flex justify-center h-30 items-center max-sm:items-start max-sm:justify-start max-sm:h-15 max-sm:ml-5">
//           Search filter
//         </div>
//         <div className="w-[1440px] flex justify-between m-auto max-sm:flex-col max-sm:w-[430px]">
//           <div className="w-130 max-sm:w-100">
//             <GenreList3 />
//           </div>

//           <div className="border-l-1 w-300 max-sm:w-[430px]">
//             <div className="w-70 flex justify-center mt-3 max-sm:items-start max-sm:justify-start max-sm:ml-5">
//               {MovieClick.length} titles in "{GenreClick[0]?.name}"
//             </div>
//             <div className="grid grid-cols-5 w-full mt-2 justify-around px-3 gap-3 max-sm:grid-cols-2  items-center max-sm:w-[430px]">
//               {MovieClick.slice(0, 5).map((movie, index) => {
//                 return (
//                   <MovieCard
//                     key={index}
//                     title={movie.original_title}
//                     vote={movie.vote_average}
//                     movieId={movie.id}
//                     image={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
//                   />
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="w-full flex justify-center mt-5 mb-5 ">
//         <div className="w-full flex flex-row justify-between ">
//           <div className="w-full flex-row flex items-center gap-2 justify-end">
//             <BackButtonIcon />{" "}
//             <span className="text-gray-300" onClick={handleBackButton}>
//               Previous{" "}
//             </span>
//             {page > 1 && <button className="w-9 h-9 ">{page - 1} </button>}
//             <button className="w-9 h-9 border   border-gray-300 rounded-lg">
//               {page}
//             </button>
//             <button className="w-9 h-9 ">{page + 1}</button>
//             <button className="w-9 h-9 ">...</button>
//             <button className="w-9 h-9  ">5</button>
//             <p
//               className="text-black items-center flex gap-2"
//               onClick={handleNextButton}
//             >
//               {" "}
//               Next <NextButtonIcon />
//             </p>
//           </div>
//         </div>
//       </div>
//       <Footer />{" "}
//     </>
//   );
// }
"use client";

import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MovieCard } from "@/app/_components/MovieCard";
import { GenreList3 } from "@/app/_features/GenreFilter";
import { Header } from "@/app/_features/Header";
import { Footer } from "@/app/_features/Footer";
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

export default function MovieClick() {
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const param = useParams();
  const { id } = param;

  const url = `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${id}&page=${page}`;
  const url2 = `https://api.themoviedb.org/3/genre/movie/list?language=en`;

  const getData = useCallback(async () => {
    const res = await fetch(url, options);
    const jsonData = await res.json();
    setMovies(jsonData?.results ?? []);
  }, [url]);

  const getData2 = useCallback(async () => {
    const res = await fetch(url2, options);
    const jsonData = await res.json();
    setGenres(jsonData?.genres ?? []);
  }, [url2]);

  useEffect(() => {
    getData();
    getData2();
  }, [getData, getData2]);

  const handleNextButton = () => {
    setPage((p) => p + 1);
  };

  const handleBackButton = () => {
    setPage((p) => (p > 1 ? p - 1 : 1));
  };

  const genreName = useMemo(() => {
    const found = genres.find((g) => String(g.id) === String(id));
    return found?.name ?? "";
  }, [genres, id]);

  return (
    <>
      <Header />

      <div>
        <div className="text-[30px] flex justify-center h-30 items-center max-sm:items-start max-sm:justify-start max-sm:h-15 max-sm:ml-5">
          Search filter
        </div>

        <div className="w-[1440px] flex justify-between m-auto max-sm:flex-col max-sm:w-[430px]">
          <div className="w-130 max-sm:w-100">
            <GenreList3 />
          </div>

          <div className="border-l-1 w-300 max-sm:w-[430px]">
            <div className="w-70 flex justify-center mt-3 max-sm:items-start max-sm:justify-start max-sm:ml-5">
              {MovieClick.length} titles in &quot;{GenreClick[0]?.name}&quot;
            </div>

            <div className="grid grid-cols-5 w-full mt-2 justify-around px-3 gap-3 max-sm:grid-cols-2 items-center max-sm:w-[430px]">
              {movies.slice(0, 5).map((movie) => (
                <MovieCard
                  key={movie.id}
                  title={movie.original_title}
                  vote={movie.vote_average}
                  movieId={movie.id}
                  image={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center mt-5 mb-5">
        <div className="w-full flex flex-row justify-between">
          <div className="w-full flex-row flex items-center gap-2 justify-end">
            <BackButtonIcon />
            <span className="text-gray-300" onClick={handleBackButton}>
              Previous
            </span>

            {page > 1 && <button className="w-9 h-9">{page - 1}</button>}

            <button className="w-9 h-9 border border-gray-300 rounded-lg">
              {page}
            </button>

            <button className="w-9 h-9">{page + 1}</button>
            <button className="w-9 h-9">...</button>
            <button className="w-9 h-9">5</button>

            <p
              className="text-black items-center flex gap-2"
              onClick={handleNextButton}
            >
              Next <NextButtonIcon />
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
