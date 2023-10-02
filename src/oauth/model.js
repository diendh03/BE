import crypto from "crypto-js";
const db = {
  client: {
    clientId: "",
    clientSecret: "",
    redirectUris: [],
  },
  token: {
    accessToken: "",
    accessTokenExpiresAt: new Date(),
    client: null,
    user: null,
  },
};

export const getAuthorizationCode = (token, client, user) => {
  //   console.log(client);
  db.client = {
    clientId: client.clientId,
    clientSecret: client.clientSecret,
    redirectUris: [],
  };
  db.token = {
    accessToken: token,
    accessTokenExpiresAt: new Date(),
    user: user,
  };
  return new Promise((resolve) => resolve(db));
};
