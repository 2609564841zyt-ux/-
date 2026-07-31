/* 集中修改个人信息与项目内容，无需改动页面结构。 */
const profile = {
  name: "YanTing",
  education: [
    { period: "2021–2025", school: "天津工业大学", college: "艺术学院", major: "视觉传达设计专业（双一流学科）" },
    { period: "2025–2028", school: "南京理工大学（211）", college: "设计学院", major: "工业设计工程（硕士在读）" }
  ],
  experiences: [
    {
      title: "北京嘀嘀无限科技发展有限公司",
      period: "2026.01–2026.04",
      role: "用户端安全设计 / 活动策划",
      description: "负责出行安全入口、弹窗资源与安全推广，参与安全教育课程、内网活动及内部论坛维护。"
    },
    {
      title: "用友网络科技股份有限公司",
      period: "2024.12–2025.03",
      role: "智石开项目 / 系统与视觉设计",
      description: "参与系统组件迭代与产品大会物料设计，对接印刷制作，并支持公众号运营和 PPT 设计规范。"
    }
  ]
};

const uiuxProjects = [
  { title: "GrowFi 成长理财", category: "UI/UX", year: "PDF", summary: "游戏化植物成长理财体验设计", media: "assets/project-covers/uiux-finance.mp4", mediaType: "video", poster: "assets/project-covers/uiux-finance.jpg", pdf: "assets/projects/uiux-finance.pdf", preview: "assets/projects/uiux-finance.jpg" },
  { title: "20周年疯狂低价抢", category: "UI/UX", year: "PDF", summary: "周年庆活动体验与视觉设计", media: "assets/project-covers/anniversary.png", mediaType: "image", pdf: "assets/projects/uiux-project-01.pdf", preview: "assets/projects/uiux-project-01.jpg" },
  { title: "AI 长文本朗读助手", category: "UI/UX", year: "PDF", summary: "长文本朗读与效率工具体验设计", media: "assets/project-covers/ai-reader.mp4", mediaType: "video", poster: "assets/projects/uiux-project-02.jpg", pdf: "assets/projects/uiux-project-02.pdf", preview: "assets/projects/uiux-project-02.jpg" },
  { title: "智能命名助手", category: "UI/UX", year: "PDF", summary: "文件流程与智能命名体验设计", media: "assets/project-covers/smart-naming.png", mediaType: "image", pdf: "assets/projects/uiux-project-03.pdf", preview: "assets/projects/uiux-project-03.jpg" },
  { title: "加载中", category: "UI/UX", year: "PDF", summary: "休闲小游戏与奶茶品牌策略", media: "assets/project-covers/loading.mp4", mediaType: "video", poster: "assets/projects/uiux-loading.jpg", pdf: "assets/projects/uiux-loading.pdf", preview: "assets/projects/uiux-loading.jpg" }
];

