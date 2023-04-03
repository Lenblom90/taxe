import React from "react";
import {
  createdatToString,
  estimateToString,
  priorityToString,
} from "../lib/TaskHelperMethods";
import { Task } from "../types";

export default function TaskRow({
  task,
  handleClick,
  handleDelete,
  setDrag,
}: {
  task: Task;
  handleClick: (task: Task) => void;
  handleDelete: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    task: Task
  ) => void;
  setDrag: React.Dispatch<React.SetStateAction<Task>>;
}) {
  return (
    <li
      draggable={true}
      onDragStart={() => setDrag(task)}
      onClick={() => handleClick(task)}
      className="tasklist-item"
    >
      <input type="checkbox" checked={!!task.completed_at} readOnly></input>
      <div>{task.note}</div>
      <div>{task.name}</div>
      <div className="estimate">{estimateToString(task.estimate)}</div>
      <div>{priorityToString(task.priority)}</div>
      <div className="age">{createdatToString(task.created_at)}</div>
      <button className="delete-btn" onClick={(e) => handleDelete(e, task)}>
        del
      </button>
    </li>
  );
}
