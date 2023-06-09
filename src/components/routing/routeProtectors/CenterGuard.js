import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";

/**
 *
 * Another way to export directly your functional component.
 */
export const CenterGuard = props => {
    if (!localStorage.getItem("token")) {
        return props.children;
    }
    // if user is already logged in, redirects to the main /app
    return <Redirect to="/UsersOverview"/>;
};

CenterGuard.propTypes = {
    children: PropTypes.node
}