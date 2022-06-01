import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // console.log("props", props)
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview);

    // The code below will show the SAVING component immediately then switch to SHOW
    transition(SAVING);
    setTimeout(() => {
      transition(SHOW);
    }, 1500);
  }

  function deleteAppointment() {
    props.cancelInterview(props.id);
    transition(DELETING);
    setTimeout(() => {
      transition(EMPTY);
    }, 1500);
  }

  return (
    <article className="appointment">
      <header>
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer.name}
            onDelete={() => transition(CONFIRM)}
          />
        )}
        {mode === CREATE && <Form
          interviewers={props.interviewers}
          onCancel={() => back(EMPTY)}
          onSave={save}
        />}
        {mode === SAVING && (
          <Status
            message="Saving"
          />
        )}
        {mode === CONFIRM && (
          <Confirm
            message="Delete the appointment?"
            onConfirm={deleteAppointment}
            onCancel={() => transition(SHOW)}
          />
        )}
        {mode === DELETING && (
          <Status
            message="Deleting"
          />
        )}
      </header>
    </article>
  );
}