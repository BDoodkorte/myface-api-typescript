import React from "react";  // import React (to provide access to TSX)
import { useState, useEffect } from 'react'
import { UserModel, UserPostModel } from '../../../src/models/api/userModel'
import { Page } from '../../../src/models/api/page'
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';



export function UserDetail() {
  const [myData, setMyData] = useState<UserModel | null>(null);

  let { userId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3001/users/${userId}`)
      .then(response => response.json())
      .catch(response => console.log(response))
      .then(data => setMyData(data))
      .then(data => console.log(data))
      .catch(data => console.log(data))
  }, [userId]);

  if (!myData) {
    return <div>
      Waiting for data.
    </div>
  }


  return (
    <div className="userprofile" >

      <img className="userprofilecoverimg" id="coverimg" src={myData.coverImageUrl} alt="Cover Image" />
      <img id="userprofileimage" src={myData.profileImageUrl} alt="Profile Image" onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";
              }}/>
      <div id="userinfo">
        <h3>
          {myData.name}
        </h3>
        <p>
          <b>
            {myData.username}
          </b>
        </p>
        <p>
          {myData.email}
        </p>

      </div>


      <h1 className="userposts">User posts</h1>
      <ul className="ouruserposts">
        {myData.posts.map((post: UserPostModel) => {
          return (<li className="specificposts">
            <img id="userpostimg" src={post.imageUrl} onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";
              }}/>
            <div id="postUserName">
              {myData.username}
            </div>
            <div id="userpostdate">
              {post.createdAt.toLocaleString()}
            </div>
            <div id="userpostmessage">
              {post.message}
            </div>
          </li>
          )
        })}
      </ul>

      <h1 className="userlikedposts">Liked posts</h1>
      <ul className="ouruserlikes">
        {myData.likes.map((like: UserPostModel) => {
          return (<li className="specificposts" >
            <img id="userpostimg" src={like.imageUrl} onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";
              }}/>
            <div id="postUserName">
              <Link to={`/users/${like.id}`}> {like.id}</Link>
            </div>
            <div id="userpostdate">
              {like.createdAt.toLocaleString()}
            </div>
            <div id="userpostmessage">
              {like.message}
            </div>
          </li>
          )
        })}
      </ul>

      <h1 className="userdislikedposts">Disliked posts</h1>
      <ul className="ouruserdislikes">
        {myData.dislikes.map((dislike: UserPostModel) => {
          return (<li className="specificposts">
            <img id="userpostimg" src={dislike.imageUrl} onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";
              }}/>
            <div id="postUserName">
              <Link to={`/users/${dislike.id}`}> {dislike.id}</Link>
            </div>
            <div id="userpostdate">
              {dislike.createdAt.toLocaleString()}
            </div>
            <div id="userpostmessage">
              {dislike.message}
            </div>
          </li>
          )
        })}
      </ul>
    </div>
  )
}