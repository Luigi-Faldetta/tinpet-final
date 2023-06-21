import { afterEach, describe, it, expect, vi } from "vitest";
import App from "../App";
import userEvent from "@testing-library/user-event";
import Home from "../pages/Home/Home";
import Onboarding from "../pages/Onboarding/Onboarding";
import { Routes, Route, BrowserRouter, MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AuthModal from "../components/AuthModal/AuthModal";

afterEach(() => {
  render(null);
});

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

describe("Home page", () => {
  test("renders the component correctly", () => {
    render(<Home />);
    expect(screen.getByText("TinPet")).toBeInTheDocument();
    expect(
      screen.getByText(/Your dog is lonely and has no friends/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Create Account/i })
    ).toBeInTheDocument();
  });
  test("opens the correct modal when the create account button is clicked", () => {
    render(<App></App>);
    fireEvent.click(screen.getByRole("button", { name: /Create Account/i }));
    expect(
      screen.getByPlaceholderText("confirm your password")
    ).toBeInTheDocument();
  });
  test("opens the correct modal when the log in button is clicked", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /Log In/i }));
    expect(screen.getByText("LOG IN")).toBeInTheDocument();
  });
  // test("redirects to onboarding when clicking submit on sign up", async () => {
  //   render(
  //     <App>
  //       <Home>
  //         <AuthModal isSignUp={isSignUp} />
  //       </Home>{" "}
  //     </App>
  //   );
  //   const user = userEvent.setup();
  //   fireEvent.click(screen.getByRole("button", { name: /Create Account/i }));
  //   fireEvent.change(screen.getByPlaceholderText("email"), {
  //     target: { value: "john@email.com" },
  //   });
  //   fireEvent.change(screen.getByPlaceholderText("password"), {
  //     target: { value: "123" },
  //   });
  //   fireEvent.change(screen.getByPlaceholderText("confirm your password"), {
  //     target: { value: "123" },
  //   });
  //   await user.click(screen.getByRole("button", { name: /Submit/i }));
  //   expect(isSignUp);
  //   fireEvent.click(screen.getByRole("button", { name: /Submit/i }));
  //   await screen.findByText("Your name");
  //   expect(isSignUp).toHaveBeenCalledWith(true);
  // });
  // test("redirects to onboarding when clicking submit on sign up", async () => {
  //   render(
  //     <MemoryRouter>
  //       <Routes>
  //         <Route path="/" element={<Home />} />
  //         <Route path="/onboarding" element={<Onboarding />} />
  //       </Routes>
  //     </MemoryRouter>
  //   );

  //   const user = userEvent.setup();

  //   fireEvent.click(screen.getByRole("button", { name: /Create Account/i }));
  //   fireEvent.change(screen.getByPlaceholderText("email"), {
  //     target: { value: "john@email.com" },
  //   });
  //   fireEvent.change(screen.getByPlaceholderText("password"), {
  //     target: { value: "123" },
  //   });
  //   fireEvent.change(screen.getByPlaceholderText("confirm your password"), {
  //     target: { value: "123" },
  //   });

  //   await user.click(screen.getByRole("button", { name: /Submit/i }));

  //   // Wait for the redirection to onboarding page
  //   await waitFor(() =>
  //     expect(screen.getByText("Your name")).toBeInTheDocument()
  //   );
  // });
});
