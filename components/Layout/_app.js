import "../styles/globals.css";

import App from "next/app";
import Layout from "../components/Layout/Layout";
import "semantic-ui-css/semantic.min.css";
class MyApp extends App {
  render() {
    const { Components } = this.props;
    return (
      <Layout>
        <Components />
      </Layout>
    );
  }
}
// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

export default MyApp;
