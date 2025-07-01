class GerericError extends Error {
  status: number;

  constructor(msg: string, status: number) {
    super(msg);

    this.status = status;
  }
}

export const NotFoundError = (
  msg = 'The route or data in your request cannot be found.',
) => new GerericError(msg, 404);

export const InternalServerError = (
  msg = 'Internal Server Error.',
) => new GerericError(msg, 500);

export const BadRequestError = (
  msg = 'Bad Request.',
) => new GerericError(msg, 400);

export const UnprocessableEntityError = (
  msg = 'Unable to perform this action.',
) => new GerericError(msg, 422);

export const UnauthorizedError = (
  msg = 'Unauthorized',
) => new GerericError(msg, 401);

export const ForbiddenError = (
  msg = 'Forbidden',
) => new GerericError(msg, 403);
