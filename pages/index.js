import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Sidebar from "../components/Sidebar";
import { NotificationManager } from "react-notifications";
import Script from "next/script";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [images, setImages] = useState([]);
  const [documents, setDoc] = useState([]);
  const [videos, setVideos] = useState([]);
  const [audios, setAudio] = useState([]);
  const [others, setOthers] = useState([]);
  const [recent, setRecent] = useState([]);
  const [email, setEmail] = useState("");

  const wigRef = useRef();

  useEffect(() => {
    const user = localStorage.getItem("cloud-user");
    if (user === null) {
      window.location.href = "/login";
    }
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "josh4324",
        uploadPreset: "hq1e5jub",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          const typelist = result.info.secure_url.split(".");
          const len = typelist.length - 1;
          let type;
          if (
            typelist[len] === "jpeg" ||
            typelist[len] === "jpg" ||
            typelist[len] === "png" ||
            typelist[len] === "svg"
          ) {
            type = "image";
          } else if (
            typelist[len] === "mp4" ||
            typelist[len] === "mov" ||
            typelist[len] === "webm"
          ) {
            type = "video";
          } else if (
            typelist[len] === "pdf" ||
            typelist[len] === "dox" ||
            typelist[len] === "docx" ||
            typelist[len] === "xlx" ||
            typelist[len] === "xlxs" ||
            typelist[len] === "txt" ||
            typelist[len] === "ppt" ||
            typelist[len] === "ppts"
          ) {
            type = "documents";
          } else if (
            typelist[len] === "mp3" ||
            typelist[len] === "ma4" ||
            typelist[len] === "wav"
          ) {
            type = "audio";
          } else {
            type = "others";
          }

          const cred = {
            userid: localStorage.getItem("cloud-user"),
            name: result.info.original_filename,
            url: result.info.secure_url,
            type,
            date: new Date(),
          };

          const options = {
            method: "POST",
            body: JSON.stringify(cred),
          };

          (async () => {
            try {
              const response = await fetch("/api/upload", options);
              if (response) {
                NotificationManager.success(
                  "File uploaded successfully",
                  "Success"
                );
                window.location.href = "/";
              }
            } catch (err) {
              console.log(err);
            }
          })();
        }
      }
    );

    wigRef.current = myWidget;
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("cloud-user");
    const email = localStorage.getItem("cloud-email");
    setEmail(email);

    (async () => {
      try {
        const response = await fetch(`/api/files?search=${user}`);
        const data = await response.json();

        let images = [];
        let documents = [];
        let videos = [];
        let audios = [];
        let others = [];

        data.map((item) => {
          if (item.type === "image") {
            images.push(item);
          }
          if (item.type === "video") {
            videos.push(item);
          }
          if (item.type === "audio") {
            audios.push(item);
          }
          if (item.type === "documents") {
            documents.push(item);
          }
          if (item.type === "others") {
            others.push(item);
          }
        });

        setAudio(audios);
        setVideos(videos);
        setDoc(documents);
        setOthers(others);
        setImages(images);
        const recent = data.slice(0, 5);
        setRecent(recent);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const showWidget = () => {
    wigRef.current.open();
  };

  return (
    <div>
      <Head>
        <title>CloudDrop - Home</title>
        <meta name="description" content="Clouddrop" />
        {/*  eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          src="https://upload-widget.cloudinary.com/global/all.js"
          type="text/javascript"
        ></script>
      </Head>

      <div className={styles.homeflex}>
        <Sidebar />
        <div className={styles.home}>
          <div className={styles.cloud}>
            <h1 className={styles.homehead}>CloudDrop </h1>
            <h3 className={styles.homehead2}>{email}</h3>
          </div>

          <button type="button" onClick={showWidget} className={styles.upload}>
            Upload File
          </button>

          {recent.length > 0 ? (
            <div className={styles.box1}>
              <h3 className={styles.head}>Recent</h3>
              {recent.map((item) => {
                return (
                  <div className={styles.file} key={item.name}>
                    <a className={styles.home_text} href={`${item.url}`}>
                      {item.name}
                    </a>
                  </div>
                );
              })}
            </div>
          ) : null}

          {images.length > 0 ? (
            <div className={styles.box1}>
              <h3 className={styles.head}>Images</h3>
              {images.map((item) => {
                return (
                  <div className={styles.file} key={item.name}>
                    <a className={styles.home_text} href={`${item.url}`}>
                      {item.name}
                    </a>
                  </div>
                );
              })}
            </div>
          ) : null}

          {audios.length > 0 ? (
            <div className={styles.box1}>
              <h3 className={styles.head}>Audios</h3>
              {audios.map((item) => {
                return (
                  <div className={styles.file} key={item.name}>
                    <a className={styles.home_text} href={`${item.url}`}>
                      {item.name}
                    </a>
                  </div>
                );
              })}
            </div>
          ) : null}

          {videos.length > 0 ? (
            <div className={styles.box1}>
              <h3 className={styles.head}>Videos</h3>
              {videos.map((item) => {
                return (
                  <div className={styles.file} key={item.name}>
                    <a className={styles.home_text} href={`${item.url}`}>
                      {item.name}
                    </a>
                  </div>
                );
              })}
            </div>
          ) : null}

          {documents.length > 0 ? (
            <div className={styles.box1}>
              <h3 className={styles.head}>Documents</h3>
              {documents.map((item) => {
                return (
                  <div className={styles.file} key={item.name}>
                    <a className={styles.home_text} href={`${item.url}`}>
                      {item.name}
                    </a>
                  </div>
                );
              })}
            </div>
          ) : null}

          {others.length > 0 ? (
            <div className={styles.box1}>
              <h3 className={styles.head}>Others</h3>
              {others.map((item) => {
                return (
                  <div className={styles.file} key={item.name}>
                    <a className={styles.home_text} href={`${item.url}`}>
                      {item.name}
                    </a>
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
