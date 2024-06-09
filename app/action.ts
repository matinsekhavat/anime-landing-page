"use server";
export async function fetchAnime(page: number) {
  const res = await fetch(
    `https://shikimori.one/api/animes/?page=${page}&limit=8&order=popularity`
  );
  const data = await res.json();
  return data;
}
