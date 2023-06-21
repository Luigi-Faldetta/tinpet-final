import { afterEach, describe, it, expect, vi } from "vitest";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Dashboard from "../pages/Dashboard/Dashboard";

afterEach(() => {
  render(null);
});

describe("Dashboard page", () => {
  test("renders the component correctly", () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    );
  });
});
