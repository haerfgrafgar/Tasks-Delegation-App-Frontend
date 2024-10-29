import { useEffect, useState } from "react";
import { GetExecutingWorks, GetInProgressWork } from "../Api/Work/WorkApi";
import { Work } from "../Interfaces";
import WorkCard from "../Components/Work/CurrentWorkCard";
import WorkList from "../Components/Work/WorksList";

const ExecTasksPage = () => {
  const [inProgressWork, setInProgressWork] = useState<Work>();
  const [listExecutingWorks, setListExecutingWorks] = useState<Work[]>();
  const [serverError, setServerError] = useState<string>("");

  const makeApiRequestInProgressWork = async () => {
    const result = await GetInProgressWork();

    if (result) {
      if (typeof result === "string") {
        setServerError(result);
      } else {
        setInProgressWork(result);
        setServerError("");
      }
    } else {
      setServerError("No answer from api.");
    }
  };

  const makeApiRequestListExecutingWorks = async () => {
    const result = await GetExecutingWorks();

    if (typeof result === "string") {
      setServerError(result);
      setListExecutingWorks([]);
    } else if (Array.isArray(result)) {
      setListExecutingWorks(result);
      setServerError("");
    }
  };

  useEffect(() => {
    makeApiRequestInProgressWork();
    makeApiRequestListExecutingWorks();
  }, []);

  return (
    <>
      {serverError ? (
        <div className="alert alert-danger">{serverError}</div>
      ) : (
        <>
          {inProgressWork && <WorkCard work={inProgressWork} />}
          {listExecutingWorks && <WorkList works={listExecutingWorks} />}
        </>
      )}
    </>
  );
};

export default ExecTasksPage;
