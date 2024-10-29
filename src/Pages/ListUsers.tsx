import { useEffect, useState } from "react";
import { GetAllUsersGeneralSituation } from "../Api/User.tsx/UserApi";
import { GeneralSituationResponseDto } from "../Interfaces";
import UserCard from "../Components/User/UserCard";

const ListUsers = () => {
  const [usersList, setUsersList] = useState<GeneralSituationResponseDto[]>([]);
  const [serverError, setServerError] = useState<string>("");

  const makeApiRequestUsersList = async () => {
    const result = await GetAllUsersGeneralSituation();

    if (typeof result === "string") {
      setServerError(result);
      setUsersList([]);
    } else if (Array.isArray(result)) {
      setUsersList(result);
      setServerError("");
    }
  };

  useEffect(() => {
    makeApiRequestUsersList();
  }, []);

  return (
    <>
      {serverError ? (
        <div className="alert alert-danger">{serverError}</div>
      ) : (
        <>
          <div
            className="row mt-2"
            style={{ "--bs-gutter-x": "0" } as React.CSSProperties}
          >
            {usersList.map((user) => (
              <div className="col-md-4 mb-4" key={user.username}>
                <div className="ps-1 pe-1">
                  <UserCard user={user}></UserCard>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default ListUsers;
