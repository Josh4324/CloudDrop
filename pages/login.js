import React, { useState, useRef } from "react";
import bcrypt from "bcryptjs";
import { NotificationManager } from "react-notifications";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const sub = () => {
    const options = {
      method: "POST",
      body: JSON.stringify({ email: emailRef.current.value }),
    };

    fetch("/api/login", options)
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          bcrypt.compare(
            passwordRef.current.value,
            response[0].password,
            function (err, res) {
              if (res === true) {
                NotificationManager.success(
                  "Login was successfully",
                  "Success"
                );
                localStorage.setItem("cloud-user", response[0].id);
                window.location.href = "/";
              } else {
                NotificationManager.error("Wrong email or password", "Error");
              }
            }
          );
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <div className="form">
        <h2>Login</h2>
        <div>
          <input className="input" ref={emailRef} placeholder="Enter Email" />
        </div>

        <div>
          <input
            className="input"
            ref={passwordRef}
            placeholder="Enter Password"
            type="password"
          />
        </div>

        <div>
          <a href="/signup">Signup</a>
        </div>

        <button className="but" onClick={sub}>
          Login
        </button>
      </div>
    </div>
  );
}
