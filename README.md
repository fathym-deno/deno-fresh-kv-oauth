# deno-fresh-kv-oauth

This project is a Deno Fresh wrapper around Deno KV Auth, which provides high-level OAuth 2.0 authentication powered by Deno KV. It allows you to easily add authentication to your Deno Fresh web application using popular OAuth 2.0 providers such as GitHub, Google, and Facebook.

## Getting Started

1. Add an import to the `deno.json` file for `@fresh_kv_oauth`:

   ```
   "@fresh_kv_oauth": "https://deno.land/x/deno_fresh_kv_oauth@v0.0.1-integration1/mod.ts"
   ```

   This will allow you to use the Deno Fresh wrapper around Deno KV Auth in your project.

2. Create a new `kv-auth.config.ts` file at the root of the project and populate it with the following code:

   ```
   import { createGitHubOAuth2Client } from "@kv_oauth";
   import { KVOauthPluginOptions } from "@fresh_kv_oauth";

   export const gitHubOauth2Client = createGitHubOAuth2Client();

   export const kvAuthOptions: KVOauthPluginOptions = {
     Clients: [
       {
         OAuth2Client: gitHubOauth2Client,
         SignInPath: "/oauth/signin/github",
         SignInCallbackPath: "/oauth/callback/github",
       },
     ],
     SignOutPath: "/oauth/signout",
   };
   ```

   This code creates a new OAuth 2.0 client for GitHub and sets up the authentication options for the Deno Fresh wrapper around Deno KV Auth.

3. Update the `fresh.config.ts` file to call the new plugin:

   ```
   import { kvOauthPlugin } from "@fresh_kv_oauth";
   import { kvAuthOptions } from "./kv-auth.config.ts";

   export default defineConfig({
     plugins: [
       twindPlugin(twindConfig),
       kvOauthPlugin(kvAuthOptions),
     ],
   });
   ```

   This code imports the `kvOauthPlugin` from the Deno Fresh wrapper around Deno KV Auth and passes in the authentication options from the `kv-auth.config.ts` file.

That's it! Your project is now configured to use the Deno Fresh wrapper around Deno KV Auth for authentication.