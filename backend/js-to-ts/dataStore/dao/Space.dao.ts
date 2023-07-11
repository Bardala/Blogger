import { Space } from "../types";

export interface SpaceDao {
  createSpace(space: Space): Promise<void>;
  getDefaultSpace(): Promise<Space | undefined>;
  getSpace(spaceId: string): Promise<Space | undefined>;
  updateSpace(spaceId: string): Promise<Space | undefined>;
  joinSpace(memberId: string): Promise<void>;
  // addUser(memberId: string): Promise<void>
  deleteSpace(spaceId: string): Promise<void>;
  getSpaces(userId: string): Promise<Space[]>;
}
