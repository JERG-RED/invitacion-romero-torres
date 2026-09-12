/* =========================================
   ELEMENTOS PRINCIPALES
========================================= */

const openButton = document.getElementById("openInvitation");
const cover = document.getElementById("cover");
const invitation = document.getElementById("invitation");
const backTop = document.getElementById("backTop");


/* =========================================
   🎵 ELEMENTOS DE MÚSICA
========================================= */

const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
const musicIcon = document.getElementById("musicIcon");


/* =========================================
   🎵 ACTUALIZAR ESTADO DEL BOTÓN
========================================= */

function setMusicPlaying() {

  if (!musicButton || !musicIcon) {
    return;
  }

  musicButton.classList.add("playing");

  musicIcon.textContent = "Ⅱ";

  musicButton.setAttribute(
    "aria-label",
    "Pausar música"
  );
}


function setMusicPaused() {

  if (!musicButton || !musicIcon) {
    return;
  }

  musicButton.classList.remove("playing");

  musicIcon.textContent = "♫";

  musicButton.setAttribute(
    "aria-label",
    "Reproducir música"
  );
}


/* =========================================
   🎵 REPRODUCIR MÚSICA
========================================= */

function playMusic() {

  if (!music) {
    return;
  }

  music.play()
    .then(() => {

      setMusicPlaying();

    })
    .catch(() => {

      /*
        Algunos navegadores pueden bloquear
        la reproducción automática.

        En ese caso el usuario podrá tocar
        el botón de música manualmente.
      */

      console.log(
        "El navegador requiere interacción para reproducir la música."
      );

    });
}


/* =========================================
   🎵 PAUSAR MÚSICA
========================================= */

function pauseMusic() {

  if (!music) {
    return;
  }

  music.pause();

  setMusicPaused();
}


/* =========================================
   💌 ABRIR INVITACIÓN
========================================= */

openButton.addEventListener("click", () => {

  /*
    El usuario acaba de interactuar con la página.
    Esto permite intentar reproducir el audio.
  */

  playMusic();


  /*
    Animación de salida de la portada
  */

  cover.classList.add("opened");


  /*
    Después de la animación mostramos
    la invitación.
  */

  setTimeout(() => {

    cover.style.display = "none";

    invitation.classList.remove("hidden");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }, 650);

});


/* =========================================
   🎵 BOTÓN DE MÚSICA
========================================= */

musicButton.addEventListener("click", () => {

  if (!music) {
    return;
  }


  /*
    Si está pausada → reproducir
  */

  if (music.paused) {

    playMusic();

  }

  /*
    Si está reproduciendo → pausar
  */

  else {

    pauseMusic();

  }

});


/* =========================================
   🎵 EVENTOS DEL AUDIO
========================================= */

if (music) {

  /*
    Cuando realmente comienza la reproducción
  */

  music.addEventListener("play", () => {

    setMusicPlaying();

  });


  /*
    Cuando se pausa
  */

  music.addEventListener("pause", () => {

    setMusicPaused();

  });


  /*
    Si termina, como usamos loop,
    normalmente volverá a comenzar.
  */

  music.addEventListener("ended", () => {

    setMusicPlaying();

  });

}


/* =========================================
   ⏳ CUENTA REGRESIVA
========================================= */

/*
  Fecha del evento:

  6 de diciembre de 2026
  00:00
  Hora de Bogotá (UTC-5)
*/

const eventDate =
  new Date(
    "2026-12-06T00:00:00-05:00"
  ).getTime();


function updateCountdown() {

  const now = Date.now();

  const distance =
    eventDate - now;


  /*
    Si la fecha ya llegó
  */

  if (distance <= 0) {

    document.getElementById("days").textContent = "00";

    document.getElementById("hours").textContent = "00";

    document.getElementById("minutes").textContent = "00";

    document.getElementById("seconds").textContent = "00";

    return;
  }


  /*
    Cálculo de días
  */

  const days =
    Math.floor(
      distance / 86400000
    );


  /*
    Cálculo de horas
  */

  const hours =
    Math.floor(
      (distance % 86400000) /
      3600000
    );


  /*
    Cálculo de minutos
  */

  const minutes =
    Math.floor(
      (distance % 3600000) /
      60000
    );


  /*
    Cálculo de segundos
  */

  const seconds =
    Math.floor(
      (distance % 60000) /
      1000
    );


  /*
    Mostrar resultados
  */

  document.getElementById("days").textContent =
    String(days).padStart(2, "0");


  document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");


  document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");


  document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");

}


/*
  Ejecutar inmediatamente
*/

updateCountdown();


/*
  Actualizar cada segundo
*/

setInterval(
  updateCountdown,
  1000
);


/* =========================================
   ⬆️ BOTÓN VOLVER ARRIBA
========================================= */

window.addEventListener("scroll", () => {

  if (window.scrollY > 500) {

    backTop.classList.add("visible");

  }

  else {

    backTop.classList.remove("visible");

  }

});


/* =========================================
   ⬆️ VOLVER ARRIBA
========================================= */

backTop.addEventListener("click", () => {

  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

});
