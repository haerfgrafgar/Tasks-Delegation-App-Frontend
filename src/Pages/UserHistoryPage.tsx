import { useEffect, useState } from "react";
import { FractionOfTime } from "../Interfaces";
import { GetUserDayHistory } from "../Api/Fractions/FractionsApi";
import { useParams } from "react-router-dom";
import FractionsList from "../Components/Fraction/FractionsList";

type PageParams = {
  username: string;
};

const UserHistoryPage = () => {
  const { username } = useParams<PageParams>();
  if (username === undefined) return <h1>USERNAME NÃO EXISTE</h1>;

  const [listFractions, setListFractions] = useState<FractionOfTime[]>();
  const [serverError, setServerError] = useState<string>("");
  const [queryDay, setQueryDay] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<string>(
    queryDay.toISOString().split("T")[0]
  );

  const makeApiRequestListExecutingWorks = async () => {
    const result = await GetUserDayHistory(username, queryDay);

    if (typeof result === "string") {
      setServerError(result);
      setListFractions([]);
    } else if (Array.isArray(result)) {
      setListFractions(result);
      setServerError("");
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = event.target.value; // Convert to Date object
    setSelectedDate(dateValue); // Update state with Date object
    setQueryDay(new Date(dateValue)); // Log the Date object
  };

  useEffect(() => {
    makeApiRequestListExecutingWorks();
  }, []);

  useEffect(() => {
    makeApiRequestListExecutingWorks();
  }, [queryDay]);

  return (
    <>
      <div className="d-flex justify-content-center align-items-center text-center position-relative">
        <h1 className="display-3 fw-bold">{username}</h1>

        <input
          type="date"
          id="date-input"
          value={selectedDate}
          onChange={handleDateChange}
          className="position-absolute end-0 me-5" // Positions the input at the right end
          style={{ right: 0 }}
        />
      </div>

      {serverError ? (
        <div className="alert alert-danger">{serverError}</div>
      ) : (
        <>
          {listFractions && (
            <FractionsList fractions={listFractions}></FractionsList>
          )}
        </>
      )}
    </>
  );
};

export default UserHistoryPage;
