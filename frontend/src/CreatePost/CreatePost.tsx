import React from "react";  // import React (to provide access to TSX)
import { useState, useEffect, FormEvent, } from 'react'
import { UserModel } from '../../../src/models/api/userModel'
import { Page } from '../../../src/models/api/page'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { isJSDocLinkLike } from "typescript";
import { createPost } from "../APIBackend/APIBackend";
import { MenuBar } from "../Menu/Menu";



export function CreatePost() {
    const [message, setMessage] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();



    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        createPost(message, imageUrl)
            .then(() => {
                alert("Thank you for submitting a post!")
                navigate("/posts")
            })
            .catch((e) => setError(e.message))
    }


    return (
        <div id="entirepage">
                  <MenuBar />
            {/* <div className="navigationButtonGroup">
                <button type="button" className="navigationbutton" onClick={() => navigate("/users")} >Users List</button>
                <button type="button" className="navigationbutton" onClick={() => navigate("/users/create")} >Create User</button>
                <button type="button" className="navigationbutton" onClick={() => navigate("/posts")} >Post List</button>
            </div> */}
            <h1>Create Post</h1>
            <p>{error}</p>
            <div className="formBox">
            <form className="create-user-form" onSubmit={(e) => {
                handleSubmit(e)
            }}>
                <label>
                    Message:
                    </label>
                    <input className="create-user-input"
                        type="text"
                        name="message"
                        onChange={event => setMessage(event.target.value)}
                    />
                
                <br />
                <p></p>
                <label>
                    Image URL:
                    </label>
                    <input className="create-user-input"
                        type="text"
                        name="imageUrl"
                        onChange={event => setImageUrl(event.target.value)}
                    />
                
                <br />
                <p></p>
                <button className="create-user-submit" type="submit">Submit</button>
            </form>
            </div>
        </div>

    )
}



