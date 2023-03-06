import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Profile.scss";



const FormField = props => {
  return (
    <div className="login field">
      <label className="login label">
        {props.label}
      </label>
      <input
        className="login input"
        placeholder={props.placeholder || "enter here ..."}
        defaultValue={props.defaultValue}
        value={props.value}
        disabled={props.disabled}
        onChange={e => props.onChange && props.onChange(e.target.value)}
        onBlur={e => props.onBlur && props.onBlur(e.target.value)}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  defaultValue: PropTypes.string
};

const Profile = () => {
  // use react-router-dom's hook to access the history
  const history = useHistory();

  // define a state variable (using the state hook).
  // if this variable changes, the component will re-render, but the variable will
  // keep its value throughout render cycles.
  // a component can have as many state variables as you like.
  // more information can be found under https://reactjs.org/docs/hooks-state.html
  const [user, setUser] = useState(null);
  const [editable, setEditable] = useState(true);
  const [editVisible, setEditVisible] = useState(true);
  // const [status, setStatus] = useState("OFFLINE");

  // const backout = () => {
  //   history.push('/game');
  // }

  const setUsername = (username) => {
    // user.username = username;
    setUser(user => ( // To update the state,"setUser" function is called with an updater function that take the previous value of "user" as its argument and returns a new value with "username" property set to the new value passed to "setUsername"
      {
        ...user, // the spread operator (...) to create a new object that copies all of the properties of the previous user object, but with the username property set to the new value.
        username: username
      }
    ));//when the setUser function is called with an updated username value, it returns a new user object with the previous property values and the updated username value. 
       //This new user object is then stored in the user state variable, replacing the previous user object.
  }

  const setBirthday = (birthday) => {
    // check
    // console.log(new Date(birthday).getDate())
    // console.log(birthday.substring(birthday.length - 2))
    // setTimeout(() => {
    //   console.log("run")
    // }, 5000);
    /*const isVaild = true;
    if (!isVaild) {
      alert("please Please enter the correct date format")
      // return;
    } else {
      const updatedUser = { ...user, birthday: birthday };
      setUser(updatedUser);
      
      // user.birthday = birthday;
      // setUser(user);*/
      const validFormat = /^\d{4}-\d{2}-\d{2}$/;
      const isValid = birthday === '' || validFormat.test(birthday);
    
      if (!isValid) {
        alert("Please enter the date in the format 'yyyy-mm-dd'");
        return;
      }
    
      const updatedUser = { ...user, birthday: birthday };
      setUser(updatedUser);
  }
  

  const save = async () => { //HTTP PUT is a request method used by clients to update resources on a server. It is used to update an existing resource on the server. In a PUT request, the client specifies the URI of the resource it wants to update and sends the updated representation of the resource in the request body. The server then updates the resource with the information provided in the request body.
    const userId = history.location.state;
    const birthday = user.birthday;
    const username = user.username;
    const requestBody = JSON.stringify({username, birthday});
    console.log(userId)
    const response = await api.put('/users/' + userId, requestBody);
    console.log(response)
    window.location.reload()
    // history.push('/profile', userId);
  }

  const timeFormat = (date) => {
    date = new Date(date);
    const year = date.getFullYear();
    const month = showTime(date.getMonth() + 1);
    const day = showTime(date.getDate());
    const hours = showTime(date.getHours()); 
    const minutes = showTime(date.getMinutes()); 
    const second = showTime(date.getSeconds());  
    const str = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + second
    return str;

  }

  const dateFormat = (date) => {
    if(!date) return date;
    date = new Date(date);
    const year = date.getFullYear();
    const month = showTime(date.getMonth() + 1);
    const day = showTime(date.getDate()); 
    const str = year + '-' + month + '-' + day
    return str;

  }

 const showTime = (t) => {
    return t > 10 ? t : '0' + t
  }


  // the effect hook can be used to react to change in your component.
  // in this case, the effect hook is only run once, the first time the component is mounted
  // this can be achieved by leaving the second argument an empty array.
  // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    async function fetchData() {
      try {
        const userId = history.location.state;
        const response = await api.get('/users/' + userId);

        const luserId = localStorage.getItem('userId');
        if (luserId === userId || luserId === userId + '') {
          setEditVisible(false);
          // setStatus("ONLINE");
        }

        // delays continuous execution of an async operation for 1 second.
        // This is just a fake async call, so that the spinner can be displayed
        // feel free to remove it :)
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Get the returned users and update the state.
        setUser(response.data);

        // This is just some data for you to see what is available.
        // Feel free to remove it.
      } catch (error) {
        console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
        console.error("Details:", error);
        alert("Something went wrong while fetching the users! See the console for details.");
      }
    }

    fetchData();
  }, []);

  let content = <Spinner/>;

  if (user) {
    content = (
      <div className="game">
        <FormField
          label="Username"
          defaultValue={user.username}
          disabled={editable}
          onBlur={un => setUsername(un)}
        />
        <FormField
          label="Birthday"
          defaultValue={dateFormat(user.birthday)}
          onBlur={un => setBirthday(un)}
          disabled={editable}
          placeholder="yyyy-MM-dd"
        />
        <FormField
          label="Status"
          value={user.status}
          disabled={true}
        />
        <FormField
          label="CreationDate"
          value={timeFormat(user.creation_date)}
          disabled={true}
        />
        <Button
          width="30%"
          style={{marginRight: 5}}
          onClick={() => history.push("/game")}
        >
          back
        </Button>
        <Button
          width="30%"
          style={{marginRight: 5}}
          disabled={!editable || editVisible}
          onClick={() => setEditable(false)}
        >
          edit
        </Button>
        <Button
          width="30%"
          disabled={editable}
          onClick={() => save()}
        >
          save
        </Button>
      </div>
    );
  }

  return (
    <BaseContainer className="profile container">
      <h2>User Profile</h2>
      {content}
    </BaseContainer>
  );
}
export default Profile;
