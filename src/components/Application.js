import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";

export default function Application(props) {
  // Using spread operator to create a new object with all the existing keys of state
  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));
  let dailyAppointments = [];

  // Combining states
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    const daysUrl = `http://localhost:8001/api/days`;
    const appointmentsUrl = 'http://localhost:8001/api/appointments';
    const interviewersUrl = 'http://localhost:8001/api/interviewers';

    // Promise.all will make all requests before updating the state
    Promise.all([
      axios.get(daysUrl),
      axios.get(appointmentsUrl),
      axios.get(interviewersUrl)
    ]).then((all) => {
      // console.log("all", all);
      const newDaysState = all[0].data;
      const newAppointmentsState = all[1].data;
      const newInterviewersState = all[2].data;
      // console.log("newinterviewers", newInterviewersState)

      setState(prev => ({
        ...prev,
        // day: newDaysState[0].name,
        days: newDaysState,
        appointments: newAppointmentsState,
        interviewers: newInterviewersState
      }));
    });
    // console.log("state.inetr", state.interviewers)
    // Retrieve the days from the api
    // axios.get(`http://localhost:8001/api/days`)
    //   .then(response => {
    // Setting the days state with the data from the response
    // setDays(response.data);
    //   console.log("response", response);
    // });
  }, []);

  // Pass the function only if state.days exists/is true
  if (state.days) {
    dailyAppointments = getAppointmentsForDay(state, state.day);
  }
  // console.log("state", state);

  // console.log("state.day", state.day)
  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    // console.log(dailyAppointments)
    return <Appointment
      key={appointment.id}
      // {...appointment} // This way spreads the object into the props definition intead of writing them one by one
      id={appointment.id}
      time={appointment.time}
      interview={interview}
    />;
  });

  // console.log("daily", dailyAppointments);
  // console.log("state", state)
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
      </section>
    </main>
  );
}
