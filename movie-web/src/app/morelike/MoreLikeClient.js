"use client";

import { useSearchParams } from "next/navigation";

export default function MoreLikeClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return <div>More like movie {id}</div>;
}
