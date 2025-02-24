import { createClerkClient, verifyToken } from "@clerk/backend";
import { APIError, Gateway, Header } from "encore.dev/api";
import { authHandler } from "encore.dev/auth";
import { secret } from "encore.dev/config";

import log from "encore.dev/log";
import { AUTHORIZED_PARTIES } from "./config";
import { Role } from "../users/types/user.interface";
import { users as usersService } from "~encore/clients";

const clerkSecretKey = secret("ClerkSecretKey");

const clerkClient = createClerkClient({
  secretKey: clerkSecretKey(),
});

interface AuthParams {
  authorization: Header<"Authorization">;
}

interface AuthData {
  userID: string;
  imageUrl: string;
  emailAddress: string | null;
  role: Role;
}

const myAuthHandler = authHandler(async (params: AuthParams): Promise<AuthData> => {
  const token = params.authorization.replace("Bearer ", "");

  console.log("WOW");
  if (!token) {
    throw APIError.unauthenticated("no token provided");
  }

  try {
    const result = await verifyToken(token, {
      authorizedParties: AUTHORIZED_PARTIES,
      secretKey: clerkSecretKey(),
    });

    const user = await clerkClient.users.getUser(result.sub);
    const { role } = await usersService.getUserRole({ userId: user.id });


    return {
      userID: user.id,
      imageUrl: user.imageUrl,
      emailAddress: user.emailAddresses[0].emailAddress || null,
      role: role
    };
  } catch (e) {
    log.error(e);
    throw APIError.unauthenticated("invalid token", e as Error);
  }
});

export const mygw = new Gateway({ authHandler: myAuthHandler });