const brandProjects = [
  { title: "有龍", category: "BRAND", year: "PDF", summary: "东方龙文化品牌视觉识别系统", media: "assets/project-covers/brand-youlong.mp4", mediaType: "video", poster: "assets/project-covers/brand-youlong.jpg", pdf: "assets/projects/brand-youlong.pdf", preview: "assets/projects/brand-youlong.jpg" },
  { title: "八仙新年", category: "BRAND", year: "PDF", summary: "八仙送福新年礼盒与包装视觉设计", media: "assets/project-covers/brand-baxian.mp4", mediaType: "video", poster: "assets/project-covers/brand-baxian.jpg", pdf: "assets/projects/brand-baxian.pdf", preview: "assets/projects/brand-baxian.jpg" },
  { title: "黔程锦绣", category: "BRAND", year: "PDF", summary: "贵州苗绣文化视觉识别与文创系统", media: "assets/project-covers/brand-qian.jpg", mediaType: "image", pdf: "assets/projects/brand-qian.pdf", preview: "assets/projects/brand-qian.jpg" },
  { title: "植得 Merit", category: "BRAND", year: "PDF", summary: "植物营养品牌策略与包装视觉设计", media: "assets/project-covers/brand-merit.jpg", mediaType: "image", pdf: "assets/projects/brand-merit.pdf", preview: "assets/projects/brand-merit.jpg" },
  { title: "粉韵", category: "BRAND", year: "PDF", summary: "传统陶瓷粉彩装饰书籍与文创设计", media: "assets/project-covers/brand-fenyun.jpg", mediaType: "image", pdf: "assets/projects/brand-fenyun.pdf", preview: "assets/projects/brand-fenyun.jpg" },
  { title: "桃花姬", category: "BRAND", year: "PDF", summary: "阿胶糕礼盒包装与系列插画设计", media: "assets/project-covers/brand-taohuaji.jpg", mediaType: "image", pdf: "assets/projects/brand-taohuaji.pdf", preview: "assets/projects/brand-taohuaji.jpg" },
  { title: "江中健胃消食片", category: "BRAND", year: "PDF", summary: "健胃消食产品包装与周边礼盒设计", media: "assets/project-covers/brand-jiangzhong.jpg", mediaType: "image", pdf: "assets/projects/brand-jiangzhong.pdf", preview: "assets/projects/brand-jiangzhong.jpg" }
];

const sceneNames = ["首页", "教育经历", "设计经历一", "设计经历二", "作品展示"];
const sceneImages = [
  "assets/scene-01.webp",
  "assets/scene-02.webp",
  "assets/scene-03.webp",
  "assets/scene-04.webp",
  "assets/scene-05.webp"
];

// 与五个 Figma 画面的镜头顺序对应，单位为秒。
const videoAnchors = [0.12, 1.45, 3.85, 5.55, 15.38];
const transitionDuration = 930;

const body = document.body;
const video = document.getElementById("storyVideo");
const stillFrame = document.getElementById("stillFrame");
const scenes = [...document.querySelectorAll(".scene")];
const status = document.getElementById("sceneStatus");
const progressCurrent = document.querySelector(".progress-current");
const progressBar = document.querySelector(".progress-line i");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const projectModal = document.getElementById("projectModal");
const pdfStage = document.getElementById("pdfStage");
const projectScroll = document.getElementById("projectScroll");
const projectImage = document.getElementById("projectImage");
const imageLoading = document.getElementById("imageLoading");
const modalProjectTitle = document.getElementById("modalProjectTitle");
const modalCategory = document.querySelector(".modal-category");
const modalCounter = document.getElementById("modalCounter");
const openPdfLink = document.getElementById("openPdfLink");
const previousPdf = document.getElementById("previousPdf");
const nextPdf = document.getElementById("nextPdf");
const badgeTrigger = document.getElementById("badgeTrigger");
const identityBadge = document.getElementById("identityBadge");
const badgeStatus = document.getElementById("badgeStatus");

let activeScene = 0;
let sceneLocked = false;
let animationFrame = 0;
let touchStartY = 0;
let touchStartX = 0;
let activePdfIndex = 0;
let activeProjects = uiuxProjects;
let lastProjectTrigger = null;

function renderProfile() {
  document.querySelectorAll("[data-profile-name]").forEach((node) => { node.textContent = profile.name; });
  document.querySelector("[data-hero-name]").textContent = profile.name;

  document.getElementById("educationCopy").innerHTML = profile.education.map((item) => `
    <p class="education-block">
      <span>${item.period}</span><span>${item.school}</span><span>${item.college}</span><span>${item.major}</span>
    </p>`).join("");

  profile.experiences.forEach((item, index) => {
    const target = document.getElementById(index === 0 ? "experienceA" : "experienceB");
    target.innerHTML = `
      <h2>${item.title}</h2>
      <p class="experience-meta">${item.period}<br>${item.role}</p>
      <p>${item.description}</p>`;
  });
}

