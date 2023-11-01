const information = document.getElementById("info");
information.innerText = `本应用正在使用 Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), 和 Electron (v${versions.electron()}), 以及其他一些库来运行.(${
  versions.all
})`;
const func = async () => {
  const response = await window.versions.ping();
  console.log(response); // 打印 'pong'
};

func();
