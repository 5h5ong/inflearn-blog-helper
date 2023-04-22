export default {
  EDIT_USERNAME: "on:editUsername",
  GET_USERNAME: "handle:username",
  CHECK_CURRENT_URL: "on:checkCurrentUrl",
  PARSE_MARKDOWN_FILE: "handle:parseMarkdownFile",
  GET_MARKDOWN_STATUS: "handle:getMarkdownStatus",
  INSERT_TEXT_TO_BLOG: "on:insertTextToBlog",
  ON_WRITE_STATE_CHANGED: "send:writeStateChanged",
} as const;
