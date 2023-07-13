import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, _, res, __) => {
  console.log(err.message);
  return res.status(500).send({ error: "Internal Server Error" });
};
