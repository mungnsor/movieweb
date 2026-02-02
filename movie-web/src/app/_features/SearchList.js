// "use client ";
// import { useState } from "react";
// import { SearchCom } from "../_components/SearchCom";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Search } from "../_components/SearchAll";
// const options = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
//   },
// };
// export const SearchList = (props) => {
//   const { value } = props;
//   const [searches, setSearches] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const url = `https://api.themoviedb.org/3/search/movie?query=${value}&language=en-US&page=1`;
//   const getData = async () => {
//     setLoading(true);
//     const data = await fetch(url, options);
//     const jsonData = await data.json();
//     setSearches(jsonData.results);
//     console.log("this is searchlist", jsonData.results);
//     setLoading(false);
//   };

//   useEffect(() => {
//     getData();
//   }, [value]);

//   if (loading) {
//     return <div className="text-white ">loading</div>;
//   }
//   if (!loading && typeof searches === undefined) {
//     return <div>Something wrong</div>;
//   }
//   const handleSee = () => {
//     router.push(`/search-filter/${value}`);
//   };
//   return (
//     <div className="flex absolute z-10 bg-white top-20 ">
//       {value.length > 1 && (
//         <div className="flex  justify-center   flex-wrap w-[577px] h-[729px] max-sm:w-[400px]">
//           {searches.slice(0, 5).map((movie, index) => {
//             return (
//               <SearchCom
//                 key={index}
//                 name={movie.original_title}
//                 vote={movie.vote_average}
//                 date={movie.release_date}
//                 img={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
//                 movieId={movie.id}
//               />
//             );
//           })}
//         </div>
//       )}
//       <div className="absolute z-10 flex " onClick={handleSee}>
//         <div className="bg-white w-[577px] h-[10px] p-4 max-sm:w-[400px]">
//           <p className="flex justify-end text-black font-medium text-sm ">
//             See all results for "{value}"
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };
"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchCom } from "../_components/SearchCom";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const SearchList = (props) => {
  const { value } = props;
  const [searches, setSearches] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
    value,
  )}&language=en-US&page=1`;

  const getData = useCallback(async () => {
    if (!value || value.length < 2) {
      setSearches([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(url, options);
      const jsonData = await res.json();
      setSearches(jsonData?.results ?? []);
    } catch (e) {
      setSearches([]);
    } finally {
      setLoading(false);
    }
  }, [url, value]);

  useEffect(() => {
    getData();
  }, [getData]);

  if (loading) {
    return <div className="text-white">loading</div>;
  }

  // searches үргэлж array байх ёстой. (fallback)
  if (!Array.isArray(searches)) {
    return <div className="text-white">Something wrong</div>;
  }

  const handleSee = () => {
    router.push(`/search-filter/${value}`);
  };

  return (
    <div className="flex absolute z-10 bg-white top-20">
      {value.length > 1 && (
        <div className="flex justify-center flex-wrap w-[577px] h-[729px] max-sm:w-[400px]">
          {searches.slice(0, 5).map((movie) => (
            <SearchCom
              key={movie.id}
              name={movie.original_title}
              vote={movie.vote_average}
              date={movie.release_date}
              img={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              movieId={movie.id}
            />
          ))}
        </div>
      )}

      <div className="absolute z-10 flex" onClick={handleSee}>
        <div className="bg-white w-[577px] h-[10px] p-4 max-sm:w-[400px]">
          <p className="flex justify-end text-black font-medium text-sm">
            See all results for &quot;{value}&quot;
          </p>
        </div>
      </div>
    </div>
  );
};