function dropIdentityBadge() {
  identityBadge.classList.remove("is-dropped");
  void identityBadge.offsetWidth;
  identityBadge.classList.add("is-dropped");
  badgeTrigger.setAttribute("aria-expanded", "true");
  badgeStatus.textContent = `${profile.name} 的设计师工牌已落下`;
}

function renderProjects(items, targetId, interactive = false) {
  const track = document.getElementById(targetId);
  track.innerHTML = items.map((item, index) => {
    const canOpen = interactive && item.pdf && item.preview;
    const tag = canOpen ? "button" : "article";
    const interactionAttributes = canOpen
      ? `type="button" data-pdf-index="${index}" aria-label="打开 ${item.title} PDF 项目预览"`
      : "";
    const media = item.mediaType === "video"
      ? `<video class="card-media" src="${item.media}" poster="${item.poster || ""}" muted loop playsinline autoplay preload="metadata" aria-label="${item.title} 项目动态预览"></video>`
      : `<img class="card-media" src="${item.media}" alt="${item.title} 项目预览" loading="lazy" decoding="async" draggable="false">`;
    return `
    <${tag} class="project-card" data-index="${String(index + 1).padStart(2, "0")}" ${interactionAttributes}>
      <div class="card-visual">${media}</div>
      <div class="card-copy">
        <div class="card-meta"><span>${item.category}</span><span>${item.year}</span></div>
        <div class="card-detail"><div><h3>${item.title}</h3><p>${item.summary}</p></div>${canOpen ? '<span class="card-open">浏览 ↗</span>' : ""}</div>
      </div>
    </${tag}>`;
  }).join("");

  if (reducedMotion.matches) {
    track.querySelectorAll("video").forEach((media) => media.pause());
  }
}

function updatePdfModal() {
  const project = activeProjects[activePdfIndex];
  modalCategory.textContent = `${project.category} CASE`;
  modalProjectTitle.textContent = project.title;
  modalCounter.textContent = `${String(activePdfIndex + 1).padStart(2, "0")} / ${String(activeProjects.length).padStart(2, "0")}`;
  openPdfLink.href = project.pdf;
  pdfStage.classList.add("is-loading");
  imageLoading.textContent = "作品加载中…";
  projectImage.alt = `${project.title} 项目完整长图`;
  projectImage.src = project.preview;
  projectScroll.scrollTop = 0;
  previousPdf.disabled = activePdfIndex === 0;
  nextPdf.disabled = activePdfIndex === activeProjects.length - 1;
}

function openPdfProject(projects, index) {
  lastProjectTrigger = document.activeElement;
  activeProjects = projects;
  activePdfIndex = index;
  updatePdfModal();
  projectModal.showModal();
  document.getElementById("closeProjectModal").focus();
}

function closePdfProject() {
  projectModal.close();
  projectImage.removeAttribute("src");
  projectImage.alt = "";
  pdfStage.classList.add("is-loading");
  if (lastProjectTrigger?.isConnected) requestAnimationFrame(() => lastProjectTrigger.focus());
}

function movePdf(direction) {
  const nextIndex = Math.max(0, Math.min(activeProjects.length - 1, activePdfIndex + direction));
  if (nextIndex === activePdfIndex) return;
  activePdfIndex = nextIndex;
  updatePdfModal();
}

function setStill(index) {
  stillFrame.style.backgroundImage = `url("${sceneImages[index]}")`;
}

function seekVideo(targetTime, animate) {
  cancelAnimationFrame(animationFrame);
  if (reducedMotion.matches || video.readyState < 1) return;

  const startTime = Number.isFinite(video.currentTime) ? video.currentTime : videoAnchors[activeScene];
  if (!animate) {
    video.currentTime = targetTime;
    return;
  }

  const start = performance.now();
  const delta = targetTime - startTime;
  const tick = (now) => {
    const t = Math.min(1, (now - start) / transitionDuration);
    const eased = 1 - Math.pow(1 - t, 4);
    try { video.currentTime = startTime + delta * eased; } catch (_) { /* metadata may still be settling */ }
    if (t < 1) animationFrame = requestAnimationFrame(tick);
  };
  animationFrame = requestAnimationFrame(tick);
}

