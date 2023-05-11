import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../Pages/Homepage";
import List from "../Pages/List";
import Track from "../Pages/Track";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/list" element={<List />} />
        <Route path="/track" element={<Track />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
