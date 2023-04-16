import "@/styles/globals.less";
import Layout from "@/layout";
import { Provider } from "react-redux";
import store from "@/store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
