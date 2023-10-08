import {Request, Response, NextFunction} from 'express';
import CustomError from '../../classes/CustomError';
import {User, OutputUser} from '../../interfaces/User';
import {validationResult} from 'express-validator';
import userModel from '../models/userModel';
import bcrypt from 'bcrypt';
import DBMessageResponse from '../../interfaces/DBMessageResponse';
import jwt from 'jsonwebtoken';

/**
 * Create a salt for bcrypt hashing with a cost factor of 12.
 */
const salt = bcrypt.genSaltSync(12);

/**
 * A simple check endpoint to verify server status.
 * @param req - The Express request object.
 * @param res - The Express response object.
 */
const check = (req: Request, res: Response) => {
  res.json({message: 'Server up'});
};

/**
 * Get a list of users.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 */
const userListGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userModel.find().select('-password -role');
    res.json(users);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

/**
 * Get a specific user by ID.
 * @param req - The Express request object with the user ID parameter.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 */
const userGet = async (
  req: Request<{id: string}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel
      .findById(req.params.id)
      .select('-password -role');
    if (!user) {
      next(new CustomError('User not found', 404));
      return;
    }
    res.json(user);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

/**
 * Create a new user.
 * @param req - The Express request object with the user data.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 */
const userPost = async (
  req: Request<{}, {}, User>,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => `${error.msg}: ${error.param}`)
        .join(', ');
      next(new CustomError(messages, 400));
      return;
    }

    const user = req.body;
    user.password = await bcrypt.hash(user.password, salt);
    user.role = user.role || 'user';

    const newUser = await userModel.create(user);
    const response: DBMessageResponse = {
      message: 'User created',
      user: {
        user_name: newUser.user_name,
        email: newUser.email,
        favourite_games: newUser.favourite_games || [],
        profile_image: newUser.profile_image,
        id: newUser._id,
      },
    };

    res.json(response);
  } catch (error) {
    next(new CustomError('User creation failed', 500));
  }
};

/**
 * Update an existing user's information.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 */
const userPut = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userFromToken: OutputUser = res.locals.user as OutputUser;
    let userId = userFromToken.id;
    if (req.params.id && res.locals.user.role.includes('admin')) {
      userId = req.params.id;
    }

    const user: User = req.body as User;
    if (user.password) {
      user.password = await bcrypt.hash(user.password, salt);
    }
    const result: User = (await userModel
      .findByIdAndUpdate(userId, user, {new: true})
      .select('-password -role')) as User;

    if (!result) {
      next(new CustomError('User not found', 404));
      return;
    }
    const response: DBMessageResponse = {
      message: 'User updated',
      user: {
        user_name: result.user_name,
        email: result.email,
        favourite_games: result.favourite_games || [],
        profile_image: result.profile_image,
        id: result._id,
      },
    };

    res.json(response);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

/**
 * Delete the currently authenticated user.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 */
const userDelete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userFromToken: OutputUser = res.locals?.user as OutputUser;
    const userId = userFromToken.id;
    const result: User = (await userModel.findByIdAndDelete(userId)) as User;
    if (!result) {
      next(new CustomError('User not found', 404));
      return;
    }

    const response: DBMessageResponse = {
      message: 'User deleted',
      user: {
        user_name: result.user_name,
        email: result.email,
        profile_image: '',
        favourite_games: [],
        id: result._id,
      },
    };

    res.json(response);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

/**
 * Delete a user as an admin.
 * @param req - The Express request object with the user ID parameter.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 */
const userDeleteAsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    if (!res.locals.user.role.includes('admin')) {
      next(new CustomError('Unauthorized', 401));
      return;
    }

    const result: User = (await userModel.findByIdAndDelete(userId)) as User;
    if (!result) {
      next(new CustomError('User not found', 404));
      return;
    }

    const response: DBMessageResponse = {
      message: 'User deleted',
      user: {
        user_name: result.user_name,
        email: result.email,
        profile_image: '',
        favourite_games: [],
        id: result._id,
      },
    };

    res.json(response);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

/**
 * Update a user's information as an admin.
 * @param req - The Express request object with the user ID parameter.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 */
const userPutAsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    if (!res.locals.user.role.includes('admin')) {
      next(new CustomError('Unauthorized', 401));
      return;
    }

    const user: User = req.body as User;
    if (user.password) {
      user.password = await bcrypt.hash(user.password, salt);
    }

    const result: User = (await userModel
      .findByIdAndUpdate(userId, user, {new: true})
      .select('-password -role')) as User;
    if (!result) {
      next(new CustomError('User not found', 404));
      return;
    }

    const response: DBMessageResponse = {
      message: 'User updated',
      user: {
        user_name: result.user_name,
        email: result.email,
        favourite_games: result.favourite_games || [],
        profile_image: result.profile_image,
        id: result._id,
      },
    };

    res.json(response);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

/**
 * Check the validity of the authentication token.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 */
const checkToken = async (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;
  console.log(bearer);
  if (!bearer) {
    next(new CustomError('Unauthorized', 401));
    return;
  }
  const token = bearer.split(' ')[1];
  if (!token) {
    next(new CustomError('Unauthorized', 401));
    return;
  }
  const userFromToken: OutputUser = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as OutputUser;
  if (!userFromToken) {
    next(new CustomError('Unauthorized', 401));
    return;
  }
  const user = await userModel
    .findById(userFromToken.id)
    .select('-password -role -__v');
  if (!user) {
    next(new CustomError('Unauthorized', 401));
    return;
  }
  res.locals.user = user;
  res.json({message: 'Token valid'});
};

// Export all the defined functions as module exports.
export {
  userPost,
  userPut,
  userDelete,
  check,
  userListGet,
  userGet,
  checkToken,
  userDeleteAsAdmin,
  userPutAsAdmin,
};
