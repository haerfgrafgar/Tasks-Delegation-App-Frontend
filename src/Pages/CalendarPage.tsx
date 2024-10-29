import { Scheduler } from "@aldabil/react-scheduler";
import { GetCalendarExecutingWorks } from "../Api/Work/WorkApi";
import { useEffect, useState } from "react";
import { CalendarWorkDto } from "../Interfaces";
import Swal from "sweetalert2";
import { ProcessedEvent } from "@aldabil/react-scheduler/types";
import { ptBR } from "date-fns/locale";
import "../assets/css/Calendar.modules.css";
import { formatDateTimeLocal } from "../Helper";

const CalendarPage = () => {
  const [listCalendarWorks, setListCalendarWorks] =
    useState<CalendarWorkDto[]>();
  const [serverError, setServerError] = useState<string>("");

  const makeApiRequestListCalendarWorks = async () => {
    const result = await GetCalendarExecutingWorks();

    if (typeof result === "string") {
      setServerError(result);
      setListCalendarWorks([]);
    } else if (Array.isArray(result)) {
      result.map(
        (work) => (
          (work.end = new Date(work.end)), (work.start = new Date(work.start))
        )
      );
      setListCalendarWorks(result);
      setServerError("");
    }
  };

  useEffect(() => {
    makeApiRequestListCalendarWorks();
  }, []);

  useEffect(() => {
    console.log(listCalendarWorks);
  }, [listCalendarWorks]);

  function handleOnEventClick(e: ProcessedEvent) {
    Swal.fire(e.title?.toString());
  }

  function handleOnCellClick(start: Date, end: Date) {
    Swal.fire({
      title: "Create task",
      html: `
        <input type="text" id="title" class="swal2-input" placeholder="Title">
        <input type="text" id="description" class="swal2-input" placeholder="Description">
        <input type="datetime-local" id="startDate" class="swal2-input" value="${formatDateTimeLocal(
          start
        )}">
        <input type="datetime-local" id="endDate" class="swal2-input" value="${formatDateTimeLocal(
          end
        )}">
      `,
      focusConfirm: false,
      preConfirm: () => {
        const title = (document.getElementById("title") as HTMLInputElement)
          .value;
        const description = (
          document.getElementById("description") as HTMLInputElement
        ).value;
        const startDate = (
          document.getElementById("startDate") as HTMLInputElement
        ).value;
        const endDate = (document.getElementById("endDate") as HTMLInputElement)
          .value;

        if (!title || !description || !startDate || !endDate) {
          Swal.showValidationMessage("Please fill out all fields");
        }

        return { title, description, startDate, endDate };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Form Data:", result.value);
      }
    });
  }

  if (serverError) return serverError;

  if (listCalendarWorks == null) return <>No data</>;

  return (
    <div className="wrapper">
      <div className="applyContentBox">
        <Scheduler
          events={listCalendarWorks}
          disableViewer
          locale={ptBR}
          timeZone="America/Sao_Paulo"
          onEventClick={(e) => handleOnEventClick(e)}
          onCellClick={(start: Date, end: Date) =>
            handleOnCellClick(start, end)
          }
          editable={false}
          month={{
            weekDays: [2, 3, 4, 5, 6],
            weekStartOn: 6,
            startHour: 8,
            endHour: 18,
            navigation: true,
            disableGoToDay: false,
          }}
          week={{
            weekDays: [2, 3, 4, 5, 6],
            weekStartOn: 6,
            startHour: 8,
            endHour: 18,
            step: 60,
            navigation: true,
            disableGoToDay: false,
          }}
          day={{
            startHour: 8,
            endHour: 18,
            step: 60,
            navigation: true,
          }}
          hourFormat="24"
        />
      </div>
    </div>
  );
};

export default CalendarPage;
