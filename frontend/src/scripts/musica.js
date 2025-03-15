const music = document.getElementById("bgMusic");
const playBtn = document.getElementById("playPauseBtn");

document.addEventListener("DOMContentLoaded", () => {
    music.play().then(() => {
        playBtn.textContent = "⏸️ Pausar";
    }).catch(error => {
        Swal.fire({
            title: "⚠️ Advertencia ⚠️",
            text: "El navegador ha bloqueado la reproducción automática. Presiona 'Entendido' para iniciarla",
            icon: "warning",
            confirmButtonText: "Entendido",
            background: "#2d3748",
            color: "#ff3131",
            confirmButtonColor: "#ff3131",
            customClass: {
                title: "swal-title",
                popup: "swal-popup"
            }
        }).then(() => {
            music.play();
            playBtn.textContent = "⏸️ Pausar";
        });
    });
})

playPauseBtn.addEventListener("click", () => {
    if (music.paused) {
        music.play();
        playBtn.textContent = "⏸️ Pausar";
    } else {
        music.pause();
        playBtn.textContent = "▶️ Reproducir";
    }
});