import React from "react"

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "./application"

import { render, 
  cleanup, 
 } from "@testing-library/react";


afterEach(cleanup);

describe("Application Reducer", () => {
  it("throws an error with an unsupported type", () => {
    expect(() => reducer({}, {type: null })).toThrowError(
      /tried to reduce with unsupported action type/i
    );
  });
});