import React from "react";
import { screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { renderWithRouterWrapper } from "../../testUtils";
import Main from "./Main";
import { civilizationsMock } from "mocks/civilizations";
import { act } from "react-dom/test-utils";

const server = setupServer(
  rest.get(`${process.env.REACT_APP_BACKEND}/civilizations`, (_, res, ctx) => {
    return res(ctx.json(civilizationsMock));
  })
);

describe("Main page", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("render the page", async () => {
    renderWithRouterWrapper(<Main />);
    const container = await screen.findByTestId("civilizations-list");
    expect(container).toMatchSnapshot();
  });

  test("civilization length", async () => {
    renderWithRouterWrapper(<Main />);
    const civilizationsList = await screen.findByTestId("civilizations-list");
    expect(civilizationsList.children.length).toBe(32);
  });

  test("error", async () => {
    server.use(
      rest.get(
        `${process.env.REACT_APP_BACKEND}/civilizations`,
        (_, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );

    renderWithRouterWrapper(<Main />);
    const error = await screen.findByTestId("error");
    expect(error).toBeDefined();
  });

  test("loading", async () => {
    renderWithRouterWrapper(<Main />);
    await act(async () => {
      jest.useFakeTimers();
    });
    const loading = await screen.findByTestId("loading");
    expect(loading).toBeDefined();
  });
});
