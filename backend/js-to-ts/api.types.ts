import { Blog, Comment, Space, User } from "./dataStore/types";

/**
 ** I am trying here to translate master's controllers types with some changes
 */

//* User APIs
export type SignUpReq = Pick<User, "email" | "password" | "username">;
export interface SignUpRes {
  jwt: string;
}

export interface LoginReq {
  login: string;
  password: string;
}
export interface LoginRes {
  jwt: string;
}

export interface GetUserReq {}
export interface GetUserRes {
  user: Pick<User, "email" | "id" | "username" | "timestamp">;
  numOfFollowers: number;
  numOfFollowing: number;
  numOfBlogs: number;
  numOfSpaces: number;
  numOfComments: number;
}

export interface getUsersListReq {}
export interface getUsersListRes {
  usernames: string[];
}

export interface followUserReq {}
export interface followUserRes {}

export interface unFollowUserReq {}
export interface unFollowUserRes {}

export interface getFollowersReq {}
export interface getFollowersRes {
  followersUsername: string[];
}

// * Blog APIs
// createBlog
export type CreateBlogReq = Pick<Blog, "title" | "content" | "spaceId">;
export interface CreateBlogRes {}

// getAllBlogs
export interface ListBlogsReq {}
export interface ListBlogRes {
  blogs: Blog[];
}

// getBlog
export interface BlogReq {} // the id will be included in params
export interface BlogRes {
  blog: Blog;
  // comments: Comment[]
}

// deleteBlog
export interface DeleteBlogReq {}
export interface DeleteBlogRes {}

// getBlogsByUsername
export interface UserBlogsReq {}
export interface UserBlogsRes {
  blogs: Blog[];
}

// likeBlog
export interface LikeBlogReq {}
export interface LikeBlogRes {}

// * Comment APIs
// createComment
export type CreateCommentReq = Pick<Comment, "blogId" | "content">;
export interface CreateCommentRes {
  comment: Comment;
}

// getComments
export type BlogCommentsReq = Pick<Blog, "id">;
export interface BlogCommentRes {
  comments: Comment[];
}

// * Space APIs
// getAllSpaces, for Dev purposes
export interface AllSpacesReq_Dev {}
export interface AllSpacesRes_Dev {
  spaces: Space[];
}

// createSpace
export type CreateSpaceReq = Pick<Space, "name" | "status" | "description">;
export interface CreateSpaceRes {
  space: Space;
  admins: Pick<User, "username">;
  members: Pick<User, "username">;
  blogs: Blog[];
}

// getDefaultSpace
export interface DefaultSpaceReq {}
export interface DefaultSpaceRes {
  space: Space;
  blogs: Blog[];
}

// getSpace
export interface SpaceReq {}
export interface SpaceRes {
  space: Space;
  admins: Pick<User, "username">;
  members: Pick<User, "username">;
  blogs: Blog[];
}

// updateSpace
export type UpdateSpaceReq = Pick<Space, "description" | "name" | "status">;
export interface UpdateSpaceRes {
  space: Space;
}

// joinSpace
export interface JoinSpaceReq {}
export interface JoinSpaceRes {} // at master I return Space, here I will just send OK

// addUser
export interface AddMemberReq {
  spaceId: string;
  memberId: string;
}
export interface AddMemberRes {}

// deleteSpace
export interface DeleteSpaceReq {}
export interface DeleteSpaceRes {}

// getUserSpaces
export interface SpacesReq {}
export interface SpacesRes {
  spaces: Pick<Space, "id" | "name" | "status">[];
}
