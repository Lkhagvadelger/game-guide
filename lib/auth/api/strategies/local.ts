import { consumePIN, updateLastLoggedInDate } from "@lib/user/api/pin";
import {
  getUserPasswordDigest, getUserPinDigest
} from "@lib/user/api/userService";
import { compare } from "bcryptjs";
import { Strategy } from "passport-local";

export const localStrategy = new Strategy(
  { usernameField: "username", passwordField: "pin" },

  async (phoneOrEmail, password, callback) => {

    const { user, pinDigest } = await getUserPinDigest(
      phoneOrEmail
    );
    if (!pinDigest)
      return callback({ message: "pin-not-initiated" }, false);
    const finalUser =
      pinDigest && pinDigest == password
        ? user
        : null;

    if (!finalUser) {
      return callback({ message: "invalid-credentials" }, false);
    }

    return callback(null, finalUser);
  }
);
