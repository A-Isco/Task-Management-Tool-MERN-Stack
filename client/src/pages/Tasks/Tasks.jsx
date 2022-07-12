import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import NavBar from "../../components/NavBar";

let Tasks = ({ logout }) => {
  let navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [listType, setListType] = useState("To Do");

  const getTasks = () => {
    let token = window.localStorage.getItem("token");

    let baseUrl = "http://127.0.0.1:4000/api/task/show/" + listType + "";
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    };
    axios
      .get(baseUrl, { headers })
      .then((response) => {
        setTasks(response.data);
      })
      .catch((response) => {
        console.log(response.response.data);
        navigate("/login");
      });
  };

  useEffect(() => {
    getTasks();
  }, [listType]);

  const changeType = (e) => {
    console.log(e.target.name);
    setListType(e.target.name);
  };

  const deleteTask = (taskId) => {
    let token = window.localStorage.getItem("token");

    let baseUrl = "http://127.0.0.1:4000/api/task/" + taskId + "";
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    };
    axios
      .delete(baseUrl, { headers })
      .then((response) => {
        getTasks();
      })
      .catch((response) => {
        console.log(response.response.data);
      });
    console.log("hi");
  };

  return (
    <div>
      <NavBar />
      <div className="container-sm  p-5">
        <div className="btn-group">
          <button
            className="btn btn-secondary m-2"
            name="To Do"
            onClick={changeType}
          >
            To Do
          </button>
          <button
            className="btn btn-secondary m-2"
            name="IN Progress"
            onClick={changeType}
          >
            IN Progress
          </button>
          <button
            className="btn btn-secondary m-2"
            name="Under Review"
            onClick={changeType}
          >
            Under Review
          </button>
          <button
            className="btn btn-secondary m-2"
            name="Rework"
            onClick={changeType}
          >
            Rework
          </button>
          <button
            className="btn btn-secondary m-2"
            name="Completed"
            onClick={changeType}
          >
            Completed
          </button>
        </div>

        <h1 className="p-5">{`${listType} Tasks`}</h1>

        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">priority</th>
              <th scope="col">Status</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
              <th scope="col">Edit Task</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.priority}</td>
                <td>{task.status}</td>
                <td>{task.startDate}</td>
                <td>{task.endDate}</td>
                <td>
                  {
                    <NavLink
                      to={`/task/${task._id}`}
                      className="btn btn-primary"
                      style={{ fontSize: "15px" }}
                    >
                      Edit Task
                    </NavLink>
                  }
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    style={{ fontSize: "15px" }}
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Tasks;
