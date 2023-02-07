import React from "react";  // import React (to provide access to TSX)
import { useState, useEffect } from 'react'
import {UserModel} from '../../../src/models/api/userModel'
import {Page} from '../../../src/models/api/page'
import{BrowserRouter as Router, Routes,Route,Link} from 'react-router-dom';


export function UserList(){
    const [myData, setMyData] = useState<Page<UserModel> | null >(null);
    const [queryString, setQueryString] = useState<string | null>("/users");

  

    let dataNext;
    let dataPrevious;

    useEffect(() => {
        fetch(`http://localhost:3001${queryString}`)
        .then(response => response.json())
        .then(data => setMyData(data))
        .then(data => console.log(data))
        .catch(data => console.log(data))
      }, [queryString]);

    if(!myData){
      return <div>
        Waiting for data. 
      </div>
    }


    if(myData.next){
    dataNext = <button onClick={()=>setQueryString(myData.next)}> Next</button>
    }

    if(myData.previous){
    dataPrevious = <button onClick={()=>setQueryString(myData.previous)}> Previous</button>  
    }

    return <ul>
      {myData.results.map((user : UserModel) => {
          return (<li key={user.id}>
            {/* Show post message, imageurl, postedBy */}
            {user.id}
            <Link to={'/users/' + user.id}>{user.name}</Link>
            <img src={user.profileImageUrl} />

          </li>
      )
          })}
      
      {dataNext}
      {dataPrevious}


    </ul>}
