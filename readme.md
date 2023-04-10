# Blogger

Blogger is a full-stack web application that allows users to create and share blog posts. It is built with React, Node, Express and Mongoose.

## Features

- User authentication and registration with JWT
- Post creation, editing and deletion with CRUD operations
- Comment creation, editing and deletion with CRUD operations
- Image upload and display with Cloudinary
- Markdown support for posts and comments with React Markdown
- Pagination for posts and comments with React Paginate
- Responsive design with Bootstrap

## Screenshots

![Home page](https://res.cloudinary.com/bardala/image/upload/v1639586939/blogger/home.png)
![Post detail page](https://res.cloudinary.com/bardala/image/upload/v1639586939/blogger/post.png)
![New post page](https://res.cloudinary.com/bardala/image/upload/v1639586939/blogger/new.png)
![Edit post page](https://res.cloudinary.com/bardala/image/upload/v1639586939/blogger/edit.png)

## Installation

To run Blogger locally, you need to have Node.js and MongoDB installed on your system. Then follow these steps:

1. Clone this repo: `git clone https://github.com/Bardala/Blogger.git`
2. Navigate to the project directory: `cd Blogger`
3. Install the dependencies for the server: `npm install`
4. Install the dependencies for the client: `cd client && npm install`
5. Create a .env file in the root directory and add the following variables:
    - PORT: the port number for the server (e.g. 5000)
    - MONGO_URI: the connection string for MongoDB (e.g. mongodb://localhost:27017/blogger)
    - JWT_SECRET: a secret key for generating JWT tokens (e.g. abc123)
    - CLOUD_NAME: the name of your Cloudinary account (e.g. bardala)
    - CLOUD_API_KEY: the API key for your Cloudinary account (e.g. 1234567890)
    - CLOUD_API_SECRET: the API secret for your Cloudinary account (e.g. xyz789)
6. Start the server: `npm run dev`
7. Start the client: `cd client && npm start`
8. Open your browser and go to http://localhost:3000

## Usage

To use Blogger, you need to register an account or log in with an existing one.

Once logged in, you can create a new post by clicking on the "New Post" button on the navbar. You can edit or delete your own posts by clicking on the corresponding buttons on the post detail page.

You can also comment on any post by filling out the form at the bottom of the post detail page. You can edit or delete your own comments by clicking on the corresponding buttons on the comment.

You can upload an image for your post by clicking on the "Upload Image" button on the post creation or editing page. You can also remove the image by clicking on the "Remove Image" button.

You can use Markdown syntax to format your posts and comments. For example, you can use `**bold**` for bold text, `*italic*` for italic text, `# Heading` for headings, etc. You can find more information about Markdown here: https://www.markdownguide.org/basic-syntax/

## License

Blogger is licensed under the MIT License. See LICENSE.txt for more details.