const modes = {
  explore: {
    label: "探索",
    icon: "./assets/icon-explore.png",
    color: "pink",
    direction: "城市探索 / 周边发现 / 隐藏地点 / 彩蛋任务",
    prompt: "想去哪里看看？想室内还是室外？",
    dungeon: "附近彩蛋大冒险",
    task: "沿着最近的一条街走 20 分钟，记录 3 个平时忽略的地点。",
    place: "附近街区 / 河岸 / 商场外街",
    time: "30 分钟",
    social: "低社交，可邀请 1 位同行者",
    reward: "探索值 +10 / 彩蛋值 +10",
    npc: "彩蛋猎人：今天不需要去远方，你附近就有副本。",
  },
  social: {
    label: "社交",
    icon: "./assets/icon-social.png",
    color: "purple",
    direction: "组局 / 同副本群 / 新朋友 / 轻社交活动",
    prompt: "想认识新朋友，还是找熟人一起？",
    dungeon: "同行者广场",
    task: "选择今天想被如何陪伴，加入一个 20 分钟轻量副本。",
    place: "线上广场 / 附近玩家 / 同副本群",
    time: "20-30 分钟",
    social: "可单人浏览、双人或多人组队",
    reward: "连接值 +10 / 同行值 +5",
    npc: "篝火管理员：你不一定要一个人完成今天的副本。",
  },
  heal: {
    label: "治愈",
    icon: "./assets/icon-heal.png",
    color: "green",
    direction: "放松 / 自我照顾 / 慢节奏 / 情绪恢复",
    prompt: "想安静独处，还是想被轻轻陪伴？",
    dungeon: "云下花园",
    task: "找一个安静角落停留 3 分钟，记录一个让你觉得柔和的东西。",
    place: "家里 / 公园 / 咖啡店 / 安静书店",
    time: "10-20 分钟",
    social: "单人，低压力",
    reward: "治愈值 +10 / 稳定值 +5",
    npc: "云朵管理员：你不需要马上变好，先慢下来就可以。",
  },
  relax: {
    label: "放空",
    icon: "./assets/icon-relax.png",
    color: "blue",
    direction: "低能量模式 / 不用社交 / 轻任务 / 无压力",
    prompt: "想完全不思考，还是做一点轻松小事？",
    dungeon: "篝火牌桌",
    task: "开启 5-15 分钟快局，用低门槛游戏替代尬聊。",
    place: "线上房间",
    time: "5-15 分钟",
    social: "线上多人，低门槛破冰",
    reward: "娱乐值 +10 / 同行值 +5",
    npc: "篝火裁判：不想聊天也没关系，先打一局牌。",
  },
};

