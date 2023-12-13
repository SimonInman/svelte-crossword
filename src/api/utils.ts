import type { SetCell } from "./types.svelte";

const BASE_URL = "https://csolve.fly.dev";

export const setCell = async (
  source: string,
  id: string,
  group: string,
  setCell: SetCell,
) => {
  const extension = `/solve/${source}/${id}/${group}/set_cell`;
  const options = {
    method: "POST",
    body: JSON.stringify(setCell),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const fullURL = `${BASE_URL}${extension}`;
  let response = await fetch(fullURL, options);
  return response.json();
};
