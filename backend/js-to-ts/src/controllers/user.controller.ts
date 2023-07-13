import {
  GetUserReq,
  GetUserRes,
  LoginReq,
  LoginRes,
  SignUpReq,
  SignUpRes,
  followUserReq,
  followUserRes,
  getUsersListReq,
  getUsersListRes,
  unFollowUserReq,
  unFollowUserRes,
} from "../../api.types";
import { SqlDataStore } from "../../dataStore/sql/SqlDataStore.class";
import { Handler, HandlerWithParams } from "../../dataStore/types";
import { Errors } from "../../errors";
import { HTTP } from "../../httpStatusCodes";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import validator from "validator";

interface userController {
  signup: Handler<SignUpReq, SignUpRes>;
  login: Handler<LoginReq, LoginRes>;
  getUsersList: Handler<GetUserReq, GetUserRes>;
  followUser: HandlerWithParams<
    { followingId: string },
    followUserReq,
    followUserRes
  >;
  unFollowUser: HandlerWithParams<
    { followingId: string },
    unFollowUserReq,
    unFollowUserRes
  >;
  getFollowers: HandlerWithParams<
    { userId: string },
    unFollowUserReq,
    unFollowUserRes
  >;
}

export class UserController implements userController {
  private db: SqlDataStore;

  constructor(db: SqlDataStore) {
    this.db = db;
  }

  // todo
  followUser!: HandlerWithParams<
    { followingId: string },
    followUserReq,
    followUserRes
  >;
  unFollowUser!: HandlerWithParams<
    { followingId: string },
    unFollowUserReq,
    unFollowUserRes
  >;
  getFollowers!: HandlerWithParams<
    { userId: string },
    unFollowUserReq,
    unFollowUserRes
  >;

  getUsersList: Handler<getUsersListReq, getUsersListRes> = async (
    _req,
    res,
  ) => {
    return res
      .status(HTTP.OK)
      .send({ usernames: await this.db.getUsersList() });
  };

  signup: Handler<SignUpReq, SignUpRes> = async (req, res) => {
    const { email, username, password } = req.body;

    if (!email || !username || !password)
      return res
        .status(HTTP.BAD_REQUEST)
        .send({ error: Errors.ALL_FIELDS_REQUIRED });

    if (await this.db.getUserByEmail(email))
      return res
        .status(HTTP.BAD_REQUEST)
        .send({ error: Errors.DUPLICATE_EMAIL });
    if (await this.db.getUserByUsername(username))
      return res
        .status(HTTP.BAD_REQUEST)
        .send({ error: Errors.DUPLICATE_USERNAME });

    if (!validator.isAlphanumeric(username))
      return res
        .status(HTTP.BAD_REQUEST)
        .send({ error: Errors.INVALID_USERNAME });
    if (!validator.isEmail(email))
      return res.status(HTTP.BAD_REQUEST).send({ error: Errors.INVALID_EMAIL });
    if (!validator.isStrongPassword(password))
      return res.status(HTTP.BAD_REQUEST).send({ error: Errors.WEAK_PASSWORD });

    const user = {
      email,
      username,
      id: crypto.randomUUID() as string,
      password: this.hashPassword(password),
    };

    await this.db.createUser(user);

    return res.send({ jwt: this.createToken(user.id) });
  };

  login: Handler<LoginReq, LoginRes> = async (req, res) => {
    if (!req.body.login || !req.body.password)
      return res
        .status(HTTP.BAD_REQUEST)
        .send({ error: Errors.ALL_FIELDS_REQUIRED });

    const user =
      (await this.db.getUserByEmail(req.body.login)) ||
      (await this.db.getUserByUsername(req.body.login));

    if (!user)
      return res.status(HTTP.BAD_REQUEST).send({ error: Errors.INVALID_LOGIN });

    return res.status(200).send({ jwt: this.createToken(user.id) });
  };

  private generateJwtSecret(): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("Missing jwt secret");
      process.exit(1);
    }
    return secret;
  }

  private hashPassword(password: string): string {
    return crypto
      .pbkdf2Sync(password, this.generateJwtSecret()!, 20, 20, "sha512")
      .toString("hex");
  }

  private createToken(id: string): string {
    return jwt.sign({ id }, this.generateJwtSecret()!, { expiresIn: "45d" });
  }
}
