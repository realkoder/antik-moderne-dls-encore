import { createClerkClient, verifyToken } from "@clerk/backend";
import { APIError, Gateway, Header } from "encore.dev/api";
import { authHandler } from "encore.dev/auth";
import { secret } from "encore.dev/config";

import log from "encore.dev/log";
import { AUTHORIZED_PARTIES } from "./config";
import { Role } from "../user/types/user.interface";
import { user as usersService } from "~encore/clients";

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

  if (!token) {
    throw APIError.unauthenticated("no token provided");
  }

  try {
    const result = await verifyToken(token, {
      authorizedParties: AUTHORIZED_PARTIES,
      secretKey: clerkSecretKey(),
    });

    console.log("LOOK RESULT", result);
    
    const user = await clerkClient.users.getUser(result.sub);
    console.log("LOOK RETURNED USER", user);
    const { role } = await usersService.getUserRoleForAuth({ userId: user.id });
    console.log("LOOK RETURNED ROLE", role);
    if (!role) throw APIError.unauthenticated("Missing role");

    return {
      userID: user.id,
      imageUrl: user.imageUrl,
      emailAddress: user.emailAddresses[0].emailAddress || null,
      role: role
    };
  } catch (e) {
    log.error(e);
    throw APIError.unauthenticated("invalid token or missing role", e as Error);
  }
});

export const mygw = new Gateway({ authHandler: myAuthHandler });