import { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData() {
  // Using spread operator to create a new object with all the existing keys of state
  const setDay = day => setState({ ...state, day });

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


  function bookInterview(id, interview) {
    // console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // This function will update the spots remaining when we book a new interview
    const updatedDays = state.days.map((day) => {
      if (day.name === state.day && state.appointments[id].interview === null) {
        const spots = day.spots - 1;
        return { ...day, spots };
      }
      return day;
    });

    // The code below will make the new appointments persist after browser refresh
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => { setState({ ...state, appointments, days: updatedDays }); });


  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // This function will update the spots remaining when we cancel/delete a new interview
    const updatedDays = state.days.map((day) => {
      if (day.name === state.day) {
        const spots = day.spots + 1;
        return { ...day, spots };
      }
      return day;
    });


    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => { setState({ ...state, appointments, days: updatedDays }); });
  }
  return { state, setDay, bookInterview, cancelInterview };
}


