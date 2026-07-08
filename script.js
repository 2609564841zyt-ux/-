const root = document.documentElement;
const door = document.querySelector(".transition-door");
const elevatorCta = document.querySelector(".elevator-cta");
const bgm = document.querySelector(".site-bgm");
const musicToggle = document.querySelector(".music-toggle");
const musicStatus = document.querySelector(".music-toggle__status");
const detailPanels = [...document.querySelectorAll(".growfi-detail-floor")];
const renderedDetailKeys = new Set();
const isMobileViewport = () => window.matchMedia("(max-width: 640px)").matches;

const videoPosters = {
  "./assets/hero-elevator.mp4": "./preview-home.png",
  "./assets/growfi.mp4": "./assets/growfi-detail-01.jpg",
  "./assets/loading.mp4": "./assets/loading-detail-02.jpg",
  "./assets/loading-detail-01.mp4": "./assets/loading-detail-02.jpg",
  "./assets/moodie-detail-00.mp4": "./assets/moodie-detail-M1.jpg",
  "./assets/ai-collection-intro.mp4": "./assets/ai-collection-detail-01.png",
  "./assets/brand-qiancheng.mp4": "./assets/qiancheng-detail-01.jpg",
  "./assets/brand-youlong.mp4": "./assets/youlong-detail-01.png",
  "./assets/brand-xunxian.mp4": "./assets/xunxian-detail-02.jpg",
  "./assets/brand-baxian.mp4": "./assets/baxian-detail-02.png",
  "./assets/brand-fenyun.mp4": "./assets/fenyun-detail-02.png",
  "./assets/brand-zhiyu.mp4": "./assets/zhiyu-detail-01.png",
  "./assets/ip-taohuaji.mp4": "./assets/taohuaji-detail-01.png",
  "./assets/ip-qianwen.mp4": "./assets/qianwen-detail-01.jpg",
  "./assets/ip-qianjin.mp4": "./assets/qianjin-detail-01.png",
  "./assets/ip-jianwei.mp4": "./assets/jianwei-detail-01.png",
  "./assets/contact-floor-bg.mp4": "./assets/wechat-qr.png",
  "./assets/xunxian-detail-01.mp4": "./assets/xunxian-detail-02.jpg",
  "./assets/baxian-detail-01.mp4": "./assets/baxian-detail-02.png",
  "./assets/fenyun-detail-01.mp4": "./assets/fenyun-detail-02.png",
  "./assets/fruit-capture-demo-compressed.mp4": "./assets/fruit-capture-preview.png",
  "./assets/2024-2025-motion-compressed.mp4": "./preview-home.png",
};

const normalizeMediaPath = (src) => {
  try {
    const url = new URL(src, window.location.href);
    const assetPath = url.pathname.split("/assets/")[1];
    return assetPath ? `./assets/${decodeURIComponent(assetPath)}` : src;
  } catch {
    return src;
  }
};

const enhanceVideo = (video, poster) => {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");

  if (!video.preload || video.preload === "none") {
    video.preload = "metadata";
  }

  const fallbackPoster = poster || videoPosters[normalizeMediaPath(video.currentSrc || video.src)];
  if (!video.poster && fallbackPoster) {
    video.poster = fallbackPoster;
  }

  const attemptPlay = () => {
    video.play().catch(() => {});
  };

  video.addEventListener("loadedmetadata", attemptPlay, { once: true });
  video.addEventListener("canplay", attemptPlay, { once: true });
  video.load();
  requestAnimationFrame(attemptPlay);
};

const addMobileVideoFallback = (video, poster) => {
  if (!isMobileViewport() || video.dataset.mobileFallbackReady === "true") {
    return;
  }

  const fallbackPoster = poster || video.poster || videoPosters[normalizeMediaPath(video.currentSrc || video.src)];
  if (!fallbackPoster) {
    return;
  }

  const image = document.createElement("img");
  image.className = "mobile-video-poster";
  image.src = fallbackPoster;
  image.alt = video.getAttribute("aria-label") || "";
  image.loading = "eager";
  image.decoding = "async";
  image.setAttribute("aria-hidden", image.alt ? "false" : "true");

  video.dataset.mobileFallbackReady = "true";
  video.after(image);
};

