/* =========================================
   ELEMENTOS
========================================= */

const cover = document.getElementById("cover");

const invitation = document.getElementById("invitation");

const openInvitation =
  document.getElementById("openInvitation");

const backgroundMusic =
  document.getElementById("backgroundMusic");

const musicButton =
  document.getElementById("musicButton");

const musicIcon =
  document.getElementById("musicIcon");

const backTop =
  document.getElementById("backTop");


/* =========================================
   ABRIR INVITACIÓN
========================================= */

if (openInvitation) {

  openInvitation.addEventListener("click", async () => {

    cover.classList.add("opened");

    setTimeout(() => {

      cover.style.display = "none";

      invitation.classList.remove("hidden");

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }, 650);


    /* Intentar iniciar música */

    if (backgroundMusic) {

      try {

        await backgroundMusic.play();

        if (musicButton) {
          musicButton.classList.add("playing");
        }

        if (musicIcon) {
          musicIcon.textContent = "♫";
        }

      } catch (error) {

        console.log(
          "La música necesita ser iniciada manualmente."
        );

      }

    }

  });

}


/* =========================================
   🎵 MÚSICA
========================================= */

if (musicButton && backgroundMusic) {

  musicButton.addEventListener("click", async () => {

    if (backgroundMusic.paused) {

      try {

        await backgroundMusic.play();

        musicButton.classList.add("playing");

        if (musicIcon) {
          musicIcon.textContent = "♫";
        }

        musicButton.setAttribute(
          "aria-label",
          "Pausar música"
        );

      } catch (error) {

        console.log(
          "No fue posible reproducir la música."
        );

      }

    } else {

      backgroundMusic.pause();

      musicButton.classList.remove("playing");

      if (musicIcon) {
        musicIcon.textContent = "♪";
      }

      musicButton.setAttribute(
        "aria-label",
        "Reproducir música"
      );

    }

  });

}


/* =========================================
   ⏳ CUENTA REGRESIVA
========================================= */

const eventDate =
  new Date(
    "2026-12-06T00:00:00-05:00"
  ).getTime();


function updateCountdown() {

  const now =
    new Date().getTime();

  const distance =
    eventDate - now;


  const days =
    document.getElementById("days");

  const hours =
    document.getElementById("hours");

  const minutes =
    document.getElementById("minutes");

  const seconds =
    document.getElementById("seconds");


  if (distance <= 0) {

    if (days) days.textContent = "00";

    if (hours) hours.textContent = "00";

    if (minutes) minutes.textContent = "00";

    if (seconds) seconds.textContent = "00";

    return;

  }


  const daysValue =
    Math.floor(
      distance /
      (1000 * 60 * 60 * 24)
    );


  const hoursValue =
    Math.floor(
      (distance %
        (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );


  const minutesValue =
    Math.floor(
      (distance %
        (1000 * 60 * 60)) /
        (1000 * 60)
    );


  const secondsValue =
    Math.floor(
      (distance %
        (1000 * 60)) /
        1000
    );


  if (days) {
    days.textContent =
      String(daysValue).padStart(2, "0");
  }


  if (hours) {
    hours.textContent =
      String(hoursValue).padStart(2, "0");
  }


  if (minutes) {
    minutes.textContent =
      String(minutesValue).padStart(2, "0");
  }


  if (seconds) {
    seconds.textContent =
      String(secondsValue).padStart(2, "0");
  }

}


updateCountdown();

setInterval(
  updateCountdown,
  1000
);


/* =========================================
   🖼️ VISOR DE IMÁGENES
========================================= */

const imageViewer =
  document.getElementById("imageViewer");

const viewerImage =
  document.getElementById("viewerImage");

const closeViewer =
  document.getElementById("closeViewer");


const zoomableImages =
  document.querySelectorAll(
    ".zoomable-image"
  );


/* Abrir imagen */

zoomableImages.forEach((image) => {

  image.addEventListener("click", () => {

    if (!imageViewer || !viewerImage) {
      return;
    }


    viewerImage.src =
      image.src;


    viewerImage.alt =
      image.alt;


    imageViewer.classList.add("active");


    /* Evita que la página se mueva */

    document.body.style.overflow =
      "hidden";

  });

});


/* Cerrar visor */

function closeImageViewer() {

  if (!imageViewer) {
    return;
  }


  imageViewer.classList.remove("active");


  document.body.style.overflow =
    "";

}


if (closeViewer) {

  closeViewer.addEventListener(
    "click",
    closeImageViewer
  );

}


/* Cerrar tocando fuera de la imagen */

if (imageViewer) {

  imageViewer.addEventListener(
    "click",
    (event) => {

      if (
        event.target === imageViewer
      ) {

        closeImageViewer();

      }

    }
  );

}


/* Cerrar con ESC */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape"
    ) {

      closeImageViewer();

    }

  }
);


/* =========================================
   ↑ VOLVER ARRIBA
========================================= */

window.addEventListener(
  "scroll",
  () => {

    if (!backTop) {
      return;
    }


    if (window.scrollY > 500) {

      backTop.classList.add(
        "visible"
      );

    } else {

      backTop.classList.remove(
        "visible"
      );

    }

  }
);


if (backTop) {

  backTop.addEventListener(
    "click",
    () => {

      window.scrollTo({

        top: 0,

        behavior: "smooth"

      });

    }
  );

}
