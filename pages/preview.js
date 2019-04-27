import { withRouter } from "next/router";
import Layout from "../components/layout.js";

function Post(props) {
  const { body } = props.router.query.remarked;
  return (
    <Layout>
      <h1>{props.router.query.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </Layout>
  );
}

export default withRouter(Post);
