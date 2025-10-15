"use client ";
import { StarIcon } from "../_icons/StarIcon";
import { RightIcon } from "../_icons/RightIcon";
import { useRouter } from "next/navigation";
export const SearchCom = (props) => {
  const { name, vote, date, img, movieId } = props;
  const router = useRouter();
  const handleMovieClick = () => {
    router.push(`/movie-detail/${movieId}`);
  };
  return (
    <div className="bg-white border  w-[577px] h-[130px] flex flex-row border-none p-4 max-sm:w-[430px]">
      <div>
        <div className="flex flex-row">
          <div className=" w-[67px] h-[100px] flex ml-4 max-sm:h-[90px]">
            <img src={`https://image.tmdb.org/t/p/original${img}`} />
          </div>
          <div className="flex flex-col ">
            <div className="flex flex-col ml-5 gap-1">
              <div className="flex items-center">
                <p className="font-normal text-xl ">{name}</p>
              </div>
              <div className="flex items-center ">
                <StarIcon />
                <p className="text-black"> {vote}/10</p>
              </div>
              <div className="flex justify-betwween gap-30 max-sm:gap-5 ">
                {date ? new Date(date).getFullYear() : "N/A"}

                <button
                  className="w-50 justify-end flex  items-center gap-1 "
                  onClick={handleMovieClick}
                >
                  See more
                  <span className="flex items-center ">
                    <RightIcon />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-140 h-0.5 bg-gray-300 mt-5 max-sm:w-95 absolute z-10"></div>
      </div>
    </div>
  );
};
