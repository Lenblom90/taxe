import { useState } from "react";
import { Link } from "react-router-dom";
import HabitModal from "../components/HabitModal";
import "../styles/habits.css";

export default function Habits() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="habits">
      <div className="habits-grid">
        <div className="habits-header">
          <Link to={"/journal"}>Journal</Link>
          <Link to={"/habits"}>Habits</Link>
          <button>stats</button>
          <button onClick={handleShow}>new habit</button>
          <div className="habit-days">
            <div>Mon 20</div>
            <div>Tue 21</div>
          </div>
        </div>
        <div>
          <div className="habit-group">
            <div>Healthy lifestyle</div>
            <div></div>
          </div>
          <div className="habit-row">
            <div>Wake up early</div>
            <div>...</div>
          </div>
        </div>
      </div>
      <HabitModal onClose={handleClose} show={show} />
    </div>
  );
}
