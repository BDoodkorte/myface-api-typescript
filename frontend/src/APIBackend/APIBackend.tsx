import React from "react";  // import React (to provide access to TSX)
import { useState, useEffect } from 'react'
import { UserModel } from '../../../src/models/api/userModel'


export function createUser(name: string, username: string, email: string, profileImageUrl: string, coverImageUrl: string): Promise<Response> {

    const url = 'http://localhost:3001/users/create';

    const submitbody = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: name,
            username: username,
            email: email,
            profileImageUrl: profileImageUrl,
            coverImageUrl: coverImageUrl
        })

    }

    const response = fetch(url, submitbody)
        .then(fetchResponse => fetchResponse.json())
        .then(fetchResponse => {
            console.log(fetchResponse)
            if (!fetchResponse.ok) {
                let errorString = ""
                fetchResponse.errors.map((error : any) => {
                    errorString += ", " + error.param;
                })
                throw new Error(`Invalid entry: ${errorString}`);            }
            else {
                return fetchResponse;
            }
        })


    return response
}

export function createPost(message: string, imageUrl: string): Promise<Response> {

    const url = 'http://localhost:3001/posts/create';

    const submitbody = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            message: message,
            imageUrl: imageUrl,
        })

    }

    const response = fetch(url, submitbody)
        .then(fetchResponse => fetchResponse.json())
        .then(fetchResponse => {
            console.log(fetchResponse)
            if (!fetchResponse.ok) {
                let errorString = ""
                fetchResponse.errors.map((error : any) => {
                    errorString += ", " + error.param;
                })
                throw new Error(`Invalid entry: ${errorString}`);
            }
            else {
                return fetchResponse;
            }
        })

    return response
}

export function createLike(postId: number): Promise<Response> {

    const submitbody = {
        method: 'POST'

    }

    const url = `http://localhost:3001/posts/${postId}/like/`;

    const response = fetch(url, submitbody)
        .then(fetchResponse => {
            console.log(fetchResponse)
            if (!fetchResponse.ok) {
                alert("Help!");
                throw new Error("Invalid entry");
            }
            else {
                return fetchResponse;
            }
        })

    return response
}


export function createDislike(postId: number): Promise<Response> {


    const submitbody = {
        method: 'POST'
    }
    const url = `http://localhost:3001/posts/${postId}/dislike/`;

    const response = fetch(url, submitbody)
        .then(fetchResponse => {
            console.log(fetchResponse)
            if (!fetchResponse.ok) {
                alert("Help!");
                throw new Error("Invalid entry");
            }
            else {
                return fetchResponse;
            }
        })

    return response
}
