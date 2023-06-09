import "./index.css";

const api = window.api;

const usernameInputEle = document.getElementById(
  "username-input"
) as HTMLInputElement;
const getMarkdownButtonEle = document.getElementById(
  "get-markdown-button"
) as HTMLButtonElement;
const writeBlogButtonEle = document.getElementById("write-blog-button");

// 스토어에서 유저네임을 가져와 넣어줌
(async () => {
  usernameInputEle.value = await api.getUsername();
})();

getMarkdownButtonEle.addEventListener("click", async () => {
  await api.parseMarkdownFile();
});

writeBlogButtonEle.addEventListener("click", async () => {
  await api.insertTextToBlog();
});

usernameInputEle.addEventListener("input", async (e) => {
  const value = (e.target as HTMLInputElement).value;
  api.editUsername(value);
});
