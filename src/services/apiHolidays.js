const BASE_URL = "https://calendarific.com/api/v2";
const KEY = "dcdeCXwL1HLGgHA5p8zLUN7sO57hgRWP";

export async function getHolidays({ country, year }) {
  const res = await fetch(
    `${BASE_URL}/holidays?api_key=${KEY}&country=${country}&year=${year}`
  );

  if (!res.ok)
    throw new Error("There was a problem fetching your leave request");

  const data = await res.json();

  return data;
}
