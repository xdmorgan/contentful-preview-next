const contentful = require("contentful");
const {
  CF_PREVIEW_TOKEN,
  CF_HOST_URL,
  CF_SPACE_ID,
  CF_ENV_NAME,
  CF_POST_TYPE
} = process.env;

const connect = async () => {
  return contentful.createClient({
    accessToken: CF_PREVIEW_TOKEN,
    host: CF_HOST_URL,
    space: CF_SPACE_ID,
    environment: CF_ENV_NAME
  });
};

const get = async (slug, client) => {
  return client.getEntries({
    content_type: CF_POST_TYPE,
    "fields.slug[in]": slug
  });
};

module.exports = {
  connect,
  get
};
