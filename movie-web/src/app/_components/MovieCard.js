import { LittleStar } from "../_icons/LittleStar";
import { useRouter } from "next/navigation";
export const MovieCard = (props) => {
  const { imgSrc, vote, title, movieId, image } = props;
  const router = useRouter();
  console.log("this is movie id", movieId);
  const handleMovieClick = () => {
    router.push(`/movie-detail/${movieId}`);
  };
  return (
    <div
      className="w-[100%] h-100 bg-secondary rounded-lg cursor-pointer  max-sm:h-74"
      onClick={handleMovieClick}
    >
      <img
        className="w-full h-[80%] object-cover hover:opacity-30 rounded-lg "
        src={`https://image.tmdb.org/t/p/original${image}`}
      />
      <div>
        <div className="flex items-center gap-2">
          <LittleStar className="sm:size-4.5 size-4" />
          <p>
            <span className="text-ms sm:text-[15px] ">{vote}</span>
            <span className="text-sm text-muted-foreground sm:text-[13px]">
              /10
            </span>
          </p>
        </div>
        <p className="flex text-[15px] sm:text-sm ">{title}</p>
      </div>
    </div>
  );
};
