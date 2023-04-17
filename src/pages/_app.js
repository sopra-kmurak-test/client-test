import "@/styles/globals.less";
import Layout from "@/components/ui/layout";
import { Provider } from "react-redux";
import store from "@/components/ui/store";

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
