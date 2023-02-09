import React from "react";  // import React (to provide access to TSX)
import { useState, useEffect } from 'react'
import { UserModel } from '../../../src/models/api/userModel'
import { Page } from '../../../src/models/api/page'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { MenuBar } from "../Menu/Menu";


export function UserList() {
  const [myData, setMyData] = useState<Page<UserModel> | null>(null);
  const [queryString, setQueryString] = useState<string | null>("/users");

  const navigate = useNavigate();


  let dataNext;
  let dataPrevious;

  useEffect(() => {
    fetch(`http://localhost:3001${queryString}`)
      .then(response => response.json())
      .then(data => setMyData(data))
      .then(data => console.log(data))
      .catch(data => console.log(data))
  }, [queryString]);

  if (!myData) {
    return <div>
      Waiting for data.
    </div>
  }

  if (myData.previous) {
    dataPrevious = <button className="buttons" onClick={() => setQueryString(myData.previous)}> Previous</button>
  }

  if (myData.next) {
    dataNext = <button className="buttons" onClick={() => setQueryString(myData.next)}> Next</button>
  }



  return (
    <div id="entirepage">
            <MenuBar />
      {/* <div className="navigationButtonGroup">
        <button type="button" className="navigationbutton" onClick={() => navigate("/posts")} >Post List</button>
        <button type="button" className="navigationbutton" onClick={() => navigate("/users/create")} >Create User</button>
        <button type="button" className="navigationbutton" onClick={() => navigate("/posts/create")} >Create Post</button>
      </div> */}
      <div id="userbody">
        <h1 id="userheading">
          Users
        </h1>
        <ul className="usercontainerGlobal">
          {myData.results.map((user: UserModel) => {
            return (
              <li className="usercontainer">
                <div className="containerImage">
                  <img id="usrimg" src={user.profileImageUrl} onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";
                  }} />
                </div>
                <div className="containerName">
                  <Link to={'/users/' + user.id}>{user.name}</Link>
                </div>
                <div className="containerEmail">
                  {user.email}
                </div>
              </li>
            )
          })}



        </ul>
        {dataPrevious}
        {dataNext}

      </div>
    </div>
  )
}
