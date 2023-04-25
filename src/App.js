// import Header from "components/views/Header";
import AppRouter from "components/routing/routers/AppRouter";
import "styles/globals.scss"
import Layout from "components/views/components/layout.js";
/**
 * Happy coding!
 * React Template by Lucas Pelloni
 * Overhauled by Kyrill Hux
 */
const App = () => {
  return (
    <div>
      {/*<Header height="100"/>*/}
      <AppRouter/>
    </div>
  );
};

export default App;
