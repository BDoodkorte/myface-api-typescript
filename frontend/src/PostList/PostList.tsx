import React from "react";  // import React (to provide access to TSX)
import { useState, useEffect } from 'react'
import {PostModel} from '../../../src/models/api/postModel'
import {Page} from '../../../src/models/api/page'
import{BrowserRouter as Router, Routes,Route,Link} from 'react-router-dom';


export function PostList(){
    const [myData, setMyData] = useState<Page<PostModel> | null >(null);
    const [queryString, setQueryString] = useState<string | null>("/posts");

  

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
      {myData.results.map((post : PostModel) => {
          return (<li key={post.id}>
            {/* Show post message, imageurl, postedBy */}
            {post.message}
            {post.postedBy.name}
            <img src={post.imageUrl} />

          </li>
      )
          })}
      
      {dataNext}
      {dataPrevious}


    </ul>}
