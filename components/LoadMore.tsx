"use client";
import { fetchAnime } from "@/app/action";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import AnimeCard, { AnimeProp } from "./AnimeCard";

const PAGE = 2;

function LoadMore() {
  const { ref, inView } = useInView();
  const [animes, setAnimes] = useState<AnimeProp[]>([]);
  const [pageIndex, setPageIndex] = useState(PAGE);
  useEffect(() => {
    if (inView) {
      fetchAnime(pageIndex)
        .then((res) => {
          setAnimes((prevAnimes) => [...prevAnimes, ...res]);
          setPageIndex((prevPageIndex) => prevPageIndex + 1);
        })
        .catch((error) => {
          console.error(error);
        });
      console.log(animes);
    }
  }, [inView]);

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {animes.map((item: AnimeProp, index: number) => (
          <AnimeCard key={item.id} anime={item} index={index} />
        ))}
      </section>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
