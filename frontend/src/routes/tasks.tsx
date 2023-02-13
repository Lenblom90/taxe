import Calendar from "../components/Calendar";
import Taskbar from "../components/Taskbar";
import TaskList from "../components/TaskList";
import "../styles/tasks.css";

export default function Tasks() {
  const status = {
    later: "later",
    next: "next",
    started: "started",
    waiting: "waiting",
    completed: "completed",
  };

  const priority = {
    highest: 2,
    high: 1,
    normal: 0,
    low: -1,
    lowest: -2,
  };

  const motivation = {
    must: "must",
    should: "should",
    want: "want",
    unknown: "unknown",
  };

  const eisenhower = {
    urgent_important: 1,
    urgent: 2,
    important: 3,
    none: 4,
    uncategorized: 0,
  };

  const newTask = (
    id = crypto.randomUUID(),
    area_id = crypto.randomUUID(),
    status: string,
    previous_status: string,
    estimate: number,
    priority: number,
    motivation: string,
    eisenhower: number,
    sources: Array<Object>,
    scheduled_on: string | null,
    completed_at: string | null,
    created_at: string,
    updated_at: string,
    deleted_at?: string | null
  ) => {
    const task = {
      id: id,
      area_id: area_id,
      status: status,
      previous_status: previous_status,
      estimate: estimate,
      priority: priority,
      motivation: motivation,
      eisenhower: eisenhower,
      sources: sources,
      scheduled_on: scheduled_on,
      completed_at: completed_at,
      created_at: created_at,
      updated_at: updated_at,
      deleted_at: deleted_at,
    };
    return task;
  };

  const tasks = [
    newTask(
      crypto.randomUUID(),
      crypto.randomUUID(),
      status.later,
      status.next,
      10,
      priority.normal,
      motivation.unknown,
      eisenhower.none,
      [],
      new Date().toISOString(),
      new Date().toISOString(),
      new Date().toISOString(),
      new Date().toISOString(),
      new Date().toISOString()
    ),
    newTask(
      crypto.randomUUID(),
      crypto.randomUUID(),
      status.started,
      status.next,
      15,
      priority.low,
      motivation.want,
      eisenhower.none,
      [],
      null,
      null,
      new Date().toISOString(),
      new Date().toISOString(),
      null
    ),
  ];

  console.log(tasks[0]);

  return (
    <div id="tasks-page">
      <TaskList tasks={tasks} />
      <Calendar />
      <Taskbar />
    </div>
  );
}
