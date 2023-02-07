import React from "react";  // import React (to provide access to TSX)
import { useState, useEffect } from 'react'
import { PostModel } from '../../../src/models/api/postModel'
import { Page } from '../../../src/models/api/page'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


export function PostList() {
  const [myData, setMyData] = useState<Page<PostModel> | null>(null);
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

  if (!myData) {
    return <div>
      Waiting for data.
    </div>
  }


  if (myData.next) {
    dataNext = <button className="buttons" onClick={() => setQueryString(myData.next)}> Next</button>
  }

  if (myData.previous) {
    dataPrevious = <button className="buttons" onClick={() => setQueryString(myData.previous)}> Previous</button>
  }

  return (
    <div id="entirepage">
      <div id="postbody">
        <h1 >
          Posts
        </h1>
        <ul id="postlist" className="container">
          {myData.results.map((post: PostModel) => {
            return (<li className="individualpostlist">
              <img src={post.imageUrl} onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";
              }} />
              <p> {post.message}</p>
              <p>
                <Link to={'/users/' + post.postedBy.id}>{post.postedBy.name}</Link>
              </p>


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
