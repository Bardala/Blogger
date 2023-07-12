import { SignUpReq, SignUpRes } from "../../api.types";
import { SqlDataStore } from "../../dataStore/sql/SqlDataStore.class";
import { ExpressHandler } from "../../dataStore/types";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export class UserController {
  private db: SqlDataStore;

  constructor(db: SqlDataStore) {
    this.db = db;
  }

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

  signUp: ExpressHandler<SignUpReq, SignUpRes> = async (req, res) => {
    const { email, username, password } = req.body;
    if (!email || !username || !password)
      return res.sendStatus(400).send({ error: "All Fields Are Required" });

    const user = {
      email,
      username,
      id: crypto.randomUUID() as string,
      password: this.hashPassword(password),
    };

    await this.db.createUser(user);

    return res.send({ jwt: this.createToken(user.id) });

    if (!user) return res.status(500).send({ error: "Error in creating User" });
  };
}
