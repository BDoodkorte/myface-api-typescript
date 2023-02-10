import React from "react";  // import React (to provide access to TSX)
import { useState, useEffect, FormEvent } from 'react'
import { PostModel } from '../../../src/models/api/postModel'
import { Page } from '../../../src/models/api/page'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { createLike } from "../APIBackend/APIBackend";
import { createDislike } from "../APIBackend/APIBackend";
import { MenuBar } from "../Menu/Menu";

export function PostList() {
  const [myData, setMyData] = useState<Page<PostModel> | null>(null);
  const [queryString, setQueryString] = useState<string | null>("/posts");
  const [postId, setPostId] = useState<number>(0);
  const [likeError, setLikeError] = useState<string>("");
  const [dislikeError, setDislikeError] = useState<string>("");

  const navigate = useNavigate();

  let dataNext;
  let dataPrevious;

  function handleSubmitLike(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    createLike(postId)
      .then(() => {
        alert(`Thank you for liking post nr ${postId}!`)
      })
      .catch((e) => setLikeError(e.message))
  }

  function handleSubmitDislike(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    createDislike(postId)
      .then(() => {
        alert(`Thank you for disliking post nr ${postId}!`)
      })
      .catch((e) => setDislikeError(e.message))
  }



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

      {/* <div className="navigationButtonGroup">
        <button type="button" className="navigationbutton" onClick={() => navigate("/users")} >Users List</button>
        <button type="button" className="navigationbutton" onClick={() => navigate("/users/create")} >Create User</button>
        <button type="button" className="navigationbutton" onClick={() => navigate("/posts/create")} >Create Post</button>
      </div> */}
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
              {(post.id.toString() === likeError) ? 
              <p>You can only like post {likeError} once</p> 
              : 
              <></>
            }
              {(post.id.toString() === dislikeError) ? 
              <p>You can only dislike post {dislikeError} once</p> 
              : 
              <></>
            }

              <form className="buttonform" onSubmit={(e) => handleSubmitLike(e)}>
                <button type="submit" className="likebutton" onClick={() => setPostId(post.id)} >Like</button>
              </form>
              <form className="buttonform" onSubmit={(e) => handleSubmitDislike(e)}>
                <button type="submit" className="dislikebutton" onClick={() => setPostId(post.id)} >Dislike</button>
              </form>

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
