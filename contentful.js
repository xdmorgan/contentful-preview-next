const contentful = require("contentful");

const connect = async ({ token, host, space, env }) =>
  contentful.createClient({
    accessToken: token,
    host: host,
    space: space,
    environment: env
  });

const get = async (slug, client, type) =>
  client.getEntries({
    content_type: type,
    "fields.slug[in]": slug
  });

module.exports = {
  connect,
  get
};
