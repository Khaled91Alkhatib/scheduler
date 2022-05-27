export function getAppointmentsForDay(state, day) {

  // Filter through state.days to get an object of every indiviual day that matches the parameter day
  const foundDay = state.days.filter(filteredDay => filteredDay.name === day)[0];
  // console.log(foundDay);

  // This handles the possibility of not having a given day
  if (!foundDay) {
    return [];
  }

  // First approach to return the array of appointments is by using for...of loop
  const results = [];
  for (const key of foundDay.appointments) {
    // console.log(state.appointments[key]);
    if (state.appointments[key]) {
      results.push(state.appointments[key]);
    }
  }
  return results;

  // Another approach is possible by using .map()
  // return foundDay.appointments.map(id => {
  //   if (state.appointments[id]) {
  //     return state.appointments[id];
  //   }
  // });
}

export function getInterview(state, interview) {
  const interviewObject = {};
  if (!interview) {
    return null;
  } else {
    const interviewerId = interview.interviewer;

    Object.assign(interviewObject, {
      student: interview.student,
      interviewer: {
        id: interviewerId,
        name: state.interviewers[interviewerId].name,
        avatar: state.interviewers[interviewerId].avatar
      }
    });
  }
  return interviewObject;
}

export function getInterviewersForDay(state, day) {

  // Filter through state.days to get an object of every indiviual day that matches the parameter day
  const foundDay = state.days.filter(filteredDay => filteredDay.name === day)[0];
  // console.log(foundDay);

  // This handles the possibility of not having a given day
  if (!foundDay) {
    return [];
  }

  // First approach to return the array of interviewers is by using for...of loop
  const results = [];
  for (const key of foundDay.interviewers) {
    // console.log(state.appointments[key]);
    if (state.interviewers[key]) {
      results.push(state.interviewers[key]);
    }
  }
  return results;

  // Another approach is possible by using .map()
  // return foundDay.appointments.map(id => {
  //   if (state.appointments[id]) {
  //     return state.appointments[id];
  //   }
  // });
}
