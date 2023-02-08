import React from "react";  // import React (to provide access to TSX)
import { useState, useEffect, FormEvent,} from 'react'
import { UserModel } from '../../../src/models/api/userModel'
import { Page } from '../../../src/models/api/page'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { isJSDocLinkLike } from "typescript";
import { createPost } from "../APIBackend/APIBackend";

export function CreatePost() {
    const [message, setMessage] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");

    const navigate = useNavigate();
    


    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        createPost(message, imageUrl)
        .then(()=>  {    
            alert("Thank you for submitting a post!")      
            navigate("/posts")
        })
        .catch((error) => {
            console.log("Oh no, it went wrong", error)
        })
    }

    return (
        <div>
            <h1>Create Post</h1>
            <form onSubmit={(e) => {
                handleSubmit(e)
                }}>
                <label>
                    Message:
                    <input
                        type="text"
                        required name="message"
                        onChange={event => setMessage(event.target.value)}
                    />
                </label>
                <br />
                <p></p>
                <label>
                    Image URL:
                    <input
                        type="text"
                        required name="imageUrl"
                        onChange={event => setImageUrl(event.target.value)}
                    />
                </label>
                <br />
                <p></p>
                <button type="submit">Submit</button>
            </form>
        </div>

    )
}



