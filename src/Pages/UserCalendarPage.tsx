import { Scheduler } from "@aldabil/react-scheduler";
import { CriarWork, GetUserCalendarExecutingWorks } from "../Api/Work/WorkApi";
import { useEffect, useState } from "react";
import {
  CalendarWorkDto,
  CreateWorkRequestDto,
  TimeRangeDto,
} from "../Interfaces";
import Swal from "sweetalert2";
import { ProcessedEvent } from "@aldabil/react-scheduler/types";
import { ptBR } from "date-fns/locale";
import "../assets/css/Calendar.modules.css";
import { formatDateTimeLocal } from "../Helper";
import { useParams } from "react-router-dom";
import { StartFraction } from "../Api/Fractions/FractionsApi";

type PageParams = {
  username: string;
};

const UserCalendarPage = () => {
  const { username } = useParams<PageParams>();

  const [listCalendarWorks, setListCalendarWorks] =
    useState<CalendarWorkDto[]>();
  const [serverError, setServerError] = useState<string>("");
  const [queryDate, setQueryDate] = useState<TimeRangeDto>({
    dateEnd: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
    dateStart: new Date(new Date().setDate(1)),
  });
  var currentMonth = queryDate.dateStart.getMonth();

  const makeApiRequestListCalendarWorks = async () => {
    const result = await GetUserCalendarExecutingWorks(username!, queryDate); //username won't always exist, but if it doesn't then it
    //shouldn't be showing data anyway
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
    makeApiRequestListCalendarWorks();
  }, [queryDate]);

  // useEffect(() => {
  //   console.log(listCalendarWorks);
  // }, [listCalendarWorks]);

  function handleOnEventClick(e: ProcessedEvent) {
    Swal.fire({
      title: e.title?.toString(),
      confirmButtonText: "<spam>Start</spam>",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await StartFraction(Number(e.event_id));
        window.location.reload();
      }
    });
  }

  function handleOnCellClick(start: Date, end: Date) {
    Swal.fire({
      title: "Create task",
      html: `
        <input type="text" id="title" class="swal2-input" placeholder="Title">
        <input type="text" id="description" class="swal2-input" placeholder="Description">
        <input type="text" id="priority" class="swal2-input" placeholder="Priority (1 to 10)">
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
        const priority = (
          document.getElementById("priority") as HTMLInputElement
        ).value;
        const startDate = (
          document.getElementById("startDate") as HTMLInputElement
        ).value;
        const endDate = (document.getElementById("endDate") as HTMLInputElement)
          .value;

        if (!title || !description || !startDate || !endDate) {
          Swal.showValidationMessage("Please fill out all fields");
        }

        if (
          Number(priority) > 10 ||
          Number(priority) < 1 ||
          isNaN(Number(priority))
        ) {
          Swal.showValidationMessage("Priority out of range");
        }

        var workDto: CreateWorkRequestDto = {
          Title: title,
          Description: description,
          StartDate: new Date(startDate),
          DueDate: new Date(endDate),
          ExecUsername: username!,
          Priority: Number(priority),
        };
        return workDto;
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        await CriarWork(result.value);
        makeApiRequestListCalendarWorks();
      }
    });
  }

  function handleDateChange(date: Date) {
    if (date.getMonth() === currentMonth) return;

    var dateStart = new Date(date.setDate(1) - 8);
    var dateEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    console.log(dateStart);
    console.log(dateEnd);

    const timeRange: TimeRangeDto = { dateStart: dateStart, dateEnd: dateEnd };

    setQueryDate(timeRange);
    currentMonth = date.getMonth();
  }

  if (serverError) return serverError;

  if (listCalendarWorks == null) return <>No data</>;

  return (
    <div className="wrapper mt-4">
      <div className="applyContentBox">
        <Scheduler
          events={listCalendarWorks}
          disableViewer
          view="week"
          locale={ptBR}
          timeZone="America/Sao_Paulo"
          onEventClick={(e) => handleOnEventClick(e)}
          onCellClick={(start: Date, end: Date) =>
            handleOnCellClick(start, end)
          }
          onSelectedDateChange={(date: Date) => {
            handleDateChange(date);
          }}
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

export default UserCalendarPage;
