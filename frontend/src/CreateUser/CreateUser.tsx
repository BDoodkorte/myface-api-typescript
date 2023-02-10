import React from "react";  // import React (to provide access to TSX)
import { useState, useEffect, FormEvent, } from 'react'
import { UserModel } from '../../../src/models/api/userModel'
import { Page } from '../../../src/models/api/page'
import { BrowserRouter as Router, Routes, Route, Link, redirect } from 'react-router-dom';
import { isJSDocLinkLike } from "typescript";
import { createUser } from "../APIBackend/APIBackend";
import { useNavigate } from "react-router-dom";
import { MenuBar } from "../Menu/Menu";

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
            .then(() => {
                alert("Welcome to MyFace!")
                navigate("/users")
            })
            .catch((e) => setError(e.message))


    }

    return (
        <div>

            {/* <div className="navigationButtonGroup">
                <button type="button" className="navigationbutton" onClick={() => navigate("/users")} >Users List</button>
                <button type="button" className="navigationbutton" onClick={() => navigate("/posts")} >Post List</button>
                <button type="button" className="navigationbutton" onClick={() => navigate("/posts/create")} >Create Post</button>
            </div> */}
            <h1>Create User</h1>
            <p>{error}</p>
            <form className="create-user-form" onSubmit={(e) => {
                handleSubmit(e)
            }
            }>
                <label>
                    Name:
                </label>
                <input className="create-user-input "
                    type="text"
                    name="name"
                    onChange={event => setName(event.target.value)}
                />

                <br />
                <p></p>
                <label>
                    Username:
                </label>
                <input className="create-user-input "
                    type="text"
                    name="username"
                    onChange={event => setuserName(event.target.value)}
                />

                <br />
                <p></p>
                <label>
                    Email:
                </label>
                <input className="create-user-input "
                    type="email"
                    name="email"
                    onChange={event => setEmail(event.target.value)}
                />

                <br />
                <p></p>
                <label >
                    ProfileImageUrl:
                </label>
                <input className="create-user-input "
                    type="text"
                    name="profileImageUrl"
                    onChange={event => setProfileImageUrl(event.target.value)}
                />

                <br />
                <p></p>
                <label>
                    CoverImageUrl:
                </label>
                <input className="create-user-input "
                    type="text"
                    name="coverImageUrl"
                    onChange={event => setCoverImageUrl(event.target.value)}
                />

                <br />
                <p></p>
                <button className="create-user-submit" type="submit">Submit</button>
            </form>
        </div>

    )
}