const worldTemplates = [
  {
    id: "cloud-garden",
    name: "云下花园",
    category: "治愈放松型",
    typeTags: ["治愈", "放松", "低压力"],
    suitableStates: ["焦虑", "心乱", "累了", "想安静", "不想社交"],
    entryCopy: "今天不需要打怪，只需要慢慢走一会儿。",
    mapStyle: "像素草地、湖边、风车、小木屋、植物、云朵、慢节奏背景",
    goal: "让情绪降下来，恢复稳定感。",
    estimatedDuration: "10-20 分钟",
    participation: ["单人"],
    locationMode: "hybrid",
    mapAreas: ["静音湖", "风车草地", "慢慢走小路", "树洞留言区", "月光休息点"],
    tasks: [
      "找一个安静角落停留 3 分钟",
      "拍下或记录一个让你觉得柔和的东西",
      "写下：我现在可以先不用解决所有问题",
      "完成一次深呼吸引导",
      "选择一个小奖励给自己",
    ],
    npcHints: [
      { npcName: "云朵管理员", text: "你不需要马上变好，先慢下来就可以。" },
      { npcName: "湖边旅人", text: "今天的任务不是前进，是恢复。" },
    ],
    aiLogic: [
      "压力较高时减少任务数量，只推荐低负担任务。",
      "用户愿意表达时，引导写下焦虑来源，并拆成一个很小的行动。",
    ],
    rewards: ["治愈值 +10", "稳定值 +5", "道具：云朵贴纸", "记录：今天我让自己慢了一点"],
  },
  {
    id: "nearby-easter-egg",
    name: "附近彩蛋大冒险",
    category: "附近探索型",
    typeTags: ["探索", "彩蛋", "现实观察"],
    suitableStates: ["无聊", "想出门", "想找点小刺激", "想重新观察现实"],
    entryCopy: "现实世界里藏着很多没被发现的小彩蛋。",
    mapStyle: "现实地图 + 像素传送门 + 彩蛋点位 + 小任务标记",
    goal: "把当前位置附近变成一张可探索地图。",
    estimatedDuration: "20-40 分钟",
    participation: ["单人", "双人"],
    locationMode: "nearby",
    mapAreas: ["红色物体搜寻区", "发光物观察点", "奇怪招牌街区", "可爱物捕捉点", "隐藏彩蛋上传点"],
    tasks: [
      "找到一个红色物体",
      "找到一个圆形物体",
      "找到一个会发光的东西",
      "记录一个以前没注意过的角落",
      "上传一个隐藏彩蛋",
    ],
    npcHints: [
      { npcName: "彩蛋猎人", text: "今天不需要去远方，你附近就有副本。" },
      { npcName: "街角商人", text: "你看到的每一个细节，都可能是地图碎片。" },
    ],
    aiLogic: [
      "结合位置、天气、时间推荐轻量路线。",
      "用户不想出门时改为室内彩蛋副本。",
    ],
    rewards: ["探索值 +10", "彩蛋值 +10", "道具：彩蛋雷达", "记录：我重新看了一次附近的世界"],
  },
  {
    id: "companion-plaza",
    name: "同行者广场",
    category: "社交连接型",
    typeTags: ["社交", "组队", "陪伴"],
    suitableStates: ["孤独", "想聊天", "想认识人", "想被理解", "想组队"],
    entryCopy: "你不一定要一个人完成今天的副本。",
    mapStyle: "像素广场、篝火、留言墙、组队入口、玩家头像气泡",
    goal: "找到一种轻量连接方式，不强迫深度社交。",
    estimatedDuration: "10-30 分钟",
    participation: ["单人浏览", "双人", "多人"],
    locationMode: "hybrid",
    mapAreas: ["篝火聊天区", "同状态玩家区", "临时组队入口", "匿名留言墙", "今日同行副本"],
    tasks: [
      "选择今天想被如何陪伴",
      "查看 3 个同状态玩家",
      "发送一个低压力互动",
      "加入一个 20 分钟轻量副本",
      "完成一次副本后互相留言",
    ],
    npcHints: [
      { npcName: "篝火管理员", text: "安静同行也算同行。" },
      { npcName: "组队向导", text: "先选强度，再决定要不要开口。" },
    ],
    aiLogic: ["按社交强度推荐匿名留言、轻聊天、组队任务或线下副本。"],
    rewards: ["连接值 +10", "同行值 +5", "道具：篝火徽章", "记录：今天我和世界产生了一点连接"],
    variants: [
      {
        id: "quiet-company",
        name: "安静同行",
        description: "双方不必聊天，只同步完成一个低压力任务。",
        playerCount: "2 人",
        tasks: ["选择一个共同任务", "同步打卡", "完成后互发表情贴纸"],
      },
    ],
  },
  {
    id: "level-training",
    name: "升级训练场",
    category: "成长行动型",
    typeTags: ["成长", "行动", "拖延解决"],
    suitableStates: ["迷茫", "想改变", "拖延", "想完成一件事", "想变好"],
    entryCopy: "不用一下子变强，先完成一个小动作。",
    mapStyle: "像素训练营、任务牌、技能树、进度条、升级光效",
    goal: "把现实中的问题转化成一个可完成的小任务。",
    estimatedDuration: "5-20 分钟",
    participation: ["单人"],
    locationMode: "hybrid",
    mapAreas: ["拖延怪营地", "技能树广场", "今日任务牌", "小目标训练区", "成就结算台"],
    tasks: [
      "说出今天最想推进的一件事",
      "AI 帮你拆成 3 个小动作",
      "选择一个 5 分钟内能完成的动作",
      "完成后打卡",
      "生成下一步行动建议",
    ],
    npcHints: [{ npcName: "训练官", text: "今天只需要赢一小局。" }],
    aiLogic: ["把大目标拆到 5 分钟内可开始，优先降低启动阻力。"],
    rewards: ["行动值 +10", "成长值 +8", "道具：小型经验药水", "记录：今天我完成了一个最小行动"],
  },
  {
    id: "food-street",
    name: "附近美食街",
    category: "探店社交型",
    typeTags: ["探店", "现实社交", "轻松组队"],
    suitableStates: ["无聊", "想出门", "想吃点好的", "想和朋友见面", "想轻松社交"],
    entryCopy: "今天不一定要去远方，也可以从一家小店进入大世界。",
    mapStyle: "像素城市街区、咖啡店、甜品店、小餐馆、夜市、便利店发光副本入口",
    goal: "根据位置、时间、心情、预算和人数生成探店任务。",
    estimatedDuration: "30-120 分钟",
    participation: ["单人", "双人", "多人"],
    locationMode: "nearby",
    mapAreas: ["咖啡店入口", "甜品店入口", "小吃店入口", "夜宵店入口", "盲盒探店门"],
    tasks: [
      "选择探店类型和预算",
      "AI 推荐 3 家附近小店",
      "投票选择最终店铺",
      "到店打卡",
      "完成等餐小游戏并生成探店记录",
    ],
    npcHints: [
      { npcName: "饭搭子管理员", text: "不一定很会聊天，一起吃点东西就够了。" },
      { npcName: "街角店主", text: "每一家小店，都是现实世界里的隐藏副本。" },
    ],
    aiLogic: [
      "焦虑时推荐安静、人少、灯光柔和的小店。",
      "无聊时推荐没去过、特色强的小店。",
      "疲惫时推荐近距离、低决策成本、高舒适度店铺。",
    ],
    rewards: ["探店值 +15", "连接值 +10", "道具：饭搭子徽章", "记录：今天我和一个人共享了一顿饭"],
    variants: [
      {
        id: "dinner-duo",
        name: "今晚一起吃点什么",
        description: "双人探店副本，适合想见朋友但不知道干什么。",
        playerCount: "2 人",
        tasks: ["双方选择偏好", "AI 推荐店铺", "到店拍照打卡", "互相写一句留言"],
      },
      {
        id: "food-party",
        name: "城市饭搭子集结",
        description: "多人探店局，通过投票和店内小游戏降低破冰压力。",
        playerCount: "3-6 人",
        tasks: ["创建房间", "选择主题", "匹配同状态玩家", "投票选店", "完成店内小游戏"],
      },
      {
        id: "food-blind-box",
        name: "不知道吃什么随机门",
        description: "预算、距离和禁忌确定后，由 AI 随机生成一家店。",
        playerCount: "1-4 人",
        tasks: ["选择预算", "选择距离", "排除不能接受的类型", "开启盲盒任务"],
      },
    ],
  },
  {
    id: "city-hide-seek",
    name: "城市藏匿场",
    category: "多人追逐型",
    typeTags: ["多人", "户外", "追逐", "城市游戏"],
    suitableStates: ["想玩点刺激的", "想多人互动", "想走路", "想破冰", "想参加线下活动"],
    entryCopy: "整座城市，今天都是你的游戏地图。",
    mapStyle: "现实地图 + 像素安全区 + 玩家头像点位 + 迷雾区域 + 倒计时",
    goal: "用公共安全区域承载多人城市捉迷藏。",
    estimatedDuration: "30-60 分钟",
    participation: ["3-12 人"],
    locationMode: "offline",
    mapAreas: ["安全集合点", "迷雾区", "补给点", "线索发布点", "最终安全区"],
    tasks: [
      "房主创建副本",
      "选择地图范围和安全集合点",
      "系统分配藏匿者、寻找者或旁观者",
      "AI 定时释放线索",
      "找到全部玩家后结算",
    ],
    npcHints: [{ npcName: "城市裁判", text: "刺激可以有，但安全边界要先画清楚。" }],
    aiLogic: ["生成安全边界、提示线索、刷新任务、控制强度。"],
    rewards: ["敏捷值 +10", "探索值 +10", "社交值 +8", "道具：隐身斗篷碎片"],
    variants: [
      {
        id: "classic-hide-seek",
        name: "城市藏匿赛",
        description: "经典寻找者与藏匿者规则，AI 分阶段释放线索。",
        playerCount: "3-8 人",
        tasks: ["创建房间", "准备时间", "追踪阶段", "线索阶段", "结算"],
      },
      {
        id: "reverse-hide-seek",
        name: "秘密集合点",
        description: "找到的人悄悄加入隐藏点，最后一个没找到的人失败。",
        playerCount: "4-12 人",
        tasks: ["一人先隐藏", "其他人寻找", "找到后保持沉默", "逐渐集合", "结算"],
      },
    ],
  },
  {
    id: "campfire-cards",
    name: "篝火牌桌",
    category: "线上破冰型",
    typeTags: ["线上", "多人", "破冰", "轻娱乐"],
    suitableStates: ["想轻松社交", "等人", "不想出门", "想破冰", "想和同行者玩一局"],
    entryCopy: "不想聊天也没关系，先打一局牌。",
    mapStyle: "像素篝火、牌桌、玩家头像、情绪卡、贴纸奖励",
    goal: "用低门槛线上小游戏降低社交压力。",
    estimatedDuration: "5-15 分钟",
    participation: ["2-10 人"],
    locationMode: "online",
    mapAreas: ["快速开局", "好友房", "同副本玩家房", "探店等待房", "今日情绪牌局"],
    tasks: [
      "加入牌桌",
      "完成一局快牌",
      "使用一次情绪牌",
      "给一位玩家发送贴纸",
      "获得牌局结算",
    ],
    npcHints: [{ npcName: "篝火裁判", text: "不需要刻意聊天，游戏会帮你们开场。" }],
    aiLogic: ["聊天意愿低时优先推荐牌桌、安静同行或等餐快局。"],
    rewards: ["娱乐值 +10", "同行值 +5", "道具：篝火牌手徽章"],
    variants: [
      {
        id: "earth-reverse-card",
        name: "地球反转牌",
        description: "四盒彩色牌玩法，加上 Moodie 情绪牌和轻问题。",
        playerCount: "2-10 人",
        tasks: ["匹配颜色或数字", "使用功能牌", "触发情绪牌", "最后一张前点击提示"],
      },
      {
        id: "dining-quick-card",
        name: "等餐反转牌",
        description: "探店等待场景自动开 3-5 分钟快局。",
        playerCount: "2-6 人",
        tasks: ["到店打卡", "开启快局", "输家抽轻惩罚任务", "赢家获得探店加成"],
      },
    ],
  },
];

