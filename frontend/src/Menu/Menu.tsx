import React from "react";  // import React (to provide access to TSX)
import { useState, useEffect, FormEvent } from 'react'
import { PostModel } from '../../../src/models/api/postModel'
import { Page } from '../../../src/models/api/page'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { createLike } from "../APIBackend/APIBackend";
import { createDislike } from "../APIBackend/APIBackend";

export function MenuBar() {


    return (

        <div>
            <button id="menu-button">&#x2630</button>
            <nav id="ourmenuoptions" className="menuoptionnone">
                <button id="close-button">x</button><br />
                <div id="menuMyFace"> MyFace </div> <br />
                <Link id="menuPosts" to="/posts">Posts</Link> <br />
                <Link id="menuUsers" to="/users">Users</Link> <br />
                <Link id="menuNewPosts" to="/posts/create"> + New Post </Link>
                <Link id="menuNewUsers" to="/users/create"> + New User </Link>
            </nav>
            <nav id="ourmenuoptions" className="menuoptionpc">
                <button id="close-button">x</button>
                <div id="menuMyFace"> MyFace </div>
                <Link id="menuPosts" to="/posts">Posts</Link>
                <Link id="menuUsers" to="/users">Users</Link>
                <Link id="menuNewPosts" to="/posts/create">+ New Post </Link>
                <Link id="menuNewUsers" to="/users/create">+ New User </Link>
            </nav>
        </div>

    )
}