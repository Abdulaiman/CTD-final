import React from "react";
import Nav from "./components/navigation/nav";
import BlogTitle from "./components/blog-title/blog-title";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import SignUpForm from "./components/sign-up/sign-up";
import BlogPage from "./components/blog-page/blog-page";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Nav /> <BlogTitle />
          </>
        }
      />
      <Route
        path="/my-blogs"
        element={
          <>
            <Nav /> <BlogTitle />
          </>
        }
      />
      <Route
        path="/blog-page"
        element={
          <>
            <Nav />
            <BlogPage />
          </>
        }
      />
      <Route
        path="/login"
        element={
          <>
            <Login />
          </>
        }
      />
      <Route
        path="/sign-up"
        element={
          <>
            <SignUpForm />
          </>
        }
      />
    </Routes>
  );
}

export default App;
