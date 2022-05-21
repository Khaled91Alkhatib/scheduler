import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";


const appointments = {
  "1": {
    id: 1,
    time: "12pm",
  },
  "2": {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  "3": {
    id: 3,
    time: "2pm",
  },
  "4": {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  "5": {
    id: 5,
    time: "4pm",
  }
};

export default function Application(props) {
  // Using spread operator to create a new object with all the existing keys of state
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));

  // Combining states
  const [state, setState] = useState({
    day: "Monday",
    days: []
  });

  useEffect(() => {
    // Retrieve the days from the api
    axios.get(`http://localhost:8001/api/days`)
      .then(response => {
        // Setting the days state with the data from the response
        setDays(response.data);
        console.log("response", response);
      });
  }, []);

  const newArray = Object.values(appointments).map((appointment) => {
    return <Appointment
      key={appointment.id}
      {...appointment} // This way spreads the object into the props definition intead of writing them one by one
    // id={appointment.id}
    // time={appointment.time}
    // interview={appointment.interview}
    />;
  });

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
        {newArray}
      </section>
    </main>
  );
}
