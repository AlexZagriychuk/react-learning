import { Navigate, createBrowserRouter } from "react-router-dom";
import Root from "../components/RootTMP";
import ErrorPage from "../components/error/ErrorPage";
import PostsList from "../components/posts/PostsList";
import ToDoList from "../components/todo/ToDoList";
import UserList from "../components/user/UserList";
import UserDetails from "../components/user/UserDetails";

export const router = createBrowserRouter(
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
                }
            ],
        },
    ],
    { basename: '/react' }
);