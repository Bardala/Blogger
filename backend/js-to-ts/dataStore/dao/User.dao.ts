import { User } from "../types";

export interface UserDao {
  createUser(user: User): Promise<void>;
  getUserById(userId: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUsers(): Promise<User[]>;
  getUsersList(): Promise<string[]>;
  followUser(followerId: string, followingId: string): Promise<void>;
  unFollowUser(followerId: string, followingId: string): Promise<void>;
  getFollowers(followingId: string): Promise<Pick<User, "username">[]>;
}
