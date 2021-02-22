import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import ErrorBlock from '../ErrorBlock';

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders component and displays error message from props", () => {
  act(() => {
    render(
      <ErrorBlock error="Testing" />,
      container
    );
  });

  expect(container.textContent).toBe('Testing');
});
