import getConfig from "next/config";
import Router from "next/router";
import * as contentful from "../contentful";
import * as remark from "../remark";

const Product = props => {
  return (
    <div>
      <h5>{props.slug}</h5>
      <article>
        <header>
          <h1>{props.post.fields.title}</h1>
        </header>
        <div dangerouslySetInnerHTML={{ __html: props.remarked.body }} />
        <hr />
        <div dangerouslySetInnerHTML={{ __html: props.remarked.closer }} />
      </article>
    </div>
  );
};

Product.getInitialProps = async ({ req, res, query }) => {
  if (!req) return Router.push("/");
  const cf = await contentful.connect({
    token: process.env.CF_PREVIEW_TOKEN,
    space: process.env.CF_SPACE_ID,
    host: process.env.CF_HOST_URL,
    env: process.env.CF_ENV_NAME
  });

  const posts = await contentful.get(query.slug, cf, process.env.CF_POST_TYPE);

  if (!posts || !posts.total) {
    res.writeHead(404, { Location: "/" });
    res.end();
    return {};
  }

  const [post] = posts.items;
  const body = await remark.convert(post.fields.body);
  const closer = await remark.convert(post.fields.closer);

  return { slug: query.slug, post, remarked: { body, closer } };
};

export default Product;
