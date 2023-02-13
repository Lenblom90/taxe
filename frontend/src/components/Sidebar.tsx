import { Link } from "react-router-dom";
import Logo from "../assets/Taxe-logo.svg";
import TaskIcon from "../assets/Tasks.svg";
import HomeIcon from "../assets/Home.svg";
import JournalIcon from "../assets/Journal.svg";
import CalendarIcon from "../assets/Calendar.svg";
import SettingsIcon from "../assets/Settings.svg";
import "../styles/Sidebar.css";

export default function Sidebar() {
  return (
    <div id="sidebar">
      <div>
        <img src={Logo} alt="logo" />
      </div>
      <nav>
        <ul className="page-nav">
          <li className="home">
            <Link to="/">
              <img src={HomeIcon} alt="logo" />
            </Link>
          </li>
          <li className="tasks">
            <Link to="/tasks">
              <img src={TaskIcon} alt="logo" />
            </Link>
          </li>
          <li className="journal">
            <Link to="/journal">
              <img src={JournalIcon} alt="logo" />
            </Link>
          </li>
          <li className="calendar">
            <Link to="/calendar">
              <img src={CalendarIcon} alt="logo" />
            </Link>
          </li>
        </ul>
      </nav>
      <div className="settings">
        <ul>
          <li className="settings">
            <Link to="/settings">
              <img src={SettingsIcon} alt="logo" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
