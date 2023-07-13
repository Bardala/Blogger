import { User, UserCard } from "../types";

export interface UserDao {
  createUser(user: User): Promise<void>;
  getUserById(userId: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUsers(): Promise<User[]>;
  getUsersList(): Promise<string[]>;
  createFollow(followerId: string, followingId: string): Promise<void>;
  deleteFollow(followerId: string, followingId: string): Promise<void>;
  getFollowers(followingId: string): Promise<string[]>;
  getUserCard(
    userId: string,
    cardOwnerId: string,
  ): Promise<UserCard | undefined>;
}
