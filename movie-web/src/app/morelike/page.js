// "use client";
// import { Header } from "../_features/Header";
// import { Footer } from "../_features/Footer";
// import { useSearchParams } from "next/navigation";
// import { BackButtonIcon } from "../_icons/BackButtonIcon";
// import { NextButtonIcon } from "../_icons/NextButtonIcon";
// import { MoreLikeList2 } from "../_features/MoreLike2";

// export default function Home() {
//   const searchParam = useSearchParams();
//   const id = searchParam.get("id");
//   return (
//     <>
//       <Header />
//       <MoreLikeList2 id={id} />
//       <Footer />
//     </>
//   );
// }
import { Suspense } from "react";
import MoreLikeClient from "./MoreLikeClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white p-4">Loading...</div>}>
      <MoreLikeClient />
    </Suspense>
  );
}
