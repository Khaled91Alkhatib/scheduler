import React, { useState } from 'react';
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewerId, setInterviewerId] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  // Functions used in <Button /> to handle onClick
  const reset = function () {
    setStudent("");
    setInterviewerId(null);
  };

  const cancel = function () {
    reset();
    props.onCancel();
  };

  // This represents whet will the onSave prop in Form component will do
  // const saveData = function () {
  //   props.onSave(student, interviewerId);
  // };

  const validate = function () {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewerId === null) {
      setError("Please select an interviewer");
      return;
    }
    setError("");
    props.onSave(student, interviewerId);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            // This below is a controlled component
            className="appointment__create-input text--semi-bold"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            placeholder="Enter Student Name"
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewerId}
          onChange={(id) => setInterviewerId(id)} // id is from setInterviewer in InterviewerList.js line 14
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button onClick={validate} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
}