function syncProjectMedia(shouldPlay) {
  document.querySelectorAll("video.card-media").forEach((media) => {
    if (shouldPlay && !reducedMotion.matches) {
      media.play().catch(() => { /* muted previews may wait for the next user gesture */ });
    } else {
      media.pause();
    }
  });
}

function goToScene(nextScene, { animate = true } = {}) {
  const next = Math.max(0, Math.min(scenes.length - 1, nextScene));
  if (next === activeScene || sceneLocked) return;

  sceneLocked = true;
  activeScene = next;
  body.dataset.state = String(next);
  setStill(next);

  scenes.forEach((scene, index) => {
    const active = index === next;
    scene.classList.toggle("is-active", active);
    scene.setAttribute("aria-hidden", String(!active));
  });

  progressCurrent.textContent = String(next + 1).padStart(2, "0");
  progressBar.style.width = `${((next + 1) / scenes.length) * 100}%`;
  status.textContent = `第 ${next + 1} 屏，共 ${scenes.length} 屏：${sceneNames[next]}`;
  seekVideo(videoAnchors[next], animate);
  syncProjectMedia(next === scenes.length - 1);

  window.setTimeout(() => { sceneLocked = false; }, animate && !reducedMotion.matches ? transitionDuration : 180);
}

function handleWheel(event) {
  if (projectModal.open) return;
  const carousel = event.target.closest(".carousel");
  if (activeScene === scenes.length - 1 && carousel) {
    event.preventDefault();
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    carousel.scrollBy({ left: delta * 1.15, behavior: "auto" });
    return;
  }

  event.preventDefault();
  if (sceneLocked || Math.abs(event.deltaY) < 8) return;
  goToScene(activeScene + (event.deltaY > 0 ? 1 : -1));
}

function handleKey(event) {
  if (projectModal.open) {
    if (event.key === "Escape") {
      event.preventDefault();
      closePdfProject();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      movePdf(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      movePdf(1);
    }
    return;
  }
  const carousel = document.activeElement.closest?.(".carousel");
  if (activeScene === 4 && carousel && (event.key === "ArrowLeft" || event.key === "ArrowRight")) return;

  const forward = ["ArrowDown", "PageDown", " "];
  const backward = ["ArrowUp", "PageUp"];
  if (forward.includes(event.key)) {
    event.preventDefault();
    goToScene(activeScene + 1);
  } else if (backward.includes(event.key)) {
    event.preventDefault();
    goToScene(activeScene - 1);
  } else if (event.key === "Home") {
    event.preventDefault();
    goToScene(0);
  } else if (event.key === "End") {
    event.preventDefault();
    goToScene(4);
  }
}

function setupCarousel(row) {
  const carousel = row.querySelector(".carousel");
  const arrows = [...row.querySelectorAll(".carousel-arrow")];
  let dragging = false;
  let dragMoved = false;
  let startX = 0;
  let startScroll = 0;

  const cardStep = () => {
    const card = carousel.querySelector(".project-card");
    const gap = parseFloat(getComputedStyle(carousel.querySelector(".carousel-track")).gap) || 16;
    return (card?.getBoundingClientRect().width || 300) + gap;
  };

  const updateArrows = () => {
    const max = carousel.scrollWidth - carousel.clientWidth;
    arrows[0].disabled = carousel.scrollLeft <= 2;
    arrows[1].disabled = carousel.scrollLeft >= max - 2;
  };

  arrows.forEach((button) => button.addEventListener("click", () => {
    const direction = button.dataset.direction === "next" ? 1 : -1;
    carousel.scrollBy({ left: cardStep() * direction, behavior: reducedMotion.matches ? "auto" : "smooth" });
  }));

  carousel.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    carousel.scrollBy({ left: cardStep() * (event.key === "ArrowRight" ? 1 : -1), behavior: reducedMotion.matches ? "auto" : "smooth" });
  });

  carousel.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "touch") return;
    dragging = true;
    dragMoved = false;
    startX = event.clientX;
    startScroll = carousel.scrollLeft;
    carousel.classList.add("is-dragging");
  });

  carousel.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    if (Math.abs(event.clientX - startX) > 5) {
      dragMoved = true;
      if (!carousel.hasPointerCapture(event.pointerId)) carousel.setPointerCapture(event.pointerId);
    }
    carousel.scrollLeft = startScroll - (event.clientX - startX);
  });

  carousel.addEventListener("click", (event) => {
    if (!dragMoved) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    dragMoved = false;
  }, true);

  const stopDrag = () => {
    if (!dragging) return;
    dragging = false;
    carousel.classList.remove("is-dragging");
    carousel.scrollTo({ left: Math.round(carousel.scrollLeft / cardStep()) * cardStep(), behavior: reducedMotion.matches ? "auto" : "smooth" });
  };

  carousel.addEventListener("pointerup", stopDrag);
  carousel.addEventListener("pointercancel", stopDrag);
  carousel.addEventListener("scroll", updateArrows, { passive: true });
  window.addEventListener("resize", updateArrows);
  updateArrows();
}

