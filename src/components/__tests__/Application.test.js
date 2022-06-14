import React from "react";
import axios from "axios";
import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, getAllByText, queryByText, getByDisplayValue, waitForElementToBeRemoved } from "@testing-library/react";
import Application from "components/Application";



afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
    // If getByText("Monday") were wrapped in {}, the test will fail
    return waitForElement(() => getByText("Monday"))
      .then(() => {
        fireEvent.click(getByText("Tuesday"));
        expect(getByText("Leopold Silvers")).toBeInTheDocument();
      });
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {

    // Render the application
    const { container, debug } = render(<Application />);
    //wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // Click the "Add" button on the first empty appointment.
    const appointment = getAllByTestId(container, "appointment")[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    // Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    // Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    // Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));
    // Verify that the the appointment element contains the text "Saving" immediately after the "Save" button is clicked.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    // Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    // Identify teh text "Monday"
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    // Check for the text "no spots remaining"
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments.find(appointment => queryByText(appointment, "Archie Cohen"));
    fireEvent.click(getByAltText(appointment, "Delete"));
    expect(getByText(appointment, /Delete the appointment?/i)).toBeInTheDocument();
    fireEvent.click(queryByText(appointment, "Confirm"));
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    await waitForElement(() => getByAltText(appointment, "Add"));
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
    // debug()
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments.find(appointment => queryByText(appointment, "Archie Cohen"));
    fireEvent.click(getByAltText(appointment, "Edit"));
    expect(getByAltText(appointment, "Tori Malcolm")).toBeInTheDocument();
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Saving"));
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    // debug();
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container,"appointment");
    const appointment = appointments.find(appointment => queryByText(appointment, "Archie Cohen"));
    fireEvent.click(getByAltText(appointment, "Edit"));
    expect(getByAltText(appointment, "Tori Malcolm")).toBeInTheDocument();
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));
    expect(getByText(appointment, /Could not save appointment/i)).toBeInTheDocument();
    fireEvent.click(getByAltText(appointment, "Close"));
    expect(getByText(appointment, "Tori Malcolm")).toBeInTheDocument();
    expect(getByDisplayValue(appointment, "Archie Cohen")).toBeInTheDocument();
    // debug()
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container,"appointment");
    const appointment = appointments.find(appointment => queryByText(appointment, "Archie Cohen"));
    fireEvent.click(getByAltText(appointment, "Delete"));
    expect(getByText(appointment, /Delete the appointment?/i)).toBeInTheDocument();
    fireEvent.click(queryByText(appointment, "Confirm"));
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => getByText(appointment, "Deleting"));
    expect(getByText(appointment, /Could not delete appointment/i)).toBeInTheDocument();
    fireEvent.click(getByAltText(appointment, "Close"));
    expect(getByText(appointment, "Tori Malcolm")).toBeInTheDocument();
    expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();

    // debug()
  })
});