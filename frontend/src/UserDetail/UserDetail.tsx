import React from "react";  // import React (to provide access to TSX)
import { useState, useEffect } from 'react'
import {UserModel} from '../../../src/models/api/userModel'
import {Page} from '../../../src/models/api/page'
import{BrowserRouter as Router, Routes,Route,Link} from 'react-router-dom';



export function UserDetail(){
    const [myData, setMyData] = useState<UserModel | null >(null);

    useEffect(() => {
        fetch(`http://localhost:3001/users/2`)
        .then(response => response.json())
        .catch(response => console.log(response))
        .then(data => setMyData(data))
        .then(data => console.log(data))
        .catch(data => console.log(data))
      }, []);

      if(!myData){
        return <div>
          Waiting for data. 
        </div>
      }


return <div>

 
          <li>
            {myData.name}
            <img src={myData.profileImageUrl} />

          </li>
   
</div>

}