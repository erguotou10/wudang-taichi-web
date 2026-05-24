/**
 * 武当太极导览 - SPA 主入口
 */
import { initRpx, showToast, parseHash } from './utils.js';
import { renderHome, destroyHome } from './pages/home.js';
import { renderGuide, destroyGuide } from './pages/guide.js';
import { renderTeachIndex } from './pages/teach-index.js';
import { renderTeachDetail, destroyTeachDetail } from './pages/teach-detail.js';
import { renderMine } from './pages/mine.js';

// 页面注册表
const PAGES = {
  '/':         { render: renderHome,        destroy: destroyHome,        tab: 0, title: '武当太极导览' },
  '/home':     { render: renderHome,        destroy: destroyHome,        tab: 0, title: '武当太极导览' },
  '/guide':    { render: renderGuide,       destroy: destroyGuide,       tab: 1, title: '武当山景区导览' },
  '/teach':    { render: renderTeachIndex,  destroy: null,               tab: 2, title: '太极教学' },
  '/teach/detail': { render: renderTeachDetail, destroy: destroyTeachDetail, tab: -1, title: '招式详情' },
  '/mine':     { render: renderMine,        destroy: null,               tab: 3, title: '我的' },
};

let currentPath = null;
let currentParams = {};

/** 初始化应用 */
function initApp() {
  initRpx();
  setupTabBar();
  setupRouter();

  // 初始路由
  handleRoute();
}

/** 设置 TabBar 点击事件 */
function setupTabBar() {
  document.querySelectorAll('.tab-item').forEach(item => {
    item.addEventListener('click', () => {
      const target = item.dataset.route;
      if (target) location.hash = '#' + target;
    });
  });
}

/** 设置路由监听 */
function setupRouter() {
  window.addEventListener('hashchange', handleRoute);
}

/** 处理路由变化 */
function handleRoute() {
  const { path, params } = parseHash(location.hash || '#/');
  const page = PAGES[path];

  if (!page) {
    location.hash = '#/';
    return;
  }

  // 销毁当前页面
  const prevPage = PAGES[currentPath];
  if (prevPage && prevPage.destroy) {
    prevPage.destroy();
  }

  currentPath = path;
  currentParams = params;

  // 更新页面标题
  document.getElementById('status-title').textContent = page.title;

  // 更新 TabBar 高亮 + 图标切换
  document.querySelectorAll('.tab-item').forEach((item, i) => {
    const isActive = i === page.tab;
    item.classList.toggle('active', isActive);
    const icon = item.dataset.icon;
    const img = item.querySelector('.tab-icon img');
    if (img && icon) {
      img.src = `assets/images/tabs/${icon}${isActive ? '-active' : ''}.png`;
    }
  });

  // 控制 TabBar 显示/隐藏（子页面隐藏 TabBar）
  const tabBar = document.querySelector('.tab-bar');
  tabBar.style.display = page.tab === -1 ? 'none' : '';

  // 渲染页面
  const container = document.getElementById('page-content');
  page.render(container, params);
}

// 暴露全局方法供 HTML 内联使用
window.showToast = showToast;

// 启动
document.addEventListener('DOMContentLoaded', initApp);
