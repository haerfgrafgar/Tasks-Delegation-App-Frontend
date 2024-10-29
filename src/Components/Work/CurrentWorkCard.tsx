import React, { useEffect, useState } from "react";
import {
  FractionOfTime,
  HoursMinutesSeconds,
  Work,
  userObj,
} from "../../Interfaces";
import {
  //addOneSecond,
  convertSeconds,
  getPriorityColor,
  sumHoursMinutesSeconds,
} from "../../Helper";
import {
  GetUserCurrentFraction,
  StopFraction,
} from "../../Api/Fractions/FractionsApi";
import { FinalizarWork } from "../../Api/Work/WorkApi";
// const [isWorkElapsedTimeComputed, setIsWorkElapsedTimeComputed] =
//   useState<boolean>(false);
// const [runningWorkElapsedTime, setRunningWorkElapsedTime] =
//   useState<HoursMinutesSeconds>(convertSeconds(work.secondsTaken));

// useEffect(() => {
//   setIsWorkElapsedTimeComputed(true);
// }, [workElapsedTime]);

// useEffect(() => {
//   setRunningWorkElapsedTime(workElapsedTime);
//   const intervalId = setInterval(() => {
//     setRunningWorkElapsedTime(addOneSecond(runningWorkElapsedTime));
//     console.log(runningWorkElapsedTime);
//   }, 1000);

//   return () => clearInterval(intervalId);
// }, [isWorkElapsedTimeComputed]);
interface WorkCardProps {
  work: Work;
  watchMode?: boolean;
}

const WorkCard: React.FC<WorkCardProps> = ({ work, watchMode }) => {
  const cardColor: string = getPriorityColor(work.priority);
  const [workElapsedTime, setWorkElapsedTime] = useState<HoursMinutesSeconds>(
    convertSeconds(work.secondsTaken)
  );

  const userObjString = localStorage.getItem("user");
  var userObj: userObj;
  userObj = JSON.parse(userObjString!); //Will exist for sure because this route is protected

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

  useEffect(() => {
    addFractionToWorkElapsedTime();
  }, []);

  async function handlePausarClick() {
    await StopFraction();
    window.location.reload();
  }

  async function handleFinalizarClick() {
    await FinalizarWork(work.id);
    window.location.reload();
  }

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="card my-3 shadow-lg">
            <div
              className="card-header d-flex justify-content-between align-items-center"
              style={{ backgroundColor: cardColor }}
            >
              <div>
                <h3 className="card-title">{work.title}</h3>
                <p className="card-subtitle">Priority: {work.priority}</p>
              </div>
              <div
                style={
                  work.title === "Ocioso" || watchMode
                    ? { display: "none" }
                    : {}
                }
              >
                <div className="d-flex">
                  <button
                    className="btn btn-outline-dark me-1"
                    onClick={() => handlePausarClick()}
                  >
                    PAUSAR
                  </button>
                  <button
                    className="btn btn-outline-dark"
                    onClick={() => handleFinalizarClick()}
                  >
                    FINALIZAR
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <p className="card-text">
                <strong>Description:</strong> {work.description}
              </p>
              <p className="card-text">
                <strong>Time Taken:</strong>{" "}
                {workElapsedTime.hours
                  ? `${workElapsedTime.hours} hours, ${workElapsedTime.minutes} minutes, ${workElapsedTime.seconds} seconds`
                  : `${workElapsedTime.minutes} minutes, ${workElapsedTime.seconds} seconds`}
              </p>
              {work.dueDate && (
                <p className="card-text">
                  <strong>Due Date:</strong>{" "}
                  {work.dueDate
                    ? new Date(work.dueDate).toLocaleString("pt-BR", {
                        year: undefined,
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: undefined,
                      })
                    : "No Due Date"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkCard;
