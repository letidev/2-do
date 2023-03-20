import axios from "axios";
import { CreateUserDto, RegisterUserData, User } from "../types/user";
import bcrypt from "bcryptjs";

const apiUrl = "http://localhost:3005/users";
const loggedUserKey = "loggedUserKey";

export const saveUser = async (user: User) => {
  const userFromDb = await getUserById(user.id);

  const newUser = { ...userFromDb, ...user };

  return axios.put<User>(`${apiUrl}/${user.id}`, newUser);
};

export const getUserById = async (userId: string) => {
  return axios.get<User>(`${apiUrl}/${userId}`).then((res) => res.data);
};

export const getUserExists = async (email: string) => {
  const users = (await axios.get<User[]>(`${apiUrl}?email=${email}`)).data;

  if (users.length > 0) {
    return true;
  }

  return false;
};

// registration and login logic
export const registerUser = async (userData: RegisterUserData) => {
  const userExists = await getUserExists(userData.email);

  if (userExists) {
    throw new Error("This email has already been used.");
  }

  if (userData.password !== userData.confirmPassword) {
    throw new Error("Passwords must match.");
  }

  const password = await bcrypt.hash(userData.password, 10);

  const newUser: CreateUserDto = {
    email: userData.email,
    firstName: userData.firstName,
    lastName: userData.lastName,
    password: password,
  };

  return axios.post<User>(apiUrl, newUser);
};

export const login = async (email: string, password: string) => {
  const user = (await axios.get<User[]>(`${apiUrl}?email=${email}`)).data?.[0];
  const errorMessage = "Invalid username and/or password.";

  if (!user) {
    throw new Error(errorMessage);
  } else {
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error(errorMessage);
    }

    sessionStorage.setItem(loggedUserKey, user.id);

    return user;
  }
};

export const logout = () => {
  sessionStorage.removeItem(loggedUserKey);
};

export const getLoggedUserId = () => {
  const userId = sessionStorage.getItem(loggedUserKey);

  if (!userId) {
    return undefined;
  }

  return userId;
};
