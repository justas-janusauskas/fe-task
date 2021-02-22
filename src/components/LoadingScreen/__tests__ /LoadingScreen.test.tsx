import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import LoadingScreen from '../LoadingScreen';

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

it("renders loader image", () => {
  act(() => {
    render(
      <LoadingScreen />,
      container
    );
  });

  expect(container.querySelectorAll('[data-testid="loader"]').length).toBe(1);
});
