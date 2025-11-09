function loadFunctionIMG(source, width, height) {
  const img = document.getElementById("pageimg");
  img.src = source;
  img.width = width;
  img.height = height;
}
function loadFunctionText(text) {
  document.getElementById("pagetext").innerHTML = text;
}
function loadFunctionCont(text, next, comic, end) {
  const cont = document.getElementById("pagecont");
  if (end) {
    cont.innerHTML = text;
  } else {
    cont.innerHTML = `<a href="index.html?comic=${comic}&page=${next}">${text}</a>`;
  }
}
function loadFunctionTitle(title) {
  document.getElementById("pagetitle").innerHTML = title; 
}
window.onload = function() {
  const params = new URLSearchParams(window.location.search);
  const page = params.get("page") || "001";
  comic = params.get("comic") || "comic1";
  loadPage(page);
};

function loadPage(number) {
  fetch(`mmfa/${comic}/${number}.txt`)
  .then (response => response.text())
  .then (data => {
    const lines = data.split("\n");
    const imagedata = lines[0].split(" ");
    const imagewidth = imagedata[1];
    const imageheight = imagedata[2];
    const imagesource = imagedata[0];
    const text = lines.slice(1, lines.length - 4).join("<br>");
    const title = lines[lines.length - 4]
    const next_page_text = lines[lines.length - 3];
    const next_page_number = lines[lines.length - 2];
    const comic_number = lines[lines.length - 1];
    const end = next_page_number === "END";
    console.log(title)
    loadFunctionIMG(imagesource, imagewidth, imageheight)
    loadFunctionText(text);
    loadFunctionCont(next_page_text, next_page_number, comic_number, end);
    loadFunctionTitle(title)
  });
}
