import Client, { Environment, Local } from "./client";


/**
 * Returns the generated Encore request client for either the local or staging environment.
 * If we are running the frontend locally we assume that our Encore backend is also running locally.
 */
const getRequestClient = (token: string | undefined) => {
  const env = import.meta.env.DEV ? Local : import.meta.env.VITE_ENV === "local-kubernetes" ? Local : Environment("staging");

console.log("LOOOK META FULL ENV", import.meta.env)  
console.log("LOOOK IMPORTANT NODE_ENV", import.meta.env.VITE_ENV)

  return new Client(env, {
    auth: { authorization: token || "" },
  });
};

export default getRequestClient;