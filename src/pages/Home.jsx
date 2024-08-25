import { useNavigate, useSearchParams } from "react-router-dom";
import MainNav from "../ui/MainNav";
import { useGetHolidays } from "../features/employees/useGetHolidays";
import { useState } from "react";

function Home() {
  const [country, setCountry] = useState("");
  const [year, setYear] = useState("");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [toggleShowHolidays, setToggleShowHolidays] = useState(false);

  const { data, isLoading, isError, error } = useGetHolidays();

  function handleSubmit(e) {
    e.preventDefault();

    if (!country || !year) return;

    // console.log(country, year);

    searchParams.set("country", country);
    searchParams.set("year", year);
    setSearchParams(searchParams);
    setToggleShowHolidays(true);

    setCountry("");
    setYear("");
  }
  // console.log(data);

  return (
    <div>
      <div>
        <MainNav />
        <h1>LMS Home</h1>
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/signup")}>Sign up</button>
      </div>

      <h3 style={{ marginTop: "2rem" }}>
        Enter your details to get holidays for your country
      </h3>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter country code"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter year"
            value={year}
            onChange={(e) => setYear(+e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        <button onClick={() => setToggleShowHolidays((prev) => !prev)}>
          Collapse Holidays
        </button>
        {toggleShowHolidays && (
          <div>
            {isLoading && <p>Loading...</p>}
            {isError && <p>{error.message}</p>}
            <ul>
              {data?.response?.holidays?.map((holiday) => {
                const { name, description, type, date, primary_type } = holiday;
                return (
                  <li key={crypto.randomUUID()}>
                    <h4>Name: {name}</h4>
                    <p>Primary Type: {primary_type}</p>
                    <p>Description: {description}</p>
                    <p>{type.at(0)}</p>
                    <p>
                      Date: <strong>{date.iso}</strong>
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
