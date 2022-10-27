import "../styles/globals.css";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />;
      <NotificationContainer />
    </div>
  );
}

export default MyApp;
