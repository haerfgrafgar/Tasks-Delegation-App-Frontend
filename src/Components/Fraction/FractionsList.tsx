import React, { useEffect, useState } from "react";
import { FractionOfTime, Work } from "../../Interfaces";
import { convertSecondsToStringMinimalist } from "../../Helper";
import { GetWorkById } from "../../Api/Work/WorkApi";
import Swal from "sweetalert2";

interface FractionsListProps {
  fractions: FractionOfTime[];
}

const FractionsList: React.FC<FractionsListProps> = ({ fractions }) => {
  const [idTitleMap, setIdTitleMap] = useState<{ [key: number]: string }>({});
  const [workMap, setWorkMap] = useState<{ [key: number]: Work }>({});
  const [isProcessing, setIsProcessing] = useState(true); // Track if the processing is done

  async function processFractions() {
    const map: { [key: number]: string } = {};
    const workMap: { [key: number]: Work } = {};
    for (const frac of fractions) {
      if (!(frac.workId in map)) {
        const work: Work | undefined = await GetWorkById(frac.workId); //work will never be undefined because fractions can only
        map[frac.workId] = work!.title; //be created with a valid workId
        workMap[frac.workId] = work!;
      }
    }
    setIdTitleMap(map);
    setWorkMap(workMap);
    setIsProcessing(false); // Mark processing as done
  }

  useEffect(() => {
    processFractions(); // Trigger the async function on component mount
  }, [fractions]); // Re-run if `fractions` change

  if (isProcessing) {
    return <div>Loading...</div>;
  }

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
        {fractions.map((frac) => (
          <button
            onClick={() => handleTitleClick(workMap[frac.workId])}
            className="bg-transparent border-0 p-0"
          >
            <div
              key={frac.id}
              className="list-group-item d-flex justify-content-between align-items-center py-3"
              style={
                idTitleMap[frac.workId] === "Ocioso"
                  ? { backgroundColor: "white" }
                  : { backgroundColor: "#D3D3D3" }
              }
            >
              <h5 className="mb-0 mt-0 me-5">{idTitleMap[frac.workId]}</h5>

              <div className="d-flex">
                <h5 className="me-5">
                  {convertSecondsToStringMinimalist(
                    Math.floor(
                      new Date(frac.end).getTime() -
                        new Date(frac.begin).getTime()
                    ) / 1000
                  )}
                </h5>
                <h5 className="text-muted me-3">
                  {frac.begin
                    ? new Date(frac.begin).toLocaleString("pt-BR", {
                        year: undefined,
                        month: undefined,
                        day: undefined,
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })
                    : "No Due Date"}{" "}
                  às{" "}
                  {frac.end
                    ? new Date(frac.end).toLocaleString("pt-BR", {
                        year: undefined,
                        month: undefined,
                        day: undefined,
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })
                    : "No Due Date"}
                </h5>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FractionsList;
