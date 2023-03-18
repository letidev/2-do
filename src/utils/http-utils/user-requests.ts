import axios from "axios";
import { CreateUserDto, RegisterUserData, User } from "../types/user";
import bcrypt from "bcryptjs";

const apiUrl = "http://localhost:3005/users";
const loggedUserKey = "loggedUserKey";

export const getUserById = async (id: string) => {
  return axios.get<User>(`${apiUrl}/${id}`);
};

export const deleteUser = async (id: string) => {
  const user = (await getUserById(id)).data;

  return axios.put<User>(`${apiUrl}/${id}`, { ...user, isActive: false });
};

export const saveUser = (user: User) => {
  if (user.role === "admin") {
    throw new Error("Cannot edit the admin account");
  }

  axios.put<User>(`${apiUrl}/${user.id}`, user);
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
    isActive: true,
    role: "user",
  };

  return axios.post<User>(apiUrl, newUser);
};

export const login = async (email: string, password: string) => {
  const user = (await axios.get<User[]>(`${apiUrl}?email=${email}`)).data?.[0];
  const errorMessage = "Invalid username and/or password.";

  if (!user) {
    throw new Error(errorMessage);
  } else {
    if (user.isActive === false) {
      throw new Error(errorMessage);
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error(errorMessage);
    }

    const { password: _pwd, ...userWithoutPassword } = user;

    sessionStorage.setItem(loggedUserKey, JSON.stringify(userWithoutPassword));

    return user;
  }
};

export const logout = () => {
  sessionStorage.removeItem(loggedUserKey);
};

export const getLoggedUser = () => {
  const userString = sessionStorage.getItem(loggedUserKey);

  if (!userString) {
    return null;
  }

  return JSON.parse(userString);
};
