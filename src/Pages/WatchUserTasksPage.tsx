import { useEffect, useState } from "react";
import {
  GetUserExecutingWorks,
  GetUserInProgressWork,
} from "../Api/Work/WorkApi";
import { Work } from "../Interfaces";
import WorkCard from "../Components/Work/CurrentWorkCard";
import WorkList from "../Components/Work/WorksList";
import { useParams } from "react-router-dom";

type PageParams = {
  username: string;
};

const WatchUserTasksPage = () => {
  const { username } = useParams<PageParams>();
  if (username === undefined) return <h1>USERNAME NÃO EXISTE</h1>;

  const [inProgressWork, setInProgressWork] = useState<Work>();
  const [listExecutingWorks, setListExecutingWorks] = useState<Work[]>();
  const [serverError, setServerError] = useState<string>("");

  const makeApiRequestInProgressWork = async () => {
    const result = await GetUserInProgressWork(username);

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
    const result = await GetUserExecutingWorks(username);

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
      <div className="d-flex justify-content-center align-items-center text-center">
        <h1 className="display-3 fw-bold">{username}</h1>
      </div>
      {serverError ? (
        <div className="alert alert-danger">{serverError}</div>
      ) : (
        <>
          {inProgressWork && (
            <WorkCard work={inProgressWork} watchMode={true} />
          )}
          {listExecutingWorks && (
            <WorkList works={listExecutingWorks} watchMode={true} />
          )}
        </>
      )}
    </>
  );
};

export default WatchUserTasksPage;
