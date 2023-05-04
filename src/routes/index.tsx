import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../pages/layout/";
import Home from "../pages/home/";
import Login from "pages/login";
import Task from "pages/task";
import Add from "pages/add";
import AllTasks from "pages/task/AllTasks";
import Signup from "pages/signup";
import Profile from "pages/profile";

type Props = {};

export const PublicRoutes = (props: Props) => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/task/:id" element={<Task />} />
        <Route path="/add-task" element={<Add />} />
        <Route path="/tasks" element={<AllTasks />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
