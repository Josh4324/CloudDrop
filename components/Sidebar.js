import styles from "./Sidebar.module.css";
import Link from "next/link";

export default function Sidebar() {
  const logout = () => {
    localStorage.removeItem("cloud-user");
    localStorage.removeItem("cloud-email");
    window.location.href = "/login";
  };
  return (
    <div className={styles.sidebar}>
      <Link className={styles.rm} href="/">
        <div className={styles.item}>Home</div>
      </Link>

      <Link href="/all" className={styles.rm}>
        <div className={styles.item}>All</div>
      </Link>

      <Link href="/files" className={styles.rm}>
        <div className={styles.item}>Documents</div>
      </Link>

      <Link href="/videos" className={styles.rm}>
        <div className={styles.item}>Videos</div>
      </Link>

      <Link href="/photos" className={styles.rm}>
        <div className={styles.item}>Photos</div>
      </Link>

      <div onClick={logout} className={styles.log}>
        Logout
      </div>
    </div>
  );
}
