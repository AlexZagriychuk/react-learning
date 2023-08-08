# Frontend of a simple Full Stack App
Interactive React App with Posts, Todos, and Users pages. Data fetched via API (Redux controls the state, RTK Query caches API responses to avoid redundant network load)

The Backend implementation can be found here: https://github.com/AlexZagriychuk/node-jsonplaceholder-clone  


## Technologies
Typescript, React, react-router, Redux Toolkit, Redux Toolkit Query, CSS


## Features
- Interactive React SPA with Posts, Todos, and Users pages
- Redux Toolkit controls the global state
- Data is fetched from the backend via API (RTK Query caches API requests and responses to avoid redundant network load)
- Users data is being used by all 3 pages (Posts, Todos, Users) without re-fetching
- An active user can be changed by clicking on the button at the top right corner (Todos data and Posts styles would be different based on the currently active user)
- New Post can be added
- When the ToDo items' completed checkbox is clicked: 
  - the UI is updated optimistically right away. 
  - API mutation is fired after a delay (debounce) to avoid sending multiple API requests for fast changes of the same ToDo item. This delay is separate for each ToDo item (if we change the completed state for different ToDo items very fast, all of them will correctly send API request after a delay)
  - If the ToDo item has not actually changed (even number of completed clicks) the API mutation request will not be fired. 
  - If the API mutation request has failed, the UI data and state will be rolled back
- On the Users page, we can click on a user and open detailed user information (with multiples tabs of content)