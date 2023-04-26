import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {GameGuard} from "components/routing/routeProtectors/GameGuard";
import GameRouter from "components/routing/routers/GameRouter";
import {UsersOverviewGuard} from "components/routing/routeProtectors/UsersOverviewGuard";
import UsersOverviewRouter from "components/routing/routers/UsersOverviewRouter";
import {ProfilepageGuard} from "components/routing/routeProtectors/ProfilepageGuard";
// import ProfilepageRouter from "components/routing/routers/ProfilepageRouter";
import {LoginGuard} from "components/routing/routeProtectors/LoginGuard";
import {RegisterGuard} from "components/routing/routeProtectors/RegisterGuard";
import {IndexGuard} from "components/routing/routeProtectors/IndexGuard";
import {SearchGuard} from "components/routing/routeProtectors/SearchGuard";
import Login from "components/views/Login";
import Register from "components/views/Register"
import UserInfo from "components/views/Profilepage";
import Index from "components/views/Index";
import Search from "components/views/Search";

import {CenterGuard} from "../routeProtectors/CenterGuard";
import Center from "../../views/Center";
import {QuestionGuard} from "../routeProtectors/QuestionGuard";
import QuestionDetail from "../../views/Question/[id].js";
import Create from "../../views/Question/Create.js";
import Answer from "../../views/Question/[id]/answer";
import AnswerComments from "../../views/Question/answer/[id]";
// import { BrowserRouter } from "react-router-dom";
/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
          <Route path="/question/create"  >
              <QuestionGuard>
                  <Create />
              </QuestionGuard>
          </Route>

          <Route path="/question/:id/answer" component={Answer} >
              <QuestionGuard>
                  <Answer/>
              </QuestionGuard>
          </Route>
          <Route path="/question/answer/:id" component={AnswerComments} >
              <QuestionGuard>
                  <AnswerComments/>
              </QuestionGuard>
          </Route>
          <Route path="/question/:id" component={QuestionDetail} >
              <QuestionGuard>
                  <QuestionDetail/>
              </QuestionGuard>
          </Route>


          <Route exact path="/login">
          <LoginGuard>
            <Login />
          </LoginGuard>
        </Route>
        <Route exact path="/register">
          <RegisterGuard>
            <Register />
          </RegisterGuard>
        </Route>
        <Route exact path="/index">
          <IndexGuard>
            <Index />
          </IndexGuard>
        </Route>
        <Route exact path="/chat">
          <ChatGuard>
            <Chat />
          </ChatGuard>
        </Route>
        <Route exact path="/center">
          <CenterGuard>
            <Center />
          </CenterGuard>
        </Route>
         <Route exact path="/search">
            <SearchGuard>
              <Search />
             </SearchGuard>
          </Route>
        <Route exact path="/">
          <Redirect to="/index"/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

/*
* Don't forget to export your component!
 */
export default AppRouter;
