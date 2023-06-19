import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import ErrorPage from './components/error/ErrorPage.tsx'
import PostsList from './components/posts/PostsList.tsx'
import ToDoList from './components/todo/ToDoList.tsx'
import UserList from './components/user/UserList.tsx'
import Root from './routes/root.tsx'
import UserDetails from './components/user/UserDetails.tsx'


const router = createBrowserRouter(
  [
    {
      path: '',
      element: <Navigate to='/posts' />,
    },
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: 'posts',
          element: <PostsList />,
        },
        {
          path: 'todo',
          element: <ToDoList />,
        },
        {
          path: 'users',
          element: <UserList />,
        },
        {
          path: 'users/:userId',
          element: <UserDetails />,
        },
      ],
    },
  ],
  { basename: '/react' }
);



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
