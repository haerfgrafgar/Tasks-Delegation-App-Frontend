import { useEffect, useState } from "react";
import { GetFinishedWorks } from "../Api/Work/WorkApi";
import { Work } from "../Interfaces";
import ToValidateWorksList from "../Components/Work/ToValidateWorksList";

const ValidateWorkPage = () => {
  const [listExecutingWorks, setListExecutingWorks] = useState<Work[]>();
  const [serverError, setServerError] = useState<string>("");

  const makeApiRequestListExecutingWorks = async () => {
    var result = await GetFinishedWorks();

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
            <ToValidateWorksList works={listExecutingWorks} />
          )}
        </>
      )}
    </>
  );
};

export default ValidateWorkPage;
