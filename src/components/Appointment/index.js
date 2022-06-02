import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => { transition(SHOW); })
      .catch(err => {
        transition(ERROR_SAVE, true);
      });
  }

  function deleteAppointment() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => { transition(EMPTY); })
      .catch(err => { transition(ERROR_DELETE, true); });
  }
  // console.log(props);

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
            onEdit={() => transition(EDIT)}
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
        {mode === ERROR_SAVE && (
          <Error
            message="Could not save appointment"
            onClose={back}
          />
        )}
        {mode === EDIT && (
          <Form
            interviewer={props.interview.interviewer.id}
            student={props.interview.student}
            interviewers={props.interviewers}
            onSave={save}
            onCancel={() => transition(SHOW)}
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
        {mode === ERROR_DELETE && (
          <Error
            message="Could not delete appointment"
            onClose={back}
          />
        )}
      </header>
    </article>
  );
}