const tabs = [
  { id: "hall", label: "大厅", icon: "./assets/tab-hall.png" },
  { id: "ai", label: "AI推荐", icon: "./assets/tab-ai.png" },
  { id: "world", label: "大世界", icon: "./assets/tab-world.png" },
  { id: "companions", label: "同行者", icon: "./assets/tab-companions.png" },
  { id: "profile", label: "玩家档案", icon: "./assets/tab-profile.png" },
];

const dungeonList = worldTemplates.slice(0, 7).map((world) => ({
  type: bestModeForWorld(world),
  title: world.name,
  desc: `${world.category} / ${world.estimatedDuration} / ${world.participation.join("、")}`,
  worldId: world.id,
}));

const hallDungeonModules = [
  {
    number: 1,
    worldId: "nearby-easter-egg",
    title: "附近彩蛋搜寻",
    tags: ["探索", "彩蛋"],
    image: "./assets/module-nearby-easter-egg.png",
    color: "pink",
    mood: "无聊 / 想找点小刺激 / 想轻松逛逛",
    time: "20-40分钟",
    party: "单人 / 双人",
    place: "当前位置附近",
    rewards: [
      { icon: "./assets/icon-explore.png", label: "彩蛋值 +10" },
      { icon: "./assets/ui-search.png", label: "探索值 +5" },
    ],
  },
  {
    number: 2,
    worldId: "cloud-garden",
    title: "植物观察副本",
    tags: ["治愈", "观察"],
    image: "./assets/module-plant-observation.png",
    color: "green",
    mood: "焦虑 / 心乱 / 需要平静",
    time: "15-30分钟",
    party: "单人 / 可分享",
    place: "公园 / 街边 / 阳台 / 室内植物旁",
    rewards: [
      { icon: "./assets/icon-heal.png", label: "治愈力 +12" },
      { icon: "./assets/ui-search.png", label: "观察力 +6" },
    ],
  },
  {
    number: 3,
    worldId: "companion-plaza",
    title: "附近同路人",
    tags: ["社交", "轻互动"],
    image: "./assets/module-companion-plaza.png",
    color: "purple",
    mood: "有点孤单 / 想说话 / 想认识新朋友",
    time: "15-30分钟",
    party: "双人 / 小队",
    place: "咖啡店 / 公园 / 共享空间",
    rewards: [
      { icon: "./assets/icon-social.png", label: "社交值 +10" },
      { icon: "./assets/ui-heart.png", label: "勇气值 +5" },
    ],
  },
  {
    number: 4,
    worldId: "cloud-garden",
    title: "云朵放空副本",
    tags: ["放空", "漫游"],
    image: "./assets/module-cloud-garden.png",
    color: "blue",
    mood: "脑子很满 / 疲惫 / 想安静一下",
    time: "10-20分钟",
    party: "单人",
    place: "街边 / 窗边 / 公园",
    rewards: [
      { icon: "./assets/icon-relax.png", label: "放空值 +12" },
      { icon: "./assets/ui-heart.png", label: "平静值 +6" },
    ],
  },
];

const quickReplies = ["一个人", "和别人一起", "附近完成", "线上完成", "轻松一点", "有点挑战", "30 分钟内"];

const companions = [
  { name: "像素小蓝", status: "正在探索附近彩蛋", tags: "城市漫游 / 低社交", intimacy: 78 },
  { name: "Mika", status: "想组治愈路线", tags: "咖啡店 / 慢节奏", intimacy: 64 },
  { name: "桥边玩家", status: "附近副本待组队", tags: "彩蛋收集 / 同城", intimacy: 52 },
];

const state = {
  screen: "login",
  page: "hall",
  selectedMode: "explore",
  activeWorldId: "nearby-easter-egg",
  dropdownOpen: false,
  chatInput: "",
  chat: [],
  planReady: false,
  saved: false,
  aiResult: loadSavedAiResult(),
  aiLoading: false,
  aiError: "",
  toast: "",
  worldFilter: "all",
  completedTasks: {},
  rewardModalOpen: false,
  taskModalOpen: false,
  activeConversation: null,
};

const app = document.querySelector("#app");

function currentMode() {
  return modes[state.selectedMode] || modes.explore;
}

function currentWorld() {
  return worldTemplates.find((world) => world.id === state.activeWorldId) || worldTemplates[0];
}

function currentRecommendation() {
  const world = currentWorld();
  const item = currentMode();
  const saved = state.aiResult || {};
  return {
    emotion: state.planReady ? "想用低阻力的方式进入今天的状态" : "等待聊天输入",
    needSummary: state.planReady ? `偏向${item.label}状态，需要一个清晰、可执行的现实任务。` : "等待 AI 探知你的今日需求。",
    dungeon: world.name,
    task: world.tasks[0],
    place: locationModeText(world.locationMode),
    time: world.estimatedDuration,
    social: world.participation.join("、"),
    reward: world.rewards.slice(0, 2).join(" / "),
    reason: `符合当前的${item.label}状态，${world.category}任务轻量、目标明确。`,
    npcTip: world.npcHints[0]?.text || item.npc,
    ...saved,
  };
}

function loadSavedAiResult() {
  try {
    const saved = window.localStorage.getItem("earth-online-ai-result");
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function saveAiResult(result) {
  try {
    window.localStorage.setItem("earth-online-ai-result", JSON.stringify(result));
  } catch {
    // localStorage can be unavailable in private or restricted browser contexts.
  }
}

function clearAiResult() {
  state.aiResult = null;
  try {
    window.localStorage.removeItem("earth-online-ai-result");
  } catch {
    // Keep in-memory state authoritative.
  }
}

function setState(next) {
  Object.assign(state, next);
  render();
}

function showToast(message) {
  setState({ toast: message });
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    if (state.toast === message) setState({ toast: "" });
  }, 1400);
}

function enterApp() {
  setState({ screen: "app", page: "hall", toast: "" });
}

function goPage(page) {
  setState({ screen: "app", page, dropdownOpen: false, toast: "", taskModalOpen: false });
}

function openConversation(type, title, subtitle = "") {
  setState({
    screen: "app",
    page: "conversation",
    activeConversation: {
      type,
      title,
      subtitle,
    },
    dropdownOpen: false,
    taskModalOpen: false,
    toast: "",
  });
}

function selectMode(mode) {
  const item = modes[mode];
  const world = bestWorldForMode(mode);
  clearAiResult();
  setState({
    selectedMode: mode,
    activeWorldId: world.id,
    page: "ai",
    dropdownOpen: false,
    planReady: false,
    aiLoading: false,
    aiError: "",
    chat: [
      { role: "ai", text: `你选择了「${item.label}」。今天想怎么进入这个状态？` },
      { role: "ai", text: item.prompt },
    ],
  });
}

