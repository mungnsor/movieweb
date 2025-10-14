"use client";
import { Header } from "./_features/Header";
import { UpcomingMovieList } from "./_features/Upcoming";
import { PopularMovieList } from "./_features/Popular";
import { TopRatedList } from "./_features/TopRated";
import { Footer } from "./_features/Footer";
import { HeroSlider } from "./_features/HeroSlider";
import { HeroSlider2 } from "./_features/HeroSlider2";
export default function Home() {
  return (
    <div className="sm:w-[1440px] m-auto">
      <Header />
      <HeroSlider />
      <HeroSlider2 />
      <UpcomingMovieList count={10} />
      <PopularMovieList count={10} />
      <TopRatedList count={10} />
      <Footer />
    </div>
  );
}
