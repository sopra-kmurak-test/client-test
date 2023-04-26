import React, { useState, useEffect, useCallback } from "react";
import { api } from "helpers/api";
import { useHistory, useLocation } from "react-router-dom";
import { message } from "antd";
import { Button } from "../ui/Button";

function UserInfoPage() {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [canEditing, setCanEditing] = useState(false);
  const [tempUserInfo, setTempUserInfo] = useState({
    id: userInfo.id,
    username: userInfo.username,
    birthdate: userInfo.birthdate || "",
    status: userInfo.status,
    creationtime: userInfo.creationtime,
  });
  const location = useLocation();
  const currentUrl = location.pathname;
  // this.props.match.params.id
  let id1;
  id1 = currentUrl.slice(13);
  console.log("this.contexdsdt:", currentUrl.slice(13));
  // const {id1} = useParams();
  // const isDisabled = false;
  const handleEdit = () => {
    setTempUserInfo(userInfo);
    if (canEditing) {
      setIsEditing(true);
      // canEdit()
    }
  };

  const Back = async () => {
    history.push(`/UsersOverview`);
  };

  const handleSave = () => {
    //edit and save
    // let token;
    // token = localStorage.getItem('token')

    const requestBody = JSON.stringify({ tempUserInfo });
    console.log(requestBody);
    api
      .put(`/users/${id1}`, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .then((data) => {
        // const jsonData = JSON.parse(data);
        // if (data.status==null && data === ''){
        //     message.error(' data is null no finish.');
        // }else {
        console.log(data);
        // setUserInfo(jsonData);
        setUserInfo(tempUserInfo);
        setIsEditing(false);
        message.info(id1 + " User information has been modified.");
        history.push(`/Profilepage/${id1}`);

        // Do something with the jsonData object
      });

    // axios.post("/users/userinfo", tempUserInfo)
    //     .then(response => {
    //         setUserInfo(response.data);
    //         setIsEditing(false);
    //     })
    //     .catch(error => console.error(error));
  };
  const judge = useCallback(() => {
    let token;
    token = localStorage.getItem("token");
    const requestBody = JSON.stringify({ token });
    api
      .post("/users/userinfotokenname", { requestBody })
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .then((data) => {
        // const jsonData = JSON.parse(data);
        console.log(data.id.toString());
        // console.log(data)
        console.log("can edit" + data.id + id1 + data.id.toString() === id1);
        if (data.id.toString() === id1) {
          // handleEdit()
          console.log("front" + canEditing);
          setCanEditing(true);
          console.log("this" + canEditing);
        } else {
          setCanEditing(false);
          console.log("this" + canEditing);
        }

        return toString(data.id) === toString(id1);
      });
  }, [canEditing, id1]);

  const canEdit = useCallback(() => {
    // setTempUserInfo(userInfo);
    // if (isEditing){
    judge();
    // setIsEditing(true);
    // }
  }, [judge]);

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "birthdate") {
      const today = new Date();
      const selectedDate = new Date(value);

      if (selectedDate > today) {
        alert("Birthdate cannot be in the future");
        return;
      }
    }
    setTempUserInfo((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleChangename = (event) => {
    const { name, value } = event.target;
    // try{
    api
      .post("/users/editUsername", { value })
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .then((data) => {
        // const jsonData = JSON.parse(data);
        console.log(data);
        // setUserInfo(data);
        // Do something with the jsonData object
        if (data) {
          setTempUserInfo((prevState) => ({ ...prevState, [name]: value }));
          return true;
        } else {
          // setTempUserInfo(prevState => ({ ...prevState, [name]: value }));
          message.info(value + " can not use.");
          return false;
        }
      });

    // } catch(error){//这里意思是不可以改名字
    //
    // }
    // message.error(value+' can not use.');
  };

  // let token;
  // token = localStorage.getItem('token');

  // const requestBody = JSON.stringify({token});
  // api.post('/users/userinfo', requestBody).then(response => {
  //     console.log(response);
  //     return response.data;
  // }).then(data => {
  //     // const jsonData = JSON.parse(data);
  //     console.log(data);
  //     setUserInfo(data);
  //     // Do something with the jsonData object
  // });

  useEffect(() => {
    console.log(toString(id1));
    // params = {id}
    // const requestBody = JSON.stringify({token});
    api
      .get(`/users/${id1}`)
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .then((data) => {
        // const jsonData = JSON.parse(data);
        console.log(data);
        setUserInfo(data);

        // Do something with the jsonData object
      });
    canEdit();
  }, [canEdit, id1]);

  return (
    // console.log(toString({username}))
    <div>
      <h1>User Info Page</h1>
      <Button width="50%" onClick={() => Back()}>
        back
      </Button>
      {
        <div>
          {/*<span>Username:</span>*/}
          <label htmlFor="username">username:</label>
          {isEditing ? (
            <input
              type="text"
              name="username"
              value={tempUserInfo.username}
              onChange={handleChangename}
            />
          ) : (
            <span>{userInfo.username}</span>
          )}
        </div>
      }
      <div>
        <span>Online Status:</span>
        {/*<span>Creation Date:</span>*/}
        <span>{userInfo.status}</span>
        {/*{isEditing ? (*/}
        {/*    <select name="status" value={tempUserInfo.status} onChange={handleChange}>*/}
        {/*        <option value="ONLINE">Online</option>*/}
        {/*        <option value="OFFLINE">Offline</option>*/}
        {/*    </select>*/}
        {/*) : (*/}
        {/*    <span>{userInfo.status}</span>*/}
        {/*)}*/}
      </div>
      <div>
        <span>Creation Date:</span>
        <span>{userInfo.creationtime}</span>
      </div>
      <div>
        <span>Birth Date:</span>
        {isEditing ? (
          <input
            type="date"
            name="birthdate"
            value={tempUserInfo.birthdate}
            onChange={handleChange}
          />
        ) : (
          <span>{userInfo.birthdate}</span>
        )}
      </div>
      {isEditing ? (
        <div>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <button onClick={handleEdit} disabled={!canEditing}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

export default UserInfoPage;