function chooseDungeon(index) {
  const dungeon = dungeonList[index];
  const world = worldTemplates.find((item) => item.id === dungeon.worldId);
  clearAiResult();
  setState({
    selectedMode: dungeon.type,
    activeWorldId: dungeon.worldId,
    activeDungeon: dungeon.title,
    page: "world",
    dropdownOpen: false,
    planReady: true,
    toast: `已进入 ${world.name}`,
  });
}

function chooseWorld(worldId) {
  const world = worldTemplates.find((item) => item.id === worldId);
  if (!world) return;
  clearAiResult();
  setState({
    activeWorldId: worldId,
    selectedMode: bestModeForWorld(world),
    planReady: true,
    saved: false,
    rewardModalOpen: false,
    taskModalOpen: false,
  });
}

function enterWorld(worldId) {
  const world = worldTemplates.find((item) => item.id === worldId);
  if (!world) return;
  clearAiResult();
  setState({
    activeWorldId: worldId,
    selectedMode: bestModeForWorld(world),
    page: "world",
    planReady: true,
    saved: false,
    rewardModalOpen: false,
    taskModalOpen: false,
  });
}

async function sendChat(text) {
  if (state.aiLoading) return;
  const value = (text || state.chatInput).trim();
  if (!value) return;

  const nextChat = [
    ...state.chat,
    { role: "user", text: value },
    { role: "ai", text: "Earth Core 正在分析你的状态、地点和社交意愿..." },
  ];
  setState({ chat: nextChat, chatInput: "", aiLoading: true, aiError: "" });

  try {
    const result = await requestAiRecommendation(value, "analyze");
    const matchedWorld = matchWorldFromResult(result, value);
    const merged = normalizeAiResult(result, matchedWorld);
    saveAiResult(merged);
    setState({
      aiResult: merged,
      activeWorldId: matchedWorld.id,
      selectedMode: bestModeForWorld(matchedWorld),
      planReady: true,
      saved: false,
      aiLoading: false,
      chat: [
        ...nextChat.slice(0, -1),
        { role: "ai", text: `我推荐你进入「${matchedWorld.name}」。${merged.reason}` },
      ],
    });
  } catch (error) {
    const fallbackWorld = matchWorldFromResult(null, value);
    const fallback = normalizeAiResult(null, fallbackWorld);
    setState({
      activeWorldId: fallbackWorld.id,
      selectedMode: bestModeForWorld(fallbackWorld),
      aiResult: fallback,
      planReady: true,
      saved: false,
      aiLoading: false,
      aiError: error.message,
      chat: [
        ...nextChat.slice(0, -1),
        { role: "ai", text: `AI 请求失败，已使用本地大世界库推荐「${fallbackWorld.name}」。` },
      ],
    });
    showToast("AI 请求失败，已使用本地大世界库");
  }
}

async function rerollPlan() {
  if (state.aiLoading) return;
  const item = currentMode();
  const prompt = `请基于当前状态「${item.label}」重新生成一个更适合今天的大世界副本。`;
  const nextChat = [...state.chat, { role: "ai", text: "Earth Core 正在重新匹配大世界..." }];
  setState({ chat: nextChat, aiLoading: true, aiError: "" });

  try {
    const result = await requestAiRecommendation(prompt, "reroll");
    const matchedWorld = matchWorldFromResult(result, prompt);
    const merged = normalizeAiResult(result, matchedWorld);
    saveAiResult(merged);
    setState({
      aiResult: merged,
      activeWorldId: matchedWorld.id,
      selectedMode: bestModeForWorld(matchedWorld),
      planReady: true,
      saved: false,
      aiLoading: false,
      chat: [...nextChat.slice(0, -1), { role: "ai", text: `已重新推荐「${matchedWorld.name}」：${merged.reason}` }],
    });
  } catch (error) {
    const nextWorld = nextWorldTemplate();
    const fallback = normalizeAiResult(null, nextWorld);
    setState({
      activeWorldId: nextWorld.id,
      selectedMode: bestModeForWorld(nextWorld),
      aiResult: fallback,
      planReady: true,
      saved: false,
      aiLoading: false,
      aiError: error.message,
      chat: [...nextChat.slice(0, -1), { role: "ai", text: `重新推荐失败，已切换到本地副本「${nextWorld.name}」。` }],
    });
    showToast("已切换到本地大世界副本");
  }
}

async function requestAiRecommendation(message, intent) {
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      intent,
      message,
      modeId: state.selectedMode || "explore",
      mode: currentMode(),
      worldLibrary: worldTemplates.map(({ id, name, category, suitableStates, locationMode, estimatedDuration }) => ({
        id,
        name,
        category,
        suitableStates,
        locationMode,
        estimatedDuration,
      })),
      chat: state.chat,
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "AI service request failed.");
  }
  return data.result;
}

function render() {
  app.innerHTML = state.screen === "login" ? renderLogin() : renderApp();
  bindEvents();
}

function renderLogin() {
  return `
    <section class="screen login-screen" aria-label="地球 Online 登录页">
      <button class="login-button pixel-button" data-action="login">登入</button>
    </section>
  `;
}

function renderApp() {
  return `
    <section class="screen app-screen ${state.page === "hall" ? "hall-screen" : ""} ${state.page === "ai" ? "ai-screen" : ""}" aria-label="地球 Online">
      ${state.toast ? `<div class="toast">${state.toast}</div>` : ""}
      <div class="app-content">${renderPage()}</div>
      ${renderTabs()}
    </section>
  `;
}

function renderPage() {
  if (state.page === "ai") return renderAi();
  if (state.page === "world") return renderWorld();
  if (state.page === "companions") return renderCompanionsV2();
  if (state.page === "conversation") return renderConversation();
  if (state.page === "profile") return renderProfileV2();
  return renderHall();
}

function renderHall() {
  return `
    <section class="hall-hero" aria-label="大厅主视觉">
      <div class="hall-title">
        <img class="hall-title-logo" src="./assets/hall-title.png" alt="地球 online" />
      </div>
      <section class="hall-board" aria-label="大厅状态选择">
        <div class="hall-question">
          <span class="bubble-icon">?</span>
          <strong>今天想进入什么状态？</strong>
          <span class="heart-icon">+</span>
        </div>
        <div class="mode-grid">
          ${Object.entries(modes)
            .map(
              ([id, mode]) => `
              <button class="mode-card ${mode.color} ${state.selectedMode === id ? "selected" : ""}" data-action="select-mode" data-mode="${id}">
                <img class="mode-icon" src="${mode.icon}" alt="" />
                <span>${mode.label}</span>
              </button>
            `,
            )
            .join("")}
        </div>
        <button class="hall-start pixel-button" data-action="start-ai">进入 Earth Core</button>
      </section>
    </section>
    <section class="panel dungeon-panel">
      <div class="hall-module-head">
        <span>大世界推荐副本</span>
        <button class="mini-button" data-action="shuffle">换一批</button>
      </div>
      <div class="hall-module-grid">
        ${hallDungeonModules.map(renderHallDungeonModule).join("")}
      </div>
    </section>
  `;
}

