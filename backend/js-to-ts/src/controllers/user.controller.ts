import {
  GetUserCardReq,
  GetUserCardRes,
  LoginReq,
  LoginRes,
  SignUpReq,
  SignUpRes,
  FollowUserReq,
  FollowUserRes,
  GetFollowersReq,
  GetFollowersRes,
  GetUsersListReq,
  GetUsersListRes,
  UnFollowUserReq,
  UnFollowUserRes,
} from "../../api.types";
import { SqlDataStore } from "../../dataStore/sql/SqlDataStore.class";
import { Handler, HandlerWithParams } from "../../dataStore/types";
import { Errors } from "../../errors";
import { HTTP } from "../../httpStatusCodes";
import { createToken, hashPassword } from "../middleware/authMiddleware";
import crypto from "crypto";
import validator from "validator";

interface userController {
  signup: Handler<SignUpReq, SignUpRes>;
  login: Handler<LoginReq, LoginRes>;
  getUsersList: Handler<GetUserCardReq, GetUserCardRes>;
  getUserCard: HandlerWithParams<
    { id: string },
    GetUserCardReq,
    GetUserCardRes
  >;
  createFollow: HandlerWithParams<{ id: string }, FollowUserReq, FollowUserRes>;
  deleteFollow: HandlerWithParams<
    { id: string },
    UnFollowUserReq,
    UnFollowUserRes
  >;
  getFollowers: HandlerWithParams<
    { id: string },
    GetFollowersReq,
    GetFollowersRes
  >;
}

export class UserController implements userController {
  private db: SqlDataStore;

  constructor(db: SqlDataStore) {
    this.db = db;
  }

  getUserCard: HandlerWithParams<
    { id: string },
    GetUserCardReq,
    GetUserCardRes
  > = async (req, res) => {
    if (!req.params.id) {
      return res
        .status(HTTP.BAD_REQUEST)
        .send({ error: Errors.PARAMS_MISSING });
    }

    return res.status(HTTP.OK).send({
      userCard: await this.db.getUserCard(res.locals.userId, req.params.id),
    });
  };

  createFollow: HandlerWithParams<
    { id: string },
    FollowUserReq,
    FollowUserRes
  > = async (req, res) => {
    if (!req.params.id) {
      return res
        .status(HTTP.BAD_REQUEST)
        .send({ error: Errors.PARAMS_MISSING });
    }

    if (await this.db.isFollow(req.params.id, res.locals.userId)) {
      return res
        .status(HTTP.BAD_REQUEST)
        .send({ error: Errors.ALREADY_FOLLOWER });
    }

    await this.db.createFollow(res.locals.userId, req.params.id);
    return res.sendStatus(HTTP.OK);
  };

  deleteFollow: HandlerWithParams<
    { id: string },
    UnFollowUserReq,
    UnFollowUserRes
  > = async (req, res) => {
    if (!req.params.id) {
      return res
        .status(HTTP.BAD_REQUEST)
        .send({ error: Errors.PARAMS_MISSING });
    }

    // todo check Is already an unfollower
    if (!(await this.db.isFollow(req.params.id, res.locals.userId))) {
      return res
        .status(HTTP.BAD_REQUEST)
        .send({ error: Errors.ALREADY_UNFOLLOWER });
    }

    await this.db.deleteFollow(res.locals.userId, req.params.id);
    return res.sendStatus(200);
  };

  getFollowers: HandlerWithParams<
    { id: string },
    GetFollowersReq,
    GetFollowersRes
  > = async (req, res) => {
    if (!req.params.id) {
      return res
        .status(HTTP.BAD_REQUEST)
        .send({ error: Errors.PARAMS_MISSING });
    }

    return res
      .status(200)
      .send({ followersUsername: await this.db.getFollowers(req.params.id) });
  };

  getUsersList: Handler<GetUsersListReq, GetUsersListRes> = async (
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
      password: hashPassword(password),
    };

    await this.db.createUser(user);

    return res.send({ jwt: createToken(user.id) });
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

    return res.status(200).send({ jwt: createToken(user.id) });
  };
}
