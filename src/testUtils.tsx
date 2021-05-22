import React from "react";
import { render } from "@testing-library/react";
import {
  createHistory,
  createMemorySource,
  LocationProvider,
} from "@reach/router";

export function renderWithRouterWrapper(
  ui: any,
  { route = "/", history = createHistory(createMemorySource(route)) }: any = {}
) {
  return {
    ...render(<LocationProvider history={history}>{ui}</LocationProvider>),
    history,
  };
}
