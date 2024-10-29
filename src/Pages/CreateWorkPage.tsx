import { useState } from "react";
import { CriarWork } from "../Api/Work/WorkApi";
import { useNavigate } from "react-router";
import { CreateWorkRequestDto } from "../Interfaces";

const CreateWorkForm = () => {
  const navigate = useNavigate();
  const [execUsername, setExecUsername] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(1);
  const [dueDate, setDueDate] = useState("");
  const [startDate, setStartDate] = useState("");

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const workRequest: CreateWorkRequestDto = {
      ExecUsername: execUsername,
      Description: description,
      Title: title,
      Priority: priority,
      DueDate: new Date(dueDate),
      StartDate: new Date(startDate),
    };

    console.log(workRequest);
    const response = await CriarWork(workRequest);
    if (response) {
      navigate("/");
    }
  };

  var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  var now = new Date(Date.now() - tzoffset).toISOString().slice(0, 16);

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center mt-5">
      <form
        className="w-75 p-4 shadow rounded bg-light"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-4 text-center">Create Work Request</h2>

        <div className="mb-3">
          <label htmlFor="execUsername" className="form-label">
            Exec Username
          </label>
          <input
            type="text"
            className="form-control"
            id="execUsername"
            value={execUsername}
            onChange={(e) => setExecUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="priority" className="form-label">
            Priority (1-10)
          </label>
          <select
            className="form-select"
            id="priority"
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
            required
          >
            {[...Array(10)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">
            Start Date
          </label>
          <input
            type="datetime-local"
            className="form-control"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={now}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="dueDate" className="form-label">
            Due Date
          </label>
          <input
            type="datetime-local"
            className="form-control"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            min={startDate}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateWorkForm;
