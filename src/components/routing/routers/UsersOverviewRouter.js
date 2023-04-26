import {Redirect, Route} from "react-router-dom";
import UsersOverview from "components/views/UsersOverview";
import PropTypes from 'prop-types';

const UsersOverviewRouter = props => {
    /**
     * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
     */
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <Route exact path={`${props.base}`}>
                <UsersOverview/>
            </Route>
            <Route exact path={`${props.base}`}>
                <Redirect to={`${props.base}`}/>
            </Route>
        </div>
    );
};
/*
* Don't forget to export your component!
 */

UsersOverviewRouter.propTypes = {
    base: PropTypes.string
}

export default UsersOverviewRouter;
