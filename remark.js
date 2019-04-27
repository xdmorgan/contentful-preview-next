const Remark = require("remark");
const html = require("remark-html");

const CONFIG = {
  commonmark: true,
  footnotes: true,
  gfm: true,
  pedantic: true
};

const remark = new Remark().use(html).data(`settings`, CONFIG);

const convert = async s => {
  const processed = await remark.process(s);
  console.log(processed);
  return processed;
};

module.exports = { convert };

// const unified = require('unified')
// const parse = require('remark-parse')
// const stringify = require('remark-stringify')
// const remark2retext = require('remark-retext')
// const english = require('retext-english')
// const equality = require('retext-equality')

// unified()
//   .use(parse)
//   .use(
//     remark2retext,
//     unified()
//       .use(english)
//       .use(equality)
//   )
//   .use(stringify)
//   .process(s, (err, file) => console.error(err, file))
