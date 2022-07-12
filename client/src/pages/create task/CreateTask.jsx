import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";

let CreateTask = () => {
  let navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "",
    status: "",
    startDate: "",
    endDate: "",
  });
  const [errors, SetErrors] = useState([]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  // Create Task Function
  const createTask = (e) => {
    e.preventDefault();

    let token = window.localStorage.getItem("token");

    let baseUrl = "http://127.0.0.1:4000/api/task/create";
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${token} `,
    };
    axios
      .post(baseUrl, task, { headers })
      .then((response) => {
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
        <h1 className="p-5">Create Task</h1>
        <form className="col-4 mx-auto" onSubmit={createTask}>
          <div className="form-group mb-2 mt-3 ">
            <label className="h3">Task Title</label>
            <input
              type="text"
              className="form-control mt-2 "
              placeholder="Enter Task Title"
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
              placeholder="Enter Task Description"
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
              <option selected>Select Task Priority</option>
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
              <option selected>Select Task Priority</option>
              <option value="To Do">To Do</option>
              <option value="IN Progress">IN Progress</option>
              <option value="Under Review">Under Review</option>
              <option value="Rework">Rework</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="form-group mt-4">
            <label className="h3">Start Date</label>
            <input
              type="date"
              className="form-control mt-2"
              placeholder="Enter Task Description"
              name="startDate"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="form-group mt-4">
            <label className="h3">End Date</label>
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
            Create Task
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
export default CreateTask;
