const abrirButton = document.querySelector("#abrir");
const closeButton = document.querySelector("#close");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");

const toggleModal = () => {
    [modal,fade].forEach((el) => el.classList.toggle("esconder"));
};


[abrirButton, closeButton, fade].forEach((el) => {
    el.addEventListener("click", () => toggleModal());
});