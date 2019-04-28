import getConfig from "next/config";
import Router from "next/router";
import * as contentful from "../contentful";
import * as remark from "../remark";

const Product = props => {
  return (
    <div>
      <article>
        <header>
          <h1>{props.post.fields.title}</h1>
        </header>
        <div dangerouslySetInnerHTML={{ __html: props.remarked.body }} />
      </article>
      <div>
        <h2>Post meta</h2>
        <ul>
          <li>
            <>Slug: </>
            <code>{props.slug}</code>
          </li>
        </ul>
      </div>
    </div>
  );
};

Product.getInitialProps = async ({ req, res, query }) => {
  function nope() {
    res.writeHead(404, { Location: "/" });
    res.end();
    return {};
  }

  if (!req) return Router.push("/");
  if (!query.slug) return nope();

  const cf = await contentful.connect({
    token: process.env.CF_PREVIEW_TOKEN,
    space: process.env.CF_SPACE_ID,
    host: process.env.CF_HOST_URL,
    env: process.env.CF_ENV_NAME
  });

  const posts = await contentful.get({
    slug: query.slug,
    client: cf,
    type: process.env.CF_POST_TYPE
  });

  if (!posts || !posts.total) return nope();
  const [post] = posts.items;
  const body = await remark.convert(post.fields.body);
  return { slug: query.slug, post, remarked: { body } };
};

export default Product;
