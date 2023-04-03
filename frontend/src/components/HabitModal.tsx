export default function HabitModal({
  onClose,
  show,
}: {
  onClose: any;
  show: boolean;
}) {
  if (show) {
    return (
      <div className="habit-modal">
        <form className="habit-form" action="" method="post">
          <div className="habit-name">
            <label>Name your new habit</label>
            <input id="habit-name" />
            <p>
              Try learning one new thing at the time. Start small with just a
              few habits and add new ones once they truly get into your routine.
            </p>
          </div>
          <div className="habit-color">
            <label htmlFor="habit-color">Pick color</label>
            <input id="habit-color" type="color" />
          </div>
          <div className="habit-recurrence">
            <div>Customize recurrence</div>
            <div>
              <div>allow to track</div>
              <input name="track" type="radio" value="once" />
              <label>once</label>
              <input name="track" type="radio" value="many" />
              <label>many times</label>
              <div>in a period</div>
              <input name="period" type="radio" value="day" />
              <label>day</label>
              <input name="period" type="radio" value="week" />
              <label>week</label>
              <div>on days</div>
              <input type="checkbox" value="Monday" />
              <label>Monday</label>
              <input type="checkbox" value="Tuesday" />
              <label>Tuesday</label>
              <input type="checkbox" value="Wednesday" />
              <label>Wednesday</label>
              <input type="checkbox" value="Thursday" />
              <label>Thursday</label>
              <input type="checkbox" value="Friday" />
              <label>Friday</label>
              <input type="checkbox" value="Saturday" />
              <label>Saturday</label>
              <input type="checkbox" value="Sunday" />
              <label>Sunday</label>
            </div>
          </div>
          <div>
            <div>Scheduling and notifications</div>
            <p>
              Setting the time on a daily habit will make the habit appear in
              the calendar on specified days automatically. Setting the time
              needed in minutes will affect how long the habit appears in the
              calendar.
            </p>
            <div>
              <label>At Time</label>
              <input type="time" />
              <label>Time Needed</label>
              <input type="text" inputMode="numeric" pattern="\d" max="960" />
            </div>
            <div>
              <div>Healthy or bad habit?</div>
              <p>
                The habit is now tracked as a health habit. Bad habits
                won&apos;t show in the calendar and won&apos;t count in the menu
                badge.
              </p>
              <input type="button" value="Mark as a bad habit" />
            </div>
          </div>
          <div>
            <button type="submit" onClick={onClose}>
              Okay
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return <></>;
  }
}
