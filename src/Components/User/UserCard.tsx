import React from "react";
import { GeneralSituationResponseDto } from "../../Interfaces";
import { convertSecondsToString } from "../../Helper";
import { useNavigate } from "react-router";

interface UserCardProps {
  user: GeneralSituationResponseDto;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const navigate = useNavigate();

  function handleTasksClick(username: string) {
    navigate(`/tasks/${username}`);
  }

  function handleHistoricoClick(username: string) {
    navigate(`/historico/${username}`);
  }

  function handleCalendarioClick(username: string) {
    navigate(`/calendar/${username}`);
  }

  return (
    <div className="">
      <div className="card">
        <div
          className="card-header text-center"
          style={{
            backgroundColor:
              user.workTitle === "Ocioso" ? "#FF7F15" : "#90EE90",
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0 mx-auto">{user.username}</h5>{" "}
            <p
              className="card-text mb-0 rounded-circle bg-white text-dark d-inline-block text-center border"
              style={{ width: "3ch", height: "3ch", lineHeight: "2.5ch" }}
            >
              {user.worksAmount}
            </p>
          </div>
        </div>
        <div className="card-body">
          <h4 className="card-title text-center">{user.workTitle}</h4>{" "}
          <p className="card-text">
            Tempo total: {convertSecondsToString(user.totalTimeInTask)}
          </p>
          <p className="card-text">
            Tempo atual: {convertSecondsToString(user.currentTimeInTask)}
          </p>
          {user.dueDate && (
            <p className="card-text">
              Previsão:{" "}
              {new Date(user.dueDate).toLocaleString("pt-BR", {
                year: undefined,
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: undefined,
              })}
            </p>
          )}
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-primary me-1"
              onClick={() => handleTasksClick(user.username)}
            >
              TASKS
            </button>
            <button
              className="btn btn-primary me-1"
              onClick={() => handleHistoricoClick(user.username)}
            >
              HISTÓRICO
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleCalendarioClick(user.username)}
            >
              CALENDÁRIO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
