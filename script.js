const root = document.documentElement;
const door = document.querySelector(".transition-door");
const floorLinks = document.querySelectorAll('a[href^="#"]:not(.elevator-cta)');
const elevatorCta = document.querySelector(".elevator-cta");
const detailPanels = document.querySelectorAll(".growfi-detail-floor");
const bgm = document.querySelector(".site-bgm");
const musicToggle = document.querySelector(".music-toggle");
const musicStatus = document.querySelector(".music-toggle__status");

const setMusicState = (isPlaying) => {
  musicToggle?.classList.toggle("is-playing", isPlaying);
  musicToggle?.setAttribute("aria-pressed", isPlaying ? "true" : "false");
  musicToggle?.setAttribute("aria-label", isPlaying ? "鏆傚仠鑳屾櫙闊充箰" : "鎾斁鑳屾櫙闊充箰");
  if (musicStatus) {
    musicStatus.textContent = isPlaying ? "ON" : "OFF";
  }
};

const syncElevatorPane = () => {
  const shouldShow = window.scrollY > 20 && !document.body.classList.contains("is-detail-open");
  document.body.classList.toggle("is-floor-nav-visible", shouldShow);
};

musicToggle?.addEventListener("click", async () => {
  if (!bgm) {
    return;
  }

  if (bgm.paused) {
    try {
      bgm.volume = 0.52;
      await bgm.play();
      setMusicState(true);
    } catch {
      setMusicState(false);
    }
  } else {
    bgm.pause();
    setMusicState(false);
  }
});

const openDetailPanel = (target) => {
  document.body.classList.add("is-detail-open");
  detailPanels.forEach((panel) => {
    const isTarget = panel === target;
    panel.classList.toggle("is-open", isTarget);
    panel.setAttribute("aria-hidden", isTarget ? "false" : "true");
  });
  target?.scrollTo({ top: 0, behavior: "auto" });
};

const closeDetailPanels = () => {
  document.body.classList.remove("is-detail-open");
  detailPanels.forEach((panel) => {
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
  });
};

window.addEventListener(
  "scroll",
  () => {
    const progress = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
    root.style.setProperty("--lift", `${progress * -34}px`);
    syncElevatorPane();
  },
  { passive: true },
);

elevatorCta?.addEventListener("click", (event) => {
  door?.classList.add("is-active");

  window.setTimeout(() => {
    closeDetailPanels();
    document.body.classList.add("is-floor-nav-visible");
  }, 260);

  window.setTimeout(() => {
    door?.classList.remove("is-active");
  }, 980);
});

floorLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#top") {
      return;
    }

    const target = document.querySelector(targetId);
    if (!target) {
      return;
    }

    event.preventDefault();
    door?.classList.add("is-active");

    window.setTimeout(() => {
      if (target.classList.contains("growfi-detail-floor")) {
        openDetailPanel(target);
        history.replaceState(null, "", targetId);
      } else {
        closeDetailPanels();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", targetId);
      }
    }, 260);

    window.setTimeout(() => {
      door?.classList.remove("is-active");
    }, 980);
  });
});

const initialPanel = document.querySelector(window.location.hash);
if (initialPanel?.classList.contains("growfi-detail-floor")) {
  openDetailPanel(initialPanel);
}

syncElevatorPane();
