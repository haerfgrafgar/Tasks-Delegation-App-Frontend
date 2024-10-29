import React from "react";
import { Work } from "../../Interfaces";
import { getPriorityColor } from "../../Helper";
import { StartFraction } from "../../Api/Fractions/FractionsApi";

interface WorkListProps {
  works: Work[];
  watchMode?: boolean;
}

const WorkList: React.FC<WorkListProps> = ({ works, watchMode }) => {
  works = works.filter((work) => !work.inProgressNow);
  works = [...works].sort((a, b) => b.priority - a.priority);

  const handleStartClick = async (workId: number) => {
    await StartFraction(workId);
    window.location.reload();
  };

  return (
    <div className="container-fluid my-2">
      <div className="list-group">
        {works.map((work) => (
          <div
            key={work.id}
            className="list-group-item d-flex justify-content-between align-items-center py-3"
            style={{ backgroundColor: getPriorityColor(work.priority) }}
          >
            <div>
              <h5 className="mb-1">{work.title}</h5>
            </div>
            <div>
              <small className="text-muted me-3">
                Due:{" "}
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
              </small>
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={() => handleStartClick(work.id)}
                style={
                  work.title === "Ocioso" || watchMode
                    ? { display: "none" }
                    : {}
                }
              >
                Start
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkList;
