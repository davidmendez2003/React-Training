function buildTree(info) {

  const listIt = document.createElement("li");
  if (info.type === "folder") {
    listIt.textContent = "📁 " + info.name;
  } else {
    listIt.textContent = "📄 " + info.name;
  }
  listIt.className = info.type;
  if (info.type === "folder" && info.children) {
    const ul = document.createElement("ul");
    info.children.forEach(function (child) {
      ul.appendChild(buildTree(child));
    });
    listIt.appendChild(ul);
  }
  return listIt;
}

document.addEventListener("DOMContentLoaded", function () {
  fetch("info.json")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      const container = document.getElementById("fileTree");
      const list = document.createElement("ul");
      list.appendChild(buildTree(data));       
      container.appendChild(list);
    });
});
