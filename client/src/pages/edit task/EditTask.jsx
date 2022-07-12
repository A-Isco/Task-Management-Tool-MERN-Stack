import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";

let EditTask = () => {
  let navigate = useNavigate();

  let { taskId } = useParams();

  const [errors, SetErrors] = useState([]);

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  // get task info
  const getTaskInfo = (e) => {
    let token = window.localStorage.getItem("token");

    let baseUrl = "http://127.0.0.1:4000/api/task/" + taskId + "";
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    };
    axios
      .get(baseUrl, { headers })
      .then((response) => {
        setTask(response.data);
      })
      .catch((response) => {
        console.log(response.response.data);
      });
  };

  useEffect(() => {
    getTaskInfo();
  }, []);

  // Update Task Function
  const updateTask = (e) => {
    e.preventDefault();

    let token = window.localStorage.getItem("token");

    let baseUrl = "http://127.0.0.1:4000/api/task/" + taskId + "";
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${token} `,
    };
    axios
      .patch(baseUrl, task, { headers })
      .then((response) => {
        alert("Task Updated");
        navigate("/task/show");
      })
      .catch((response) => {
        SetErrors(response.response.data);
      });
  };

  return (
    <div>
      <NavBar />
      <div className="container-sm  p-5">
        <h1 className="p-5">Edit Task</h1>
        <form className="col-4 mx-auto" onSubmit={updateTask}>
          <div className="form-group mb-2 mt-3 ">
            <label className="h3">Task Title</label>
            <input
              type="text"
              className="form-control mt-2 "
              placeholder={task.title}
              name="title"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="form-group mb-2 mt-3 ">
            <label className="h3">Task Description</label>
            <input
              type="text"
              className="form-control mt-2 "
              placeholder={task.description}
              name="description"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="form-group mt-4">
            <label className="h3">Priority</label>
            <select
              className="form-select"
              name="priority"
              aria-label="Default select example"
              onChange={(e) => {
                handleChange(e);
              }}
            >
              <option selected>{task.priority}</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="form-group mt-4">
            <label className="h3">Status</label>
            <select
              className="form-select"
              name="status"
              aria-label="Default select example"
              onChange={(e) => {
                handleChange(e);
              }}
            >
              <option selected>{task.status}</option>

              <option value="To Do">To Do</option>
              <option value="IN Progress">IN Progress</option>
              <option value="Under Review">Under Review</option>
              <option value="Rework">Rework</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="form-group mt-4">
            <label className="h3">Start Date</label>
            <label className="h5 p-3 text-success">{`  ${task.startDate}`}</label>
            <input
              type="date"
              className="form-control mt-2"
              placeholder={task.startDate}
              name="startDate"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="form-group mt-4">
            <label className="h3">End Date</label>
            <label className="h5 p-3 text-success">{`  ${task.endDate}`}</label>

            <input
              type="date"
              className="form-control mt-2"
              placeholder="Enter Task Description"
              name="endDate"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block mt-4">
            Update Task
          </button>
          <div className="">
            <div className=" w-100 mx-auto alert text-danger h5 mt-5">
              {errors}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditTask;
