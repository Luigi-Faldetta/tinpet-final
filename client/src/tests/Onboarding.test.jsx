import { afterEach, describe, it, expect, vi } from "vitest";
import { Route, Routes, BrowserRouter, MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Onboarding from "../pages/Onboarding/Onboarding";
import Dashboard from "../pages/Dashboard/Dashboard";

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
    expect(screen.getByText("Gender")).toBeInTheDocument();
    expect(screen.getByText("Male")).toBeInTheDocument();
    expect(screen.getByText("Female")).toBeInTheDocument();
    expect(screen.getByText("About me and my dog")).toBeInTheDocument();
    expect(screen.getByText("About me and my dog")).toBeInTheDocument();
    expect(screen.getByText("Profile Picture")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });
});
