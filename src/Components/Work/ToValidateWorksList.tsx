import React from "react";
import { CorrigirWorkDto, Work } from "../../Interfaces";
import { getPriorityColor } from "../../Helper";
import Swal from "sweetalert2";
import { CorrigirWork } from "../../Api/Work/WorkApi";

interface WorkListProps {
  works: Work[];
}

const ToValidateWorksList: React.FC<WorkListProps> = ({ works }) => {
  works = [...works].sort((a, b) => b.priority - a.priority);

  const handleCorrigirClick = async (work: Work) => {
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
      confirmButtonText: "Aprovar",
      showDenyButton: true,
      denyButtonText: `Recusar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Comentário (opcional)",
          input: "text",
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: true,
          confirmButtonText: "Aprovar",
          cancelButtonText: "Cancelar",
          showLoaderOnConfirm: true,
          preConfirm: async (input) => {
            console.log(input);
          },
          allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
          if (result.isConfirmed) {
            const corrigirWorkDto: CorrigirWorkDto = {
              Aprovado: true,
              Motivo: result.value,
            };
            CorrigirWork(corrigirWorkDto, work.id);
            Swal.fire("Aprovado", "", "success").then(() =>
              window.location.reload()
            );
          }
        });
      } else if (result.isDenied) {
        Swal.fire({
          title: "Motivo",
          input: "text",
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: true,
          confirmButtonText: "Recusar",
          cancelButtonText: "Cancelar",
          showLoaderOnConfirm: true,
          preConfirm: async (input) => {
            console.log(input);
          },
          allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
          if (result.value === "") {
            Swal.fire("Campo obrigatório.");
          } else if (result.isConfirmed) {
            const corrigirWorkDto: CorrigirWorkDto = {
              Aprovado: false,
              Motivo: result.value,
            };
            CorrigirWork(corrigirWorkDto, work.id);
            Swal.fire("Recusado", "", "error").then(() =>
              window.location.reload()
            );
          }
        });
      }
    });
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
                onClick={() => handleCorrigirClick(work)}
                style={work.title === "Ocioso" ? { display: "none" } : {}}
              >
                Corrigir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToValidateWorksList;
