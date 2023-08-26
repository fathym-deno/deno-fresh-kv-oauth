import {
  handleCallback,
  OAuth2Client,
  type Plugin,
  type PluginRoute,
  signIn,
  signOut,
} from "../src.deps.ts";

export interface KVOauthPluginOptions {
  Clients: KVOauthClientPluginOptions[];

  SignOutPath?: string;
}

export interface KVOauthClientPluginOptions {
  OAuth2Client: OAuth2Client;

  SignInCallbackPath: string;

  SignInPath: string;
}

export function kvOauthPlugin(
  options: KVOauthPluginOptions,
): Plugin {
  const { Clients, SignOutPath } = options;

  const routes: PluginRoute[] = [
    {
      path: SignOutPath || "/oauth/signout",
      handler: async (req) => await signOut(req),
    },
  ];

  Clients?.forEach((client) => {
    routes.push({
      path: client.SignInPath,
      handler: async (req) => await signIn(req, client.OAuth2Client),
    });

    routes.push({
      path: client.SignInCallbackPath,
      handler: async (req) => {
        // Return object also includes `accessToken` and `sessionId` properties.
        const { response } = await handleCallback(
          req,
          client.OAuth2Client,
        );

        return response;
      },
    });
  });

  return {
    name: "kv-oauth",
    routes,
  };
}
