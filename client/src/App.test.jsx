import { afterEach, describe, it, expect, vi } from "vitest";
import App from "./App";
import Home from "./pages/Home/Home";
import { Router } from "react-router-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

describe("something truthy and falsy", () => {
  it("true to be true", () => {
    expect(true).toBe(true);
  });

  it("false to be false", () => {
    expect(false).toBe(false);
  });
});

describe("App", () => {
  it("renders headline", () => {
    render(<App title="React" />);

    screen.debug();
  });
});

describe("Home Component", () => {
  test("renders the component correctly", () => {
    render(
      <App>
        <Router>
          <Home />
        </Router>
      </App>
    );
    expect(screen.getByText("TinPet")).toBeInTheDocument();
    expect(
      screen.getByText(/Your dog is lonely and has no friends/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Create Account/i })
    ).toBeInTheDocument();
  });
  test("opens the correct modal when the create account button is clicked", () => {
    render(
      <App>
        <Router>
          <Home />
        </Router>
      </App>
    );
    fireEvent.click(screen.getByRole("button", { name: /Create Account/i }));
    expect(
      screen.getByPlaceholderText("confirm your password")
    ).toBeInTheDocument();
  });
  test("opens the correct modal when the log in button is clicked", () => {
    render(
      <App>
        <Router>
          <Home />
        </Router>
      </App>
    );
    fireEvent.click(screen.getByRole("button", { name: /Log In/i }));
    expect(screen.getByText("LOG IN")).toBeInTheDocument();
  });
});
