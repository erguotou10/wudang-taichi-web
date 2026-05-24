/**
 * 工具函数
 */

/** 初始化 rpx 适配 */
export function initRpx() {
  function update() {
    document.documentElement.style.setProperty('--rpx', (window.innerWidth / 750) + 'px');
  }
  update();
  window.addEventListener('resize', update);
}

/** 显示 toast */
let toastTimer = null;
export function showToast(msg, duration = 1500) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), duration);
}

/** 格式化秒数为 HH:MM:SS */
export function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map(n => n < 10 ? '0' + n : '' + n).join(':');
}

/** 生成难度星级文本 */
export function starsText(difficulty) {
  return '★'.repeat(difficulty) + '☆'.repeat(3 - difficulty);
}

/** 生成随机 ID */
export function randomId() {
  return Math.random().toString(36).substr(2, 9);
}

/** 解析 URL hash 参数 */
export function parseHash(hash) {
  const clean = hash.replace(/^#\/?/, '');
  const [path, queryStr] = clean.split('?');
  const params = {};
  if (queryStr) {
    queryStr.split('&').forEach(pair => {
      const [key, val] = pair.split('=');
      params[decodeURIComponent(key)] = decodeURIComponent(val || '');
    });
  }
  return { path: '/' + path, params };
}

/** 防抖 */
export function debounce(fn, delay = 300) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
