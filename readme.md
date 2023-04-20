# Blogger

Blogger is a full-stack web application that allows users to create and share blog posts. It is built with React, Node, Express and Mongoose.

## Features

- User authentication and registration with JWT
- Post creation, editing and deletion with CRUD operations
- Comment creation, editing and deletion with CRUD operations
- Markdown support for posts and comments with React Markdown
- Error handling with custom error messages

## Sign up page

<img src="./web-cap/Signup.png" alt="Sign up" title="Sign up page">

- Sign up with email, name and password
- you should enter a valid email address
- you should enter a strong password
- you should enter all fields

## Home page

<img src="./web-cap/Home.png" alt="Blogs list" title="Home page">

- List of all posts with their title, date of creation and number of comments
- Click on the title of the post to see the post detail page

## Create blog page

<img src="./web-cap/AddBlog.png" alt="Add blog" title="Create Blog">

- Create a new blog with title and body
- you should enter all fields
- White space is not allowed in any field
- markdown syntax is supported
- preview your blog before publishing

## Blog detail page

<img src="./web-cap/BlogPreview.png" alt="Blog detail" title="Blog Preview">

- Title, author, date of creation, number of comments and content
- Click on the author to see his profile page
- Click on the "Add Comment" button to add a comment

<img src="./web-cap/AddComment.png" width="200" height="100" alt="Add Comment" title="Add Comment">

- Click on the "Delete" button to delete the post if you are the author

<img src="./web-cap/DeleteBlog.png" width="200" height="100" alt="Delete Blog" title="Delete Blog">

## Profile page

- List of all posts with their title, date of creation and number of comments
- Click on the title of the post to see the post detail page
- List of all comments with their date of creation and content

## List of users page

<img src="./web-cap/ListOfUsers.png" alt="List of users" title="List of users">

- List of all users with their email address and name and the date of registration
- Click on the name of the user to see his profile page

## User profile page

<img src="./web-cap/UserPage.png" alt="User page" title="User page">

- Name, email address, date of registration and list of all posts with their title, date of creation and number of comments
- Click on the title of the post to see the post detail page

## Login page

<img src="./web-cap/Login.png" alt="Login" title="Login">

- Login with email and password
- you should enter a valid email address
- you should enter all fields

## Not found page

<img src="./web-cap/NotFound.png" alt="Login" title="Login">

- If you enter a wrong url, you will be redirected to this page

## Usage

To use Blogger, you need to register an account or log in with an existing one.

Once logged in, you can create a new blog by clicking on the "New Blog" button on the navbar. You can delete your own blogs by clicking on the corresponding button on the blog detail page.

You can also comment on any blog by clicking on the "Add Comment" button on the blog detail page.

You can see your profile page by clicking on your name on the navbar. You can see the list of all users by clicking on the "Users" button on the navbar.

You can use Markdown syntax to format your posts and comments. For example, you can use `**bold**` for bold text, `*italic*` for italic text, `# Heading` for headings, etc. You can find more information about Markdown here: https://www.markdownguide.org/basic-syntax/

## Installation

npm install

run frontend :

- cd frontend
- npm start

run backend :

- cd backend
- npm start
