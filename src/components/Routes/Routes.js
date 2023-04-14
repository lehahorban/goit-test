import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Home from "../Home/Home";
import UserCard from "../UserCard/UserCard";

const RoutesApp = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/tweets" element={<UserCard />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default RoutesApp;
