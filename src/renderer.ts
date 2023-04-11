import "./index.css";

const api = window.api;

const usernameInputEle = document.getElementById(
  "username-input"
) as HTMLInputElement;

// 스토어에서 유저네임을 가져와 넣어줌
(async () => {
  usernameInputEle.value = await api.getUsername();
})();

usernameInputEle.addEventListener("input", async (e) => {
  const value = (e.target as HTMLInputElement).value;
  api.editUsername(value);
});
