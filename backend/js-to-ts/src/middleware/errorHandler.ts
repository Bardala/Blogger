import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, _, res, __) => {
  console.log(err);
  return res.status(500).send({ error: err.message });
};
