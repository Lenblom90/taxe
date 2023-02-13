export default function TaskList({ tasks }: { tasks: Array<Object> }) {
  return <div>{tasks.map((task) => task.id)}</div>;
}
