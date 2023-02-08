import { useState, useEffect } from 'react'
import './App.scss'
import { PostList } from './PostList/PostList'
import { UserList } from './UserList/UserList';
import { UserDetail } from './UserDetail/UserDetail';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CreateUser } from './CreateUser/CreateUser';
import { CreatePost } from './CreatePost/CreatePost';

function App() {


  return (

    <Router>
      <Routes>
        <Route path='/posts'
          element={<PostList />}
        />
        <Route path='/users/'
          element={<UserList />}
        />
        <Route path='/users/:userId/'
          element={<UserDetail />}
        />
        <Route path='/users/create'
          element={<CreateUser />}
        />
        <Route path='/posts/create'
          element={<CreatePost />}
        />      </Routes>
    </Router>

  );
}

export default App
/* <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div> */