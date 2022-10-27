import React, { useState, useRef } from "react";
import bcrypt from "bcryptjs";
import { NotificationManager } from "react-notifications";
import Router from "next/router";
import Link from "next/link";

export default function Signup({ data }) {
  const emailRef = useRef();
  const passwordRef = useRef();

  const sub = () => {
    const hashedPassword = bcrypt.hashSync(
      passwordRef.current.value,
      process.env.salt
    );
    const cred = {
      email: emailRef.current.value,
      password: hashedPassword,
    };

    const options = {
      method: "POST",
      body: JSON.stringify(cred),
    };

    fetch("/api/signup", options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response) {
          localStorage.setItem("cloud-user", response.id);
          localStorage.setItem("cloud-email", emailRef.current.value);
          NotificationManager.success("Signup was successfully", "Success");
          window.location.href = "/";
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <div className="form">
        <h2>Signup</h2>
        <div>
          <input className="input" ref={emailRef} placeholder="Enter Email" />
        </div>

        <div>
          <input
            className="input"
            type="password"
            ref={passwordRef}
            placeholder="Enter Password"
          />
        </div>

        <div>
          {/*   eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <Link href="/login">Login</Link>
        </div>

        <button className="but" onClick={sub}>
          Signup
        </button>
      </div>
    </div>
  );
}
