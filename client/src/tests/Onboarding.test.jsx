/* eslint-disable no-undef */
import { afterEach, describe, expect } from "vitest";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Onboarding from "../pages/Onboarding/Onboarding";

afterEach(() => {
  render(null);
});

describe("Onboarding page", () => {
  test("renders the component correctly", () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Onboarding />} />
        </Routes>
      </BrowserRouter>
    );
    expect(screen.getByText("Your name")).toBeInTheDocument();
    expect(screen.getByText("Your age")).toBeInTheDocument();
    expect(screen.getByText("Your dog's name")).toBeInTheDocument();
    expect(screen.getByText("Your dog's age")).toBeInTheDocument();
    expect(screen.getByText("Your dog's gender")).toBeInTheDocument();
    expect(screen.getByText("Male")).toBeInTheDocument();
    expect(screen.getByText("Female")).toBeInTheDocument();
    expect(
      screen.getByText("Something about you and your dog")
    ).toBeInTheDocument();
    expect(screen.getByText("Profile Picture")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });
});
