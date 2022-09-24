import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header className="py-4">
        <div className="container text-center">
          <Link to="/">
            <h1>제언 관리 시스템</h1>
          </Link>
        </div>
      </header>
    </>
  );
}
