import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./app/Home";
import BbsWrite from "./bbs/BbsWrite";
import BbsList from "./bbs/BbsList";
import BbsDetail from "./bbs/BbsDetail";
import BbsUpdate from "./bbs/BbsUpdate";
import Join from "./member/Join";
import Login from "./member/Login";
import Logout from "./member/Logout";

export default function Router() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/bbswrite" element={<BbsWrite />} />
        <Route path="/bbslist" element={<BbsList />} />
        <Route path="/bbsdetail/:seq" element={<BbsDetail />}></Route>
        <Route path="/bbsUpdate" element={<BbsUpdate />} />

        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/logout" element={<Logout />}></Route>
      </Routes>
    </div>
  );
}
