# deno-fresh-kv-oauth

This project is a Deno Fresh wrapper around Deno KV Auth, which provides
high-level OAuth 2.0 authentication powered by Deno KV. It allows you to easily
add authentication to your Deno Fresh web application using popular OAuth 2.0
providers such as GitHub, Google, and Facebook.

## Getting Started

### Import Library

Add an import to the `deno.json` file for `@kv_oauth` and `@fresh_kv_oauth`:

```
imports: {
    ...
    "@fresh_kv_oauth": "https://deno.land/x/deno_fresh_kv_oauth/mod.ts",
    "@kv_oauth": "https://deno.land/x/deno_kv_oauth/mod.ts",
    ...
}
```

This will allow you to use the Deno Fresh wrapper around Deno KV Auth in your
project. Its good practice to specifiy a version in your import statements.

Because Deno KV Auth uses Deno KV under the hood, it is required that you start
your application with the `--unstable` flag. To achieve this, open your
deno.json file and edit the start task to include the flag:

```
"tasks": {
    ...
    "start": "deno run -A --unstable --watch=static/,routes/ dev.ts",
    ...
},
```

### KV Auth Configuration

Create a new `kv-auth.config.ts` file at the root of the project and populate it
with the following code:

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

This code creates a new OAuth 2.0 client for GitHub and sets up the
authentication options for the Deno Fresh wrapper around Deno KV Auth.

### Fresh Plugin Registration

Update the `fresh.config.ts` file to call the new plugin:

```
import { kvAuthOptions } from "./kv-auth.config.ts";
import { kvOauthPlugin } from "@fresh_kv_oauth";

export default defineConfig({
  plugins: [
    ...
    kvOauthPlugin(kvAuthOptions),
    ...
  ],
});
```

This code imports the `kvOauthPlugin` from the Deno Fresh wrapper around Deno KV
Auth and passes in the authentication options from the `kv-auth.config.ts` file.

That's it! Your project is now configured to use the Deno Fresh wrapper around
Deno KV Auth for authentication.

## Configuring OAuth 2 Clients

You will need to setup any of the OAuth 2 Clients yourself, using the
appropriate service.

### GitHub Client

To configure your github client, navigate to the appropriate GitHub
organization. Then go under settings, and on the left choose Developer Settings

> OAtuh Apps. From there, you can create a new application, with whatever
> settings you need. At the end you will need to collect the client ID and
> generate a client secret. With those in hand, create a `.env` file at the root
> an insert your information.

```
GITHUB_CLIENT_ID={client_id}
GITHUB_CLIENT_SECRET={client_secret}
```
