import React from "react";
import { Work } from "../../Interfaces";
import { getPriorityColor } from "../../Helper";
import Swal from "sweetalert2";

interface WorkListProps {
  works: Work[];
}

const CoordenatingWorksList: React.FC<WorkListProps> = ({ works }) => {
  works = [...works].sort((a, b) => b.priority - a.priority);

  function handleTitleClick(work: Work) {
    Swal.fire({
      title: "Work Information",
      html: `
        <strong>Title:</strong> ${work.title}<br/>
        <strong>Description:</strong> ${work.description}<br/>
        ${
          work.dueDate
            ? "<strong>Data prevista:</strong> " +
              new Date(work.dueDate).toLocaleString("pt-BR", {
                year: undefined,
                month: "long",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: undefined,
              })
            : ""
        }<br/> 
      `,
      confirmButtonText: "OK",
    });
  }

  return (
    <div className="container-fluid my-2">
      <div className="list-group">
        {works.map((work) => (
          <button
            onClick={() => handleTitleClick(work)}
            className="bg-transparent border-0 p-0"
          >
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
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CoordenatingWorksList;
