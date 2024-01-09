import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  editTask,
  deleteTask,
  toggleComplete,
} from "../../store/store";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "20px",
  },
  pt20: {
    paddingTop: "20px",
    display: "block",
  },
}));

const TodoList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const classes = useStyles();

  const [newTask, setNewTask] = useState("");
  const [editTaskId, setEditTaskId] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      dispatch(
        addTask({ id: Date.now(), description: newTask, completed: false })
      );
      setNewTask("");
    }
  };

  const handleEditTask = (id) => {
    if (editedDescription.trim() !== "") {
      dispatch(editTask({ id, description: editedDescription }));
      setEditTaskId("");
      setEditedDescription("");
    }
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const handleToggleComplete = (id) => {
    dispatch(toggleComplete(id));
  };

  const handleEditButtonClick = (id, description) => {
    setEditTaskId(id);
    setEditedDescription(description);
  };

  return (
    <div className={classes.container}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks &&
              tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    {editTaskId === task.id ? (
                      <TextField
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        fullWidth
                      />
                    ) : (
                      task.description
                    )}
                  </TableCell>
                  <TableCell>
                    {editTaskId === task.id ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEditTask(task.id)}
                      >
                        Save
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            handleEditButtonClick(task.id, task.description)
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleToggleComplete(task.id)}
                        >
                          {task.completed ? "Mark Incomplete" : "Mark Complete"}
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.pt20}>
        <TextField
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          fullWidth
        />
        <span className={classes.pt20}>
          <Button variant="contained" color="primary" onClick={handleAddTask}>
            Add Task
          </Button>
        </span>
      </div>
    </div>
  );
};

export default TodoList;
