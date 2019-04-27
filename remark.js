const Remark = require("remark");
const html = require("remark-html");

const remark = new Remark().use(html).data(`settings`, {
  commonmark: true,
  footnotes: true,
  gfm: true,
  pedantic: true
});

const convert = async s => {
  const processed = await remark.process(s);
  return processed.contents;
};

module.exports = { convert };
