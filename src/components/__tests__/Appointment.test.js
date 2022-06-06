import React from "react";
import { render } from "@testing-library/react";
import Application from "components/Application";


// We are using describe() to group a series of tests
describe("Appointment", () => {

  // 'it' and 'test' are interchangeable. Bear in mind consistency is recommended!
  it("renders without crashing", () => {
    render(<Application />);
  });


});