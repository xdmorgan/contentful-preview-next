require("dotenv").config();

const express = require("express");
const next = require("next");
const contentful = require("./contentful");
const remark = require("./remark");

const { SERVER_PORT = 3000, NODE_ENV } = process.env;
const dev = NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();

async function start() {
  console.log("connecting to contentful");
  const client = await contentful.connect();
  console.log("starting server");
  await app.prepare();

  app
    .prepare()
    .then(() => {
      const server = express();

      server.get("/preview/:slug", async (req, res) => {
        const actualPage = "/preview";
        const data = await contentful.get(req.params.slug, client);
        const post = data && data.items && data.items[0];
        if (!post) return res.redirect(404, "/");
        const body = await remark.convert(post.fields.body);
        const queryParams = { params: req.params, post, remarked: { body } };
        app.render(req, res, actualPage, queryParams);
      });

      server.get("*", (req, res) => {
        return handle(req, res);
      });

      server.listen(SERVER_PORT, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${SERVER_PORT}`);
      });
    })
    .catch(ex => {
      console.error(ex.stack);
      process.exit(1);
    });
}

start();
