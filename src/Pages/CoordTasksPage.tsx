import { useEffect, useState } from "react";
import { GetCoordenatingWorks } from "../Api/Work/WorkApi";
import { Work } from "../Interfaces";
import CoordenatingWorksList from "../Components/Work/CoordenatingWorksList";

const CoordTasksPage = () => {
  const [listExecutingWorks, setListExecutingWorks] = useState<Work[]>();
  const [serverError, setServerError] = useState<string>("");

  const makeApiRequestListExecutingWorks = async () => {
    var result = await GetCoordenatingWorks();

    if (typeof result === "string") {
      setServerError(result);
      setListExecutingWorks([]);
    } else if (Array.isArray(result)) {
      setListExecutingWorks(result);
      setServerError("");
    }
  };

  useEffect(() => {
    makeApiRequestListExecutingWorks();
  }, []);

  return (
    <>
      {serverError ? (
        <div className="alert alert-danger">{serverError}</div>
      ) : (
        <>
          {listExecutingWorks && (
            <CoordenatingWorksList works={listExecutingWorks} />
          )}
        </>
      )}
    </>
  );
};

export default CoordTasksPage;