const mediaImage = (src, alt) => ({
  type: "img",
  src,
  alt,
});

const mediaVideo = (src, options = {}) => ({
  type: "video",
  src,
  className: options.className || "detail-video",
  preload: options.preload || "metadata",
  poster: options.poster || videoPosters[src],
  controls: options.controls !== false,
});

const mediaLink = (href, label, className) => ({
  type: "link",
  href,
  label,
  className,
});

const sequence = (prefix, files, ext, label) =>
  files.map((file) => mediaImage(`${prefix}${file}${ext}`, `${label} ${file}`));

const detailConfig = {
  growfi: {
    hudTitle: "GROWFI / BIG SCREEN",
    hudSubtitle: "SCROLL TO PLAY",
    backHref: "#ui-floor",
    media: sequence("./assets/growfi-detail-", ["01", "02", "03", "04", "05", "06", "07", "08"], ".jpg", "GrowFi 项目展示"),
    actions: [mediaLink("https://growfi.zhongyanting.xyz", "点击尝试", "try-project-link")],
  },
  loading: {
    hudTitle: "LOADING / BIG SCREEN",
    hudSubtitle: "SCROLL TO PLAY",
    backHref: "#ui-floor",
    screenClass: "loading-detail-screen",
    hudClass: "loading-hud",
    media: [
      mediaVideo("./assets/loading-detail-01.mp4", { className: "detail-video", preload: "metadata" }),
      ...sequence("./assets/loading-detail-", ["02", "03", "04", "05", "06", "07"], ".jpg", "加载中 Loading 项目展示"),
    ],
  },
  moodie: {
    hudTitle: "MOODIE / BIG SCREEN",
    hudSubtitle: "SCROLL TO PLAY",
    backHref: "#ui-floor",
    screenClass: "moodie-detail-screen",
    hudClass: "moodie-hud",
    media: [
      mediaVideo("./assets/moodie-detail-00.mp4", { className: "detail-video", preload: "metadata" }),
      ...sequence("./assets/moodie-detail-", ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9", "M10", "M11", "M12", "M13", "M14", "M15", "M16"], ".jpg", "Moodie 项目展示"),
    ],
  },
  "ai-collection": {
    hudTitle: "AI COLLECTION / BIG SCREEN",
    hudSubtitle: "SCROLL TO VIEW",
    backHref: "#ui-floor",
    screenClass: "ai-collection-detail-screen",
    hudClass: "ai-collection-hud",
    media: sequence("./assets/ai-collection-detail-", ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14"], ".png", "AI长文本收藏夹项目展示"),
  },
  xunxian: {
    hudTitle: "XUNXIAN / BIG SCREEN",
    hudSubtitle: "SCROLL TO PLAY",
    backHref: "#brand-floor",
    screenClass: "xunxian-detail-screen",
    hudClass: "xunxian-hud",
    media: [
      mediaVideo("./assets/xunxian-detail-01.mp4", { className: "detail-video", preload: "metadata" }),
      ...sequence("./assets/xunxian-detail-", ["02", "03", "04"], ".jpg", "寻仙项目展示"),
    ],
  },
  baxian: {
    hudTitle: "BA XIAN SONG FU / BIG SCREEN",
    hudSubtitle: "SCROLL TO PLAY",
    backHref: "#brand-floor",
    screenClass: "baxian-detail-screen",
    hudClass: "baxian-hud",
    media: [
      mediaVideo("./assets/baxian-detail-01.mp4", { className: "detail-video", preload: "metadata" }),
      ...sequence("./assets/baxian-detail-", ["02", "03", "04", "05", "06"], ".png", "八仙送福项目展示"),
    ],
  },
  more: {
    hudTitle: "MORE / BIG SCREEN",
    hudSubtitle: "SCROLL TO PLAY",
    backHref: "#ui-floor",
    hudClass: "more-hud",
    media: sequence("./assets/more-detail-", ["01", "02", "03", "04", "05", "06", "07", "08"], ".jpg", "更多项目展示").concat(
      sequence("./assets/more-extra-detail-", ["01", "02", "03", "04", "05"], ".png", "更多项目补充展示"),
    ),
  },
  fenyun: {
    hudTitle: "FENYUN / BIG SCREEN",
    hudSubtitle: "SCROLL TO PLAY",
    backHref: "#brand-floor",
    screenClass: "fenyun-detail-screen",
    hudClass: "fenyun-hud",
    media: [
      mediaVideo("./assets/fenyun-detail-01.mp4", { className: "detail-video", preload: "metadata" }),
      ...sequence("./assets/fenyun-detail-", ["02", "03", "04"], ".png", "粉韵项目展示"),
      ...sequence("./assets/fenyun-detail-", ["06", "07"], ".jpg", "粉韵项目展示"),
    ],
  },
  zhongqiu: {
    hudTitle: "MID-AUTUMN / BIG SCREEN",
    hudSubtitle: "SCROLL TO PLAY",
    backHref: "#brand-floor",
    screenClass: "fenyun-detail-screen",
    hudClass: "fenyun-hud",
    media: sequence("./assets/zhongqiu-detail-", ["01"], ".png", "礼遇中秋项目展示").concat(
      sequence("./assets/zhongqiu-detail-", ["02", "03", "04"], ".jpg", "礼遇中秋项目展示"),
    ),
  },
  zhiyu: {
    hudTitle: "ZHIYU PLAN / BIG SCREEN",
    hudSubtitle: "SCROLL TO PLAY",
    backHref: "#brand-floor",
    screenClass: "zhiyu-detail-screen",
    hudClass: "zhiyu-hud",
    media: sequence("./assets/zhiyu-detail-", ["01", "02", "03", "04"], ".png", "植愈计划项目展示"),
  },
  qiancheng: {
    hudTitle: "QIANCHENG / BIG SCREEN",
    hudSubtitle: "SCROLL TO PLAY",
    backHref: "#brand-floor",
    hudClass: "qiancheng-hud",
    media: sequence("./assets/qiancheng-detail-", ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28"], ".jpg", "黔程似锦项目展示"),
  },
  youlong: {
    hudTitle: "YOULONG / BIG SCREEN",
    hudSubtitle: "SCROLL TO PLAY",
    backHref: "#brand-floor",
    hudClass: "youlong-hud",
    media: [
      mediaImage("./assets/youlong-detail-01.png", "有龙项目展示 1"),
      mediaImage("./assets/youlong-detail-02.jpg", "有龙项目展示 2"),
      mediaImage("./assets/youlong-detail-03.jpg", "有龙项目展示 3"),
      mediaImage("./assets/youlong-detail-04.png", "有龙项目展示 4"),
    ],
  },
  merit: {
    hudTitle: "MERIT / BIG SCREEN",
    hudSubtitle: "SCROLL TO PLAY",
    backHref: "#brand-floor",
    hudClass: "merit-hud",
    media: [
      mediaImage("./assets/merit-detail-01.png", "Merit 植得项目展示 1"),
      ...sequence("./assets/merit-detail-", ["02", "03", "04", "05"], ".jpg", "Merit 植得项目展示"),
    ],
  },
  taohuaji: {
    hudTitle: "TAOHUAJI / BIG SCREEN",
    hudSubtitle: "SCROLL TO PLAY",
    backHref: "#ip-floor",
    screenClass: "fenyun-detail-screen",
    hudClass: "fenyun-hud",
    media: [
      mediaImage("./assets/taohuaji-detail-01.png", "桃花姬项目展示 1"),
      mediaImage("./assets/taohuaji-detail-02.png", "桃花姬项目展示 2"),
      mediaImage("./assets/taohuaji-detail-03.png", "桃花姬项目展示 3"),
    ],
  },
  qianwen: {
    hudTitle: "QIANWEN / BIG SCREEN",
    hudSubtitle: "SCROLL TO PLAY",
    backHref: "#ip-floor",
    hudClass: "more-hud",
    media: sequence("./assets/qianwen-detail-", ["01", "02", "03"], ".jpg", "千问IP项目展示"),
  },
  qianjin: {
    hudTitle: "QIANJIN / BIG SCREEN",
    hudSubtitle: "SCROLL TO PLAY",
    backHref: "#ip-floor",
    hudClass: "more-hud",
    media: [
      mediaImage("./assets/qianjin-detail-01.png", "黔锦IP项目展示 1"),
      ...sequence("./assets/qianjin-detail-", ["02", "03", "04", "05", "06"], ".jpg", "黔锦IP项目展示"),
    ],
  },
  taoxi: {
    hudTitle: "TAOXI / BIG SCREEN",
    hudSubtitle: "SCROLL TO PLAY",
    backHref: "#ip-floor",
    hudClass: "taoxi-hud",
    media: sequence("./assets/taoxi-detail-", ["01", "02", "03", "04", "05", "06", "07", "08"], ".png", "桃喜IP项目展示"),
  },
  qingtian: {
    hudTitle: "QINGTIAN / BIG SCREEN",
    hudSubtitle: "SCROLL TO PLAY",
    backHref: "#ip-floor",
    hudClass: "qingtian-hud",
    media: sequence("./assets/qingtian-detail-", ["01", "02", "03", "04", "05"], ".png", "青田鱼灯项目展示"),
  },
  jianwei: {
    hudTitle: "JIANWEI / BIG SCREEN",
    hudSubtitle: "SCROLL TO PLAY",
    backHref: "#ip-floor",
    hudClass: "more-hud",
    media: [
      mediaImage("./assets/jianwei-detail-01.png", "健胃消食片项目展示 1"),
      mediaImage("./assets/jianwei-detail-02.jpg", "健胃消食片项目展示 2"),
      mediaImage("./assets/jianwei-detail-03.jpg", "健胃消食片项目展示 3"),
    ],
  },
  fruit: {
    hudTitle: "FRUIT CATCHER / BIG SCREEN",
    hudSubtitle: "WATCH THE DEMO",
    backHref: "#other-floor",
    screenClass: "fruit-detail-screen",
    hudClass: "fruit-hud",
    media: [mediaVideo("./assets/fruit-capture-demo-compressed.mp4", { className: "detail-video fruit-detail-video", preload: "metadata" })],
    actions: [mediaLink("https://fruit.zhongyanting.xyz", "现在体验", "try-project-link fruit-try-link")],
  },
  "motion-draft": {
    hudTitle: "MOTION DRAFT / BIG SCREEN",
    hudSubtitle: "SCROLL TO PLAY",
    backHref: "#other-floor",
    screenClass: "motion-draft-detail-screen",
    hudClass: "motion-draft-hud",
    media: [mediaVideo("./assets/2024-2025-motion-compressed.mp4", { className: "detail-video", preload: "metadata" })],
  },
};

const setMusicState = (isPlaying) => {
  musicToggle?.classList.toggle("is-playing", isPlaying);
  musicToggle?.setAttribute("aria-pressed", isPlaying ? "true" : "false");
  musicToggle?.setAttribute("aria-label", isPlaying ? "关闭背景音乐" : "播放背景音乐");
  if (musicStatus) {
    musicStatus.textContent = isPlaying ? "ON" : "OFF";
  }
};

const syncElevatorPane = () => {
  const shouldShow = window.scrollY > 20 && !document.body.classList.contains("is-detail-open");
  document.body.classList.toggle("is-floor-nav-visible", shouldShow);
};

const createMediaNode = (item) => {
  if (item.type === "img") {
    const image = document.createElement("img");
    image.loading = isMobileViewport() ? "eager" : "lazy";
    image.decoding = "async";
    image.src = item.src;
    image.alt = item.alt;
    return image;
  }

  if (item.type === "video") {
    const video = document.createElement("video");
    video.className = item.className;
    video.src = item.src;
    video.preload = item.preload;
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    if (item.poster) {
      video.poster = item.poster;
    }
    if (item.controls) {
      video.controls = true;
    }
    enhanceVideo(video, item.poster);
    addMobileVideoFallback(video, item.poster);
    return video;
  }

  const link = document.createElement("a");
  link.className = item.className;
  link.href = item.href;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = item.label;
  return link;
};

const renderDetailPanel = (panel) => {
  const key = panel.dataset.detailKey || panel.id.replace(/-detail$/, "");
  const config = detailConfig[key];
  if (!config || renderedDetailKeys.has(key)) {
    return;
  }

  panel.innerHTML = "";
  const screen = document.createElement("div");
  screen.className = ["detail-screen", config.screenClass].filter(Boolean).join(" ");

  const hud = document.createElement("div");
  hud.className = ["detail-screen-hud", config.hudClass].filter(Boolean).join(" ");

  const title = document.createElement("span");
  title.textContent = config.hudTitle;
  const subtitle = document.createElement("strong");
  subtitle.textContent = config.hudSubtitle;
  const back = document.createElement("a");
  back.href = config.backHref;
  back.textContent = "BACK";

  hud.append(title, subtitle, back);
  screen.append(hud);

  config.media.forEach((item) => {
    screen.append(createMediaNode(item));
  });

  config.actions?.forEach((item) => {
    screen.append(createMediaNode(item));
  });

  panel.append(screen);
  renderedDetailKeys.add(key);
};

const closeDetailPanels = () => {
  document.body.classList.remove("is-detail-open");
  detailPanels.forEach((panel) => {
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
    panel.innerHTML = "";
    renderedDetailKeys.delete(panel.dataset.detailKey || panel.id.replace(/-detail$/, ""));
  });
};

const openDetailPanel = (target) => {
  if (!target) {
    return;
  }

  closeDetailPanels();
  renderDetailPanel(target);
  document.body.classList.add("is-detail-open");
  target.classList.add("is-open");
  target.setAttribute("aria-hidden", "false");
  target.scrollTo({ top: 0, behavior: "auto" });
};

const navigateHash = (hash, { animate = false } = {}) => {
  if (!hash || hash === "#top") {
    closeDetailPanels();
    document.body.classList.remove("is-floor-nav-visible");
    return;
  }

  const target = document.querySelector(hash);
  if (!target) {
    return;
  }

  const shouldOpenDetail = target.classList.contains("growfi-detail-floor");

  if (animate) {
    door?.classList.add("is-active");
    window.setTimeout(() => {
      if (shouldOpenDetail) {
        openDetailPanel(target);
      } else {
        closeDetailPanels();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      history.replaceState(null, "", hash);
    }, 260);
    window.setTimeout(() => {
      door?.classList.remove("is-active");
    }, 980);
    return;
  }

  if (shouldOpenDetail) {
    openDetailPanel(target);
  } else {
    closeDetailPanels();
    target.scrollIntoView({ behavior: "auto", block: "start" });
  }
  history.replaceState(null, "", hash);
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
  event.preventDefault();
  navigateHash("#about", { animate: true });
});

document.addEventListener("click", (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link || link.classList.contains("elevator-cta")) {
    return;
  }

  const targetId = link.getAttribute("href");
  if (!targetId) {
    return;
  }

  event.preventDefault();
  navigateHash(targetId, { animate: true });
});

window.addEventListener("hashchange", () => {
  navigateHash(window.location.hash, { animate: false });
});

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("video").forEach((video) => {
    enhanceVideo(video);
    addMobileVideoFallback(video);
  });

  if (isMobileViewport()) {
    document.querySelectorAll("img").forEach((image) => {
      image.loading = "eager";
      image.decoding = "async";
    });
  }
});

const initialHash = window.location.hash;
if (initialHash) {
  navigateHash(initialHash, { animate: false });
}

syncElevatorPane();
setMusicState(false);
