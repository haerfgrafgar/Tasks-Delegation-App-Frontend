import "../assets/css/Navbar.css";
import logo from "../assets/agitLogo.jpg";
import {
  FractionOfTime,
  HoursMinutesSeconds,
  userObj,
  Work,
} from "../Interfaces";
import { GetUserCurrentFraction } from "../Api/Fractions/FractionsApi";
import { useEffect, useState } from "react";
import {
  convertHoursMinutesSecondsToStringMinimalist,
  convertSeconds,
  getToken,
  sumHoursMinutesSeconds,
} from "../Helper";
import { GetInProgressWork } from "../Api/Work/WorkApi";
import { useAuth } from "../Context/useAuth";

function NavBar() {
  const { isLoggedIn, logout } = useAuth();
  var token = getToken();

  if (isLoggedIn()) {
    if (Date.now() > token!.exp * 1000) {
      logout();
    }
  } else {
    return;
  }

  const userObjString = localStorage.getItem("user");
  var userObj: userObj;
  userObj = JSON.parse(userObjString!); //Will exist for sure because this route is protected

  const [serverError, setServerError] = useState<string>("");
  const [allowElapsedTimeAdd, setAllowElapsedTimeAdd] =
    useState<boolean>(false);
  const [inProgressWork, setInProgressWork] = useState<Work>();
  const [workElapsedTime, setWorkElapsedTime] = useState<HoursMinutesSeconds>(
    convertSeconds(0)
  );

  useEffect(() => {
    if (inProgressWork) {
      setWorkElapsedTime(convertSeconds(inProgressWork!.secondsTaken));
      setAllowElapsedTimeAdd(true);
    }
  }, [inProgressWork]);

  useEffect(() => {
    addFractionToWorkElapsedTime();
  }, [allowElapsedTimeAdd]);

  useEffect(() => {
    makeApiRequestInProgressWork();
  }, []);

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

  const addFractionToWorkElapsedTime = async () => {
    const currentFraction: FractionOfTime | undefined =
      await GetUserCurrentFraction(userObj.userName);
    if (currentFraction) {
      if (typeof currentFraction.begin === "string") {
        currentFraction.begin = new Date(currentFraction.begin);
      }
      const fractionElapsedTime = convertSeconds(
        (Date.now() - currentFraction.begin.getTime()) / 1000
      );
      setWorkElapsedTime(
        sumHoursMinutesSeconds(workElapsedTime, fractionElapsedTime)
      );
    }
  };

  if (serverError) return serverError;

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white shadow p-0">
      <div className="container-fluid">
        <a className="navbar-brand p-0">
          <img
            src={logo}
            width="60"
            height="60"
            className="d-inline-block align-center"
            alt=""
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse
         navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-md-1">
            <li className="nav-item">
              <a className="nav-link" href="/">
                List
              </a>
            </li>
            {token?.role === "Projetista" && (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/validate">
                    Validate
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/coord">
                    Coord
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/create">
                    Create
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/users">
                    Users
                  </a>
                </li>
              </>
            )}

            <li className="nav-item">
              <a className="nav-link" href={`/calendar/${userObj.userName}`}>
                Calender
              </a>
            </li>
          </ul>
          <div className="d-flex align-items-center me-3">
            <h5
              className="me-2 mb-1"
              style={{ fontSize: "1.1rem", fontWeight: "bold" }}
            >
              {inProgressWork?.title}
            </h5>
            <span className="badge bg-secondary" style={{ fontSize: "0.9rem" }}>
              {convertHoursMinutesSecondsToStringMinimalist(workElapsedTime)}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
