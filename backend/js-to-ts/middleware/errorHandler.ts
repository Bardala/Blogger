import { ErrorRequestHandler } from "express";

export function errorHandler(err, req, res, next): ErrorRequestHandler {
  console.log(err);
  return res.status(500).send({ error: "Something failed!" });
}
