import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Sidebar from "../components/Sidebar";

export default function All() {
  const [all, setAll] = useState([]);
  useEffect(() => {
    const user = localStorage.getItem("cloud-user");
    if (user === null) {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("cloud-user");

    fetch(`/api/files?search=${user}`)
      .then((response) => response.json())
      .then((response) => {
        setAll(response);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div>
      <Head>
        <title>CloudDrop</title>
        <meta name="description" content="Clouddrop" />
      </Head>
      <div className={styles.homeflex}>
        <Sidebar />
        <div className={styles.home}>
          <h1 className={styles.homehead}>CloudDrop</h1>

          {all.length > 0 ? (
            <div className={styles.box1}>
              {all.map((item) => {
                return (
                  <div className={styles.file} key={item.name}>
                    <a href={`${item.url}`}>{item.name}</a>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
