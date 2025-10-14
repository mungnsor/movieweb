import Link from "next/link";
import { NextButtonIcon } from "../_icons/NextButtonIcon";
export const Genres = (props) => {
  const { name, genreId } = props;

  return (
    <Link href={`/movieClick/${genreId}`}>
      <button className=" flex border border-gray-200 font-semibold  h-[20px] rounded-lg text-xs gap-3  flex-row ">
        {name}{" "}
        <span className="flex items-center">
          <NextButtonIcon />
        </span>
      </button>
    </Link>
  );
};