function renderHallDungeonModule(module) {
  return `
    <button class="hall-dungeon-card ${module.color}" data-action="enter-world" data-world-id="${module.worldId}" aria-label="进入${escapeHtml(module.title)}">
      <div class="hall-dungeon-art">
        <img src="${module.image}" alt="" />
        <span class="hall-dungeon-number">${module.number}</span>
      </div>
      <div class="hall-dungeon-body">
        <h2>${escapeHtml(module.title)}</h2>
        <div class="hall-dungeon-tags">
          ${module.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
        </div>
        <dl class="hall-dungeon-meta">
          <div><dt><img src="./assets/ui-chat.png" alt="" /></dt><dd>${escapeHtml(module.mood)}</dd></div>
          <div><dt><img src="./assets/ui-scroll.png" alt="" /></dt><dd>${escapeHtml(module.time)}</dd></div>
          <div><dt><img src="./assets/ui-companion.png" alt="" /></dt><dd>${escapeHtml(module.party)}</dd></div>
          <div><dt><img src="./assets/ui-portal.png" alt="" /></dt><dd>${escapeHtml(module.place)}</dd></div>
        </dl>
        <div class="hall-dungeon-rewards">
          ${module.rewards.map((reward) => `<span><img src="${reward.icon}" alt="" />${escapeHtml(reward.label)}</span>`).join("")}
        </div>
      </div>
    </button>
  `;
}

function renderAi() {
  const item = currentMode();
  const disabled = state.aiLoading ? "disabled" : "";
  return `
    <section class="ai-room">
      <button class="ai-room-back" data-action="go-page" data-page="hall">‹</button>
      <img class="ai-room-bot" src="./assets/tab-ai.png" alt="" />
      <div class="ai-room-panel">
        <div class="ai-room-title">
          <img src="./assets/tab-ai.png" alt="" />
          <strong>Earth Core</strong>
        </div>
        <div class="chat-log ai-room-log">
          ${state.chat.length ? state.chat.map(renderMessage).join("") : renderEmptyAi(item)}
          ${renderPlan(item)}
        </div>
        <div class="room-divider"><span>*</span></div>
        <div class="quick-grid ai-room-quick">
          ${quickReplies.map((reply) => `<button class="quick-chip" data-action="quick-reply" data-text="${reply}" ${disabled}>${reply}</button>`).join("")}
        </div>
        <div class="chat-input-row ai-room-input">
          <input class="chat-input" data-role="chat-input" value="${escapeHtml(state.chatInput)}" placeholder="${state.aiLoading ? "Earth Core 正在生成..." : "输入你的想法..."}" ${disabled} />
          <button class="send-button ai-send-button" data-action="send-chat" ${disabled}>→</button>
        </div>
      </div>
    </section>
  `;
}

function renderEmptyAi(item) {
  return `
    ${renderMessage({ role: "ai", text: `你选择了「${item.label}」。今天想怎么进入这个状态？` })}
    ${renderMessage({ role: "ai", text: item.prompt })}
  `;
}

function renderMessage(message) {
  const avatar = message.role === "user" ? "./assets/tab-profile.png" : "./assets/tab-ai.png";
  return `
    <div class="message-row ${message.role}">
      <img class="message-avatar" src="${avatar}" alt="" />
      <div class="message ${message.role}">${escapeHtml(message.text)}</div>
    </div>
  `;
}

function renderPlan(item) {
  const plan = currentRecommendation();
  const primary = currentWorld();
  const cards = [primary, ...recommendAlternates(primary, 2)];
  const disabled = state.aiLoading ? "disabled" : "";

  return `
    <div class="message-row ai">
      <img class="message-avatar" src="./assets/tab-ai.png" alt="" />
      <div class="message ai recommendation-message">
        <p>${state.aiLoading ? "正在连接 DeepSeek 分析..." : `识别到：${escapeHtml(plan.emotion)}。${escapeHtml(plan.needSummary)}`}</p>
        <div class="recommendation-cards">
          ${cards.map((world, index) => renderRecommendationCard(world, item, index === 0)).join("")}
        </div>
        <div class="recommendation-actions">
          <button data-action="reroll" ${disabled}>${state.aiLoading ? "生成中" : "重新推荐"}</button>
          <button data-action="adjust">继续聊聊</button>
          <button data-action="save">${state.saved ? "已收藏" : "收藏"}</button>
        </div>
      </div>
    </div>
  `;
}

function renderRecommendationCard(world, item, isPrimary) {
  return `
    <article class="recommendation-card ${item.color}">
      <div class="recommendation-card-head">
        <img src="${modeIconForWorld(world)}" alt="" />
        <h3>${isPrimary ? "主推荐：" : "备选："}${escapeHtml(world.name)}</h3>
      </div>
      <p>${escapeHtml(world.entryCopy)}</p>
      <span>${escapeHtml(world.category)} · ${escapeHtml(world.estimatedDuration)} · ${escapeHtml(world.participation.join("、"))}</span>
      <strong>${escapeHtml(world.rewards.slice(0, 2).join(" / "))}</strong>
      <button data-action="enter-world" data-world-id="${world.id}">Online</button>
    </article>
  `;
}

function renderWorld() {
  const world = currentWorld();
  return `
    <section class="world-stage panel world-hero ${bestModeForWorld(world)}">
      <img class="world-stage-art" src="./assets/world-stage.png" alt="" />
      <div class="world-side-actions" aria-label="大世界快捷入口">
        <button class="world-side-button" data-action="open-task-modal" aria-label="今日任务">
          <img src="./assets/icon-task.png" alt="" />
        </button>
        <button class="world-side-button" data-action="open-world-chat" aria-label="进入当前副本群聊">
          <img src="./assets/icon-chat.png" alt="" />
        </button>
      </div>
      <button class="stage-pin pin-a" data-action="egg"><img src="./assets/ui-search.png" alt="" /><span>彩蛋</span></button>
      <button class="stage-pin pin-b" data-action="npc"><img src="./assets/ui-ai.png" alt="" /><span>NPC</span></button>
      <button class="stage-pin pin-c" data-action="scroll-detail"><img src="./assets/ui-portal.png" alt="" /><span>入口</span></button>
      <div class="world-title-badge">
        <strong>${escapeHtml(world.name)}</strong>
        <span>${escapeHtml(world.category)}</span>
      </div>
    </section>
    <section class="panel world-current">
      <div class="world-current-head">
        <div>
          <h2>当前副本</h2>
          <p>${escapeHtml(world.entryCopy)}</p>
        </div>
        <button class="mini-button icon-mini" data-action="online"><img src="./assets/ui-portal.png" alt="" />Online</button>
      </div>
      <div class="visual-meta-grid">
        <span><img src="./assets/ui-scroll.png" alt="" />${escapeHtml(world.estimatedDuration)}</span>
        <span><img src="./assets/ui-companion.png" alt="" />${escapeHtml(world.participation.join("、"))}</span>
        <span><img src="./assets/ui-search.png" alt="" />${escapeHtml(locationModeText(world.locationMode))}</span>
      </div>
    </section>
    ${renderTaskModal(world)}
    ${renderRewardModal(world)}
  `;
}