renderProfile();
renderProjects(uiuxProjects, "uiuxTrack", true);
renderProjects(brandProjects, "brandTrack", true);
syncProjectMedia(false);
document.querySelectorAll(".project-row").forEach(setupCarousel);
badgeTrigger.addEventListener("click", dropIdentityBadge);

document.getElementById("uiuxTrack").addEventListener("click", (event) => {
  const card = event.target.closest("[data-pdf-index]");
  if (card) openPdfProject(uiuxProjects, Number(card.dataset.pdfIndex));
});
document.getElementById("brandTrack").addEventListener("click", (event) => {
  const card = event.target.closest("[data-pdf-index]");
  if (card) openPdfProject(brandProjects.filter((project) => project.pdf && project.preview), Number(card.dataset.pdfIndex));
});
document.getElementById("closeProjectModal").addEventListener("click", closePdfProject);
previousPdf.addEventListener("click", () => movePdf(-1));
nextPdf.addEventListener("click", () => movePdf(1));
projectImage.addEventListener("load", () => pdfStage.classList.remove("is-loading"));
projectImage.addEventListener("error", () => {
  pdfStage.classList.add("is-loading");
  imageLoading.textContent = "长图加载失败，请使用右上角打开原 PDF。";
});
projectModal.addEventListener("cancel", (event) => {
  event.preventDefault();
  closePdfProject();
});
projectModal.addEventListener("click", (event) => {
  if (event.target === projectModal) closePdfProject();
});

body.dataset.state = "0";
if (reducedMotion.matches) body.classList.add("reduced-motion");

video.addEventListener("loadedmetadata", () => {
  video.currentTime = videoAnchors[0];
});

video.addEventListener("canplay", () => {
  body.classList.add("video-ready");
}, { once: true });

video.addEventListener("error", () => {
  body.classList.remove("video-ready");
});

window.addEventListener("wheel", handleWheel, { passive: false });
window.addEventListener("keydown", handleKey);
window.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].clientX;
  touchStartY = event.changedTouches[0].clientY;
}, { passive: true });

window.addEventListener("touchend", (event) => {
  if (event.target.closest(".carousel")) return;
  const dx = event.changedTouches[0].clientX - touchStartX;
  const dy = event.changedTouches[0].clientY - touchStartY;
  if (Math.abs(dy) < 50 || Math.abs(dy) < Math.abs(dx)) return;
  goToScene(activeScene + (dy < 0 ? 1 : -1));
}, { passive: true });

reducedMotion.addEventListener?.("change", (event) => {
  body.classList.toggle("reduced-motion", event.matches);
  if (!event.matches) seekVideo(videoAnchors[activeScene], false);
  syncProjectMedia(activeScene === scenes.length - 1);
});
