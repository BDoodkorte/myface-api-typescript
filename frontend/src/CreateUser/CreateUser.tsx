import React from "react";  // import React (to provide access to TSX)
import { useState, useEffect, FormEvent, } from 'react'
import { UserModel } from '../../../src/models/api/userModel'
import { Page } from '../../../src/models/api/page'
import { BrowserRouter as Router, Routes, Route, Link, redirect } from 'react-router-dom';
import { isJSDocLinkLike } from "typescript";
import { createUser } from "../APIBackend/APIBackend";
import { useNavigate } from "react-router-dom";

export function CreateUser() {
    const [name, setName] = useState<string>("");
    const [userName, setuserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [profileImageUrl, setProfileImageUrl] = useState<string>("");
    const [coverImageUrl, setCoverImageUrl] = useState<string>("");
    const [error, setError] = useState<string>("");


    const navigate = useNavigate();

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        createUser(name, userName, email, profileImageUrl, coverImageUrl)
            .then(()=>  {    
                alert("Welcome to MyFace!")      
                navigate("/users")
            })
            .catch((e) => setError(e.message))


    }

    return (
        <div>
            <h1>Create User</h1>
            <p>{error}</p>
            <form onSubmit={(e) => {
                handleSubmit(e)
            }
            }>
                <label>
                    Name:
                    <input
                        type="text"
                         name="name"
                        onChange={event => setName(event.target.value)}
                    />
                </label>
                <br />
                <p></p>
                <label>
                    Username:
                    <input
                        type="text"
                         name="username"
                        onChange={event => setuserName(event.target.value)}
                    />
                </label>
                <br />
                <p></p>
                <label>
                    Email:
                    <input
                        type="email"
                         name="email"
                        onChange={event => setEmail(event.target.value)}
                    />
                </label>
                <br />
                <p></p>
                <label>
                    ProfileImageUrl:
                    <input
                        type="text"
                         name="profileImageUrl"
                        onChange={event => setProfileImageUrl(event.target.value)}
                    />
                </label>
                <br />
                <p></p>
                <label>
                    CoverImageUrl:
                    <input
                        type="text"
                        name="coverImageUrl"
                        onChange={event => setCoverImageUrl(event.target.value)}
                    />
                </label>
                <br />
                <p></p>
                <button type="submit">Submit</button>
            </form>
        </div>

    )
}