function renderWorldDetail(world) {
  const completed = getCompletedTaskSet(world.id);
  const visibleTasks = world.tasks.slice(0, 3);
  const allDone = visibleTasks.every((_, index) => completed.has(index));
  return `
    <section class="panel dungeon-detail" data-role="world-detail">
      <h3>今日任务</h3>
      <div class="task-node-grid">
        ${visibleTasks
          .map((task, index) => renderTaskNode(world.id, task, index, completed.has(index)))
          .join("")}
      </div>
      <div class="npc-grid">
        ${world.npcHints.slice(0, 1).map((npc) => `<button class="npc-card npc-visual-card" data-action="npc"><img src="./assets/ui-chat.png" alt="" /><strong>${escapeHtml(npc.npcName)}</strong><span>${escapeHtml(npc.text)}</span></button>`).join("")}
      </div>
      <div class="reward-claim-card ${allDone ? "ready" : "locked"}">
        <img src="./assets/ui-level.png" alt="" />
        <div>
          <strong>${allDone ? "奖励已解锁" : "完成全部任务后解锁"}</strong>
          <span>${completed.size}/${visibleTasks.length} 任务点</span>
        </div>
        <button class="small-button primary" data-action="claim-reward" ${allDone ? "" : "disabled"}>领取</button>
      </div>
      <div class="action-grid">
        <button class="small-button icon-action" data-action="go-page" data-page="ai"><img src="./assets/ui-ai.png" alt="" />换推荐</button>
        <button class="small-button icon-action" data-action="save"><img src="./assets/ui-heart.png" alt="" />收藏</button>
      </div>
    </section>
  `;
}

function renderTaskNode(worldId, task, index, done) {
  return `
    <button class="task-node ${done ? "done" : ""}" data-action="toggle-task" data-world-id="${worldId}" data-task-index="${index}">
      <img src="${taskIcon(index)}" alt="" />
      <strong>${index + 1}</strong>
      <span>${escapeHtml(shortTask(task))}</span>
    </button>
  `;
}

function renderTaskModal(world) {
  if (!state.taskModalOpen) return "";
  return `
    <div class="modal-backdrop" data-action="close-task-modal">
      <section class="task-modal" role="dialog" aria-modal="true" aria-label="今日任务">
        <button class="modal-close" data-action="close-task-modal">×</button>
        ${renderWorldDetail(world)}
      </section>
    </div>
  `;
}

function renderRewardModal(world) {
  if (!state.rewardModalOpen) return "";
  return `
    <div class="modal-backdrop" data-action="close-reward">
      <section class="reward-modal" role="dialog" aria-modal="true" aria-label="奖励结算">
        <button class="modal-close" data-action="close-reward">×</button>
        <img class="reward-modal-icon" src="./assets/ui-level.png" alt="" />
        <h2>奖励结算</h2>
        <p>${escapeHtml(world.name)} 已完成</p>
        <div class="reward-grid modal-rewards">
          ${world.rewards.slice(0, 4).map((reward, index) => `<span><img src="${rewardIcon(index)}" alt="" />${escapeHtml(reward)}</span>`).join("")}
        </div>
        <button class="wide-button pink" data-action="close-reward">收下</button>
      </section>
    </div>
  `;
}

function renderCompanions() {
  return `
    <section class="page-title-block">
      <h1>一起 Online 的人</h1>
      <p>同副本群 / 副本好友 / 私聊 / 邀请组队</p>
    </section>
    <section class="panel">
      <h2>同副本群</h2>
      <div class="entry-list">
        ${["当前副本群", "已完成副本群", "推荐副本群", "附近副本群"].map((title) => `<button class="entry-row" data-action="chat"><strong>${title}</strong><span>进入群聊</span></button>`).join("")}
      </div>
    </section>
    <section class="panel">
      <h2>副本好友</h2>
      <div class="friend-list">
        ${companions
          .map(
            (friend) => `
              <article class="friend-card">
                <div class="avatar">${escapeHtml(friend.name.slice(0, 1))}</div>
                <div>
                  <h3>${escapeHtml(friend.name)}</h3>
                  <p>${escapeHtml(friend.status)}</p>
                  <p>${escapeHtml(friend.tags)} · 亲密度 ${friend.intimacy}</p>
                </div>
                <button class="mini-button" data-action="chat">私聊</button>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
    <section class="panel chat-preview">
      <h2>快捷互动</h2>
      <div class="quick-grid">
        <button class="quick-chip" data-action="chat">私聊</button>
        <button class="quick-chip" data-action="chat">群聊</button>
        <button class="quick-chip" data-action="chat">快捷状态</button>
        <button class="quick-chip" data-action="chat">快捷表情</button>
        <button class="quick-chip" data-action="invite">邀请进入副本</button>
      </div>
    </section>
  `;
}

function renderCompanionsV2() {
  const groups = ["当前副本群", "已完成副本群", "推荐副本群", "附近副本群"];
  return `
    <section class="page-title-block">
      <h1>一起 Online 的人</h1>
      <p>同副本群 / 副本好友 / 私聊 / 邀请组队</p>
    </section>
    <section class="panel">
      <h2>同副本群</h2>
      <div class="entry-list">
        ${groups
          .map(
            (title) => `
              <button class="entry-row" data-action="open-group-chat" data-title="${escapeHtml(title)}" data-subtitle="群聊 · ${escapeHtml(currentWorld().name)}">
                <strong>${escapeHtml(title)}</strong>
                <span>进入群聊</span>
              </button>
            `,
          )
          .join("")}
      </div>
    </section>
    <section class="panel">
      <h2>副本好友</h2>
      <div class="friend-list">
        ${companions
          .map(
            (friend) => `
              <article class="friend-card">
                <div class="avatar">${escapeHtml(friend.name.slice(0, 1))}</div>
                <div>
                  <h3>${escapeHtml(friend.name)}</h3>
                  <p>${escapeHtml(friend.status)}</p>
                  <p>${escapeHtml(friend.tags)} · 亲密度 ${friend.intimacy}</p>
                </div>
                <button class="mini-button" data-action="open-private-chat" data-title="${escapeHtml(friend.name)}" data-subtitle="${escapeHtml(friend.status)}">私聊</button>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
    <section class="panel chat-preview">
      <h2>快捷互动</h2>
      <div class="quick-grid">
        <button class="quick-chip" data-action="open-private-chat" data-title="${escapeHtml(companions[0].name)}" data-subtitle="${escapeHtml(companions[0].status)}">私聊</button>
        <button class="quick-chip" data-action="open-group-chat" data-title="当前副本群" data-subtitle="群聊 · ${escapeHtml(currentWorld().name)}">群聊</button>
        <button class="quick-chip" data-action="chat">快捷状态</button>
        <button class="quick-chip" data-action="chat">快捷表情</button>
        <button class="quick-chip" data-action="invite">邀请进入副本</button>
      </div>
    </section>
  `;
}

function renderConversation() {
  const conversation = state.activeConversation || {
    type: "group",
    title: "当前副本群",
    subtitle: `群聊 · ${currentWorld().name}`,
  };
  const isGroup = conversation.type === "group";
  const messages = isGroup
    ? [
        { role: "ai", text: "欢迎进入副本群聊，可以在这里同步任务进度。" },
        { role: "user", text: "我准备先完成第一个任务点。" },
        { role: "ai", text: "收到，同行者会看到你的状态更新。" },
      ]
    : [
        { role: "ai", text: `${conversation.title} 正在等待你的消息。` },
        { role: "user", text: "要不要一起进一个轻量副本？" },
        { role: "ai", text: "可以先发送邀请，也可以继续聊聊偏好。" },
      ];

  return `
    <section class="conversation-page">
      <div class="conversation-header panel">
        <button class="back-button" data-action="go-page" data-page="companions">‹</button>
        <div>
          <p class="eyebrow">${isGroup ? "群聊" : "私聊"}</p>
          <h1>${escapeHtml(conversation.title)}</h1>
          <p>${escapeHtml(conversation.subtitle)}</p>
        </div>
      </div>
      <section class="conversation-thread panel">
        ${messages.map(renderMessage).join("")}
      </section>
      <section class="conversation-compose panel">
        <div class="quick-grid">
          <button class="quick-chip" data-action="chat">${isGroup ? "同步进度" : "发送问候"}</button>
          <button class="quick-chip" data-action="invite">邀请副本</button>
          <button class="quick-chip" data-action="chat">发送表情</button>
        </div>
        <div class="chat-input-row">
          <input class="chat-input" value="" placeholder="${isGroup ? "在群聊里输入..." : "给对方发消息..."}" />
          <button class="voice-button" data-action="chat">语音</button>
          <button class="send-button" data-action="chat">发送</button>
        </div>
      </section>
    </section>
  `;
}

function renderProfile() {
  const item = currentMode();
  return `
    <section class="profile-head panel">
      <div class="avatar big">旅</div>
      <div>
        <h1>像素旅人</h1>
        <p>Lv.07 · 城市漫游者 · 当前状态：${escapeHtml(item.label)}</p>
      </div>
      <button class="mini-button" data-action="edit-profile">编辑资料</button>
    </section>
    ${renderProfileSection("我的状态偏好", ["常选分类：探索 / 治愈", "最近推荐记录：7 条", "AI 了解我的需求记录：12 次"])}
    ${renderProfileSection("我的副本", ["正在进行：1", "已完成：23", "收藏副本：5", "创建过的副本：3", `最近进入：${currentWorld().name}`])}
    ${renderProfileSection("成就", ["探索成就：街角发现者", "社交成就：轻组局发起人", "治愈成就：慢速恢复", "彩蛋收集：9", "连续 Online 天数：4"])}
    ${renderProfileSection("设置", ["账号设置", "隐私设置", "通知设置", "定位设置", "关于地球 Online"])}
  `;
}

function renderProfileSection(title, rows) {
  return `
    <section class="panel">
      <h2>${escapeHtml(title)}</h2>
      <div class="profile-rows">
        ${rows.map((row) => `<button class="profile-row" data-action="profile-row">${escapeHtml(row)}</button>`).join("")}
      </div>
    </section>
  `;
}

function renderProfileV2() {
  const item = currentMode();
  return `
    <section class="profile-hero">
      <img class="profile-hero-art" src="./assets/profile-hero.png" alt="" />
      <div class="profile-identity">
        <div class="profile-avatar"><img src="./assets/tab-profile.png" alt="" /></div>
        <div>
          <h1>像素旅人</h1>
          <p>Lv.07 · 城市漫游者 · ${escapeHtml(item.label)}</p>
        </div>
        <button class="profile-icon-button" data-action="edit-profile" aria-label="编辑资料">
          <img src="./assets/ui-ai.png" alt="" />
        </button>
      </div>
    </section>
    <section class="profile-stats" aria-label="玩家状态">
      ${renderProfileStat("./assets/ui-level.png", "23", "已完成")}
      ${renderProfileStat("./assets/ui-search.png", "8", "彩蛋")}
      ${renderProfileStat("./assets/ui-heart.png", "12", "成就")}
    </section>
    <section class="profile-icon-section">
      <div class="profile-section-head">
        <h2>我的副本</h2>
        <span>${escapeHtml(currentWorld().name)}</span>
      </div>
      <div class="profile-action-grid">
        ${renderProfileAction("./assets/tab-world.png", "当前世界", "进入最近副本", "go-page", "world")}
        ${renderProfileAction("./assets/ui-scroll.png", "任务记录", "23 次完成", "profile-row")}
        ${renderProfileAction("./assets/ui-search.png", "彩蛋收集", "8 个发现", "profile-row")}
        ${renderProfileAction("./assets/ui-level.png", "成就徽章", "12 枚点亮", "profile-row")}
      </div>
    </section>
    <section class="profile-icon-section compact">
      <div class="profile-section-head">
        <h2>设置</h2>
        <span>少打扰模式</span>
      </div>
      <div class="profile-settings-row">
        ${renderProfileSetting("./assets/tab-profile.png", "账号", "edit-profile")}
        ${renderProfileSetting("./assets/ui-chat.png", "通知", "profile-row")}
        ${renderProfileSetting("./assets/ui-portal.png", "定位", "profile-row")}
      </div>
    </section>
  `;
}

function renderProfileStat(icon, value, label) {
  return `
    <button class="profile-stat" data-action="profile-row">
      <span class="profile-icon" style="--profile-icon: url('${icon}')"></span>
      <strong>${value}</strong>
      <span>${label}</span>
    </button>
  `;
}

function renderProfileAction(icon, title, meta, action, page = "") {
  return `
    <button class="profile-action" data-action="${action}" ${page ? `data-page="${page}"` : ""}>
      <span class="profile-icon" style="--profile-icon: url('${icon}')"></span>
      <strong>${title}</strong>
      <span>${meta}</span>
    </button>
  `;
}

function renderProfileSetting(icon, label, action) {
  return `
    <button class="profile-setting" data-action="${action}">
      <span class="profile-icon" style="--profile-icon: url('${icon}')"></span>
      <span>${label}</span>
    </button>
  `;
}

function renderTabs() {
  return `
    <nav class="tab-bar" aria-label="底部导航">
      ${tabs
        .map(
          (tab) => `
            <button class="tab ${state.page === tab.id ? "active" : ""}" data-action="go-page" data-page="${tab.id}">
              <span class="tab-icon"><img src="${tab.icon}" alt="" /></span>
              <span>${tab.label}</span>
            </button>
          `,
        )
        .join("")}
    </nav>
  `;
}

function bindEvents() {
  app.querySelectorAll("[data-action]").forEach((element) => {
    element.addEventListener("click", (event) => {
      const action = element.dataset.action;
      if (action === "login") return enterApp();
      if (action === "go-page") return goPage(element.dataset.page);
      if (action === "select-mode") return selectMode(element.dataset.mode);
      if (action === "start-ai") return state.selectedMode ? goPage("ai") : showToast("请先选择一个状态");
      if (action === "toggle-dropdown") return setState({ dropdownOpen: !state.dropdownOpen });
      if (action === "choose-dungeon") return chooseDungeon(Number(element.dataset.index));
      if (action === "shuffle") return showToast("已换一批推荐副本");
      if (action === "quick-reply") return sendChat(element.dataset.text);
      if (action === "send-chat") return sendChat();
      if (action === "reroll") return rerollPlan();
      if (action === "adjust") return showToast("继续在聊天区补充需求");
      if (action === "save") return setState({ saved: true, toast: "已收藏副本" });
      if (action === "online") return goPage("world");
      if (action === "enter-world") return enterWorld(element.dataset.worldId);
      if (action === "select-world") return chooseWorld(element.dataset.worldId);
      if (action === "filter-worlds") return setState({ worldFilter: element.dataset.filter });
      if (action === "toggle-task") return toggleTask(element.dataset.worldId, Number(element.dataset.taskIndex));
      if (action === "claim-reward") return claimReward();
      if (action === "close-reward") {
        if (element.classList.contains("modal-backdrop") && event.target !== element) return;
        return setState({ rewardModalOpen: false });
      }
      if (action === "open-task-modal") return setState({ taskModalOpen: true });
      if (action === "close-task-modal") {
        if (element.classList.contains("modal-backdrop") && event.target !== element) return;
        return setState({ taskModalOpen: false });
      }
      if (action === "open-world-chat") return openConversation("group", "当前副本群", `群聊 · ${currentWorld().name}`);
      if (action === "npc") return showToast(currentWorld().npcHints[0]?.text || currentRecommendation().npcTip);
      if (action === "egg") return showToast("发现彩蛋：今日灵感碎片 +1");
      if (action === "scroll-detail") return scrollToDetail();
      if (action === "add-friend") return showToast("已添加副本好友");
      if (action === "complete") return claimReward();
      if (action === "open-group-chat") return openConversation("group", element.dataset.title, element.dataset.subtitle);
      if (action === "open-private-chat") return openConversation("private", element.dataset.title, element.dataset.subtitle);
      if (action === "chat") return showToast("聊天入口已打开");
      if (action === "invite") return showToast("已发送组队邀请");
      if (action === "edit-profile") return showToast("资料编辑入口已打开");
      if (action === "profile-row") return showToast("条目已选中");
    });
  });

  const input = app.querySelector('[data-role="chat-input"]');
  if (input) {
    input.addEventListener("input", (event) => {
      state.chatInput = event.target.value;
    });
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") sendChat();
    });
  }
}

function scrollToDetail() {
  const detail = app.querySelector('[data-role="world-detail"]');
  detail?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function getCompletedTaskSet(worldId) {
  return new Set(state.completedTasks[worldId] || []);
}

function toggleTask(worldId, taskIndex) {
  if (!worldId || Number.isNaN(taskIndex)) return;
  const completed = getCompletedTaskSet(worldId);
  if (completed.has(taskIndex)) {
    completed.delete(taskIndex);
  } else {
    completed.add(taskIndex);
  }
  setState({
    completedTasks: {
      ...state.completedTasks,
      [worldId]: [...completed].sort((a, b) => a - b),
    },
  });
}

function claimReward() {
  const world = currentWorld();
  const completed = getCompletedTaskSet(world.id);
  const requiredCount = Math.min(world.tasks.length, 3);
  if (completed.size < requiredCount) {
    return showToast(`还差 ${requiredCount - completed.size} 个任务点`);
  }
  setState({ rewardModalOpen: true });
}

function areaIcon(index) {
  return ["./assets/ui-portal.png", "./assets/ui-search.png", "./assets/ui-heart.png", "./assets/ui-ai.png", "./assets/ui-chat.png"][index % 5];
}

function taskIcon(index) {
  return ["./assets/ui-search.png", "./assets/ui-scroll.png", "./assets/ui-heart.png", "./assets/ui-companion.png", "./assets/ui-level.png"][index % 5];
}

function rewardIcon(index) {
  return ["./assets/ui-level.png", "./assets/ui-heart.png", "./assets/ui-scroll.png", "./assets/ui-search.png"][index % 4];
}

function shortTask(task) {
  const text = String(task || "").replace(/^[0-9.、\s]+/, "");
  return text.length > 18 ? `${text.slice(0, 18)}...` : text;
}

function bestWorldForMode(mode) {
  if (mode === "heal") return worldTemplates.find((world) => world.id === "cloud-garden");
  if (mode === "social") return worldTemplates.find((world) => world.id === "companion-plaza");
  if (mode === "relax") return worldTemplates.find((world) => world.id === "campfire-cards");
  return worldTemplates.find((world) => world.id === "nearby-easter-egg");
}

function bestModeForWorld(world) {
  if (world.category.includes("治愈") || world.id === "cloud-garden") return "heal";
  if (world.category.includes("社交") || world.category.includes("多人") || world.id === "companion-plaza") return "social";
  if (world.locationMode === "online" || world.id === "campfire-cards") return "relax";
  return "explore";
}

function modeIconForWorld(world) {
  return modes[bestModeForWorld(world)].icon;
}

function locationModeText(mode) {
  return {
    online: "线上",
    nearby: "当前位置附近",
    offline: "线下公共安全区域",
    hybrid: "线上 / 附近 / 现实执行",
  }[mode] || "混合";
}

function matchWorldFromResult(result, userText = "") {
  const source = `${result?.dungeon || ""} ${result?.reason || ""} ${result?.task || ""} ${userText}`;
  const byName = worldTemplates.find((world) => source.includes(world.name));
  if (byName) return byName;

  const rules = [
    [/焦虑|心乱|累|安静|治愈|放松|低压/, "cloud-garden"],
    [/出门|附近|走走|彩蛋|观察|探索/, "nearby-easter-egg"],
    [/孤独|聊天|陪|组队|认识|社交|朋友/, "companion-plaza"],
    [/拖延|行动|改变|完成|计划|问题/, "level-training"],
    [/吃|饭|店|咖啡|探店|见面/, "food-street"],
    [/刺激|多人|捉迷藏|追逐|户外|运动/, "city-hide-seek"],
    [/牌|UNO|反转|线上|等人|破冰|不想聊/, "campfire-cards"],
  ];
  const matched = rules.find(([pattern]) => pattern.test(source));
  return worldTemplates.find((world) => world.id === (matched?.[1] || bestWorldForMode(state.selectedMode).id));
}

function normalizeAiResult(result, world) {
  return {
    emotion: safeText(result?.emotion, "想用低阻力的方式进入今天的状态"),
    needSummary: safeText(result?.needSummary, `适合进入「${world.name}」，用一个轻量副本承接今天的需求。`),
    dungeon: world.name,
    task: safeText(result?.task, world.tasks[0]),
    place: safeText(result?.place, locationModeText(world.locationMode)),
    time: safeText(result?.time, world.estimatedDuration),
    social: safeText(result?.social, world.participation.join("、")),
    reward: safeText(result?.reward, world.rewards.slice(0, 2).join(" / ")),
    reason: safeText(result?.reason, world.entryCopy),
    npcTip: safeText(result?.npcTip, world.npcHints[0]?.text || "先完成一个小行动，再决定是否继续。"),
  };
}

function recommendAlternates(primary, count) {
  return worldTemplates.filter((world) => world.id !== primary.id).slice(0, count);
}

function nextWorldTemplate() {
  const index = worldTemplates.findIndex((world) => world.id === state.activeWorldId);
  return worldTemplates[(index + 1 + worldTemplates.length) % worldTemplates.length];
}

function safeText(value, fallback) {
  return typeof value === "string" && value.trim() ? value.trim().slice(0, 220) : fallback;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

render();
