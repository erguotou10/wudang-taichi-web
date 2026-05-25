/**
 * 我的子页面 - 徽章墙 / 学习计划 / 收藏
 */
import { moves, badges } from '../mock-data.js';
import { starsText, showToast } from '../utils.js';

const STORAGE_KEY_FAVS = 'wudang_fav_moves';
const STORAGE_KEY_PLAN = 'wudang_plan';

function getFavMoves() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY_FAVS) || '[]'); } catch { return []; }
}

function getPlan() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY_PLAN) || '[]'); } catch { return []; }
}

function getCheckinCount() {
  try {
    const checkins = JSON.parse(localStorage.getItem('wudang_checkins') || '{}');
    return Object.keys(checkins).length;
  } catch { return 0; }
}

// ---- 徽章墙 ----
export function renderBadges(container) {
  const checkinCount = getCheckinCount();

  function isEarned(badge) {
    if (badge.condition.type === 'totalCheckIns') return checkinCount >= badge.condition.value;
    if (badge.condition.type === 'streak') return false; // simplified
    if (badge.condition.type === 'movesCompleted') return false;
    return false;
  }

  container.innerHTML = `
    <div class="page active" id="page-badges">
      <div class="detail-nav">
        <span class="nav-back" id="badges-back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
        </span>
        <span class="nav-title">成就徽章</span>
        <span class="nav-right"></span>
      </div>
      <div class="badges-header">
        <div class="badges-count">${badges.filter(isEarned).length} / ${badges.length}</div>
        <div class="badges-label">已获得徽章</div>
      </div>
      <div class="badges-grid">
        ${badges.map(badge => {
          const earned = isEarned(badge);
          return `
            <div class="badge-item ${earned ? 'earned' : 'locked'}">
              <div class="badge-icon">${badge.icon}</div>
              <div class="badge-name">${badge.name}</div>
              ${!earned ? '<div class="badge-lock"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zm-3 2h-2v-2a2 2 0 1 0-4 0v2H8v-2a4 4 0 1 1 8 0v2z"/></svg></div>' : ''}
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  document.getElementById('badges-back')?.addEventListener('click', () => location.hash = '#/mine');
}

export function destroyBadges() {}

// ---- 学习计划 ----
export function renderPlan(container) {
  const planIds = getPlan();
  const planMoves = planIds.map(id => moves.find(m => m._id === id)).filter(Boolean);
  const allMoves = moves;

  container.innerHTML = `
    <div class="page active" id="page-plan">
      <div class="detail-nav">
        <span class="nav-back" id="plan-back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
        </span>
        <span class="nav-title">学习计划</span>
        <span class="nav-right" id="plan-add-btn" style="cursor:pointer;font-size:13px;color:#d4a574">+ 添加</span>
      </div>
      ${planMoves.length === 0 ? `
        <div class="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d8cfc5" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg>
          <div class="empty-text">还没有学习计划</div>
          <div class="empty-sub">点击右上角「+ 添加」招式到计划中</div>
        </div>
      ` : `
        <div class="plan-list">
          ${planMoves.map((m, i) => `
            <div class="plan-item" data-id="${m._id}">
              <div class="plan-num">${i + 1}</div>
              <div class="plan-info">
                <div class="plan-name">${m.name}</div>
                <div class="plan-meta">${starsText(m.difficulty)} · ${m.duration}秒</div>
              </div>
              <div class="plan-remove" data-id="${m._id}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </div>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;

  document.getElementById('plan-back')?.addEventListener('click', () => location.hash = '#/mine');

  // 添加招式到计划
  document.getElementById('plan-add-btn')?.addEventListener('click', () => {
    const plan = getPlan();
    const available = allMoves.filter(m => !plan.includes(m._id));
    if (available.length === 0) {
      showToast('所有招式都已在计划中');
      return;
    }
    const next = available[0];
    plan.push(next._id);
    localStorage.setItem(STORAGE_KEY_PLAN, JSON.stringify(plan));
    showToast(`已添加「${next.name}」到计划`);
    renderPlan(container);
  });

  // 移除招式
  container.querySelectorAll('.plan-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const plan = getPlan().filter(pid => pid !== id);
      localStorage.setItem(STORAGE_KEY_PLAN, JSON.stringify(plan));
      showToast('已移除');
      renderPlan(container);
    });
  });

  // 点击招式跳转详情
  container.querySelectorAll('.plan-item').forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.closest('.plan-remove')) return;
      location.hash = '#/teach/detail?id=' + item.dataset.id;
    });
  });
}

export function destroyPlan() {}

// ---- 收藏列表 ----
export function renderFavorites(container) {
  const favIds = getFavMoves();
  const favMoves = favIds.map(id => moves.find(m => m._id === id)).filter(Boolean);

  container.innerHTML = `
    <div class="page active" id="page-favorites">
      <div class="detail-nav">
        <span class="nav-back" id="fav-back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
        </span>
        <span class="nav-title">招式收藏</span>
        <span class="nav-right"></span>
      </div>
      ${favMoves.length === 0 ? `
        <div class="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d8cfc5" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/></svg>
          <div class="empty-text">还没有收藏招式</div>
          <div class="empty-sub">在招式详情页点击「收藏」即可添加</div>
        </div>
      ` : `
        <div class="fav-list">
          ${favMoves.map(m => `
            <div class="fav-item" data-id="${m._id}">
              <div class="fav-info">
                <div class="fav-name">${m.name}</div>
                <div class="fav-meta">${starsText(m.difficulty)} · ${m.duration}秒</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;

  document.getElementById('fav-back')?.addEventListener('click', () => location.hash = '#/mine');
  container.querySelectorAll('.fav-item').forEach(item => {
    item.addEventListener('click', () => location.hash = '#/teach/detail?id=' + item.dataset.id);
  });
}

export function destroyFavorites() {}

// ---- 设置页面 ----
export function renderSettings(container) {
  const level = localStorage.getItem('wudang_level') || 'beginner';
  const levelLabels = { beginner: '初学者', intermediate: '进阶', advanced: '高级' };

  container.innerHTML = `
    <div class="page active" id="page-settings">
      <div class="detail-nav">
        <span class="nav-back" id="settings-back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
        </span>
        <span class="nav-title">设置</span>
        <span class="nav-right"></span>
      </div>

      <div class="settings-section">
        <div class="settings-section-title">个人信息</div>
        <div class="settings-item" id="settings-level">
          <span class="settings-label">太极水平</span>
          <span class="settings-value">${levelLabels[level]}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      </div>

      <div class="settings-section">
        <div class="settings-section-title">通知</div>
        <div class="settings-item">
          <span class="settings-label">打卡提醒</span>
          <label class="settings-switch">
            <input type="checkbox" id="settings-notify" ${localStorage.getItem('wudang_notify') !== 'off' ? 'checked' : ''}>
            <span class="settings-switch-slider"></span>
          </label>
        </div>
      </div>

      <div class="settings-section">
        <div class="settings-section-title">存储</div>
        <div class="settings-item" id="settings-clear-cache">
          <span class="settings-label">清除缓存</span>
          <span class="settings-value" id="cache-size">计算中...</span>
        </div>
      </div>

      <div class="settings-section">
        <div class="settings-section-title">关于</div>
        <div class="settings-item">
          <span class="settings-label">版本</span>
          <span class="settings-value">v1.0.0</span>
        </div>
        <div class="settings-item">
          <span class="settings-label">项目</span>
          <span class="settings-value">武当太极导览</span>
        </div>
      </div>

      <div class="settings-footer">武当太极导览 Web 版 · 传承太极文化</div>
    </div>
  `;

  // 计算缓存大小
  let totalSize = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('wudang_')) {
      totalSize += (localStorage.getItem(key) || '').length;
    }
  }
  const sizeEl = document.getElementById('cache-size');
  if (sizeEl) sizeEl.textContent = totalSize > 1024 ? (totalSize / 1024).toFixed(1) + ' KB' : totalSize + ' B';

  document.getElementById('settings-back')?.addEventListener('click', () => location.hash = '#/mine');

  // 太极水平切换
  document.getElementById('settings-level')?.addEventListener('click', () => {
    const levels = ['beginner', 'intermediate', 'advanced'];
    const idx = (levels.indexOf(level) + 1) % levels.length;
    localStorage.setItem('wudang_level', levels[idx]);
    showToast(`已切换为「${levelLabels[levels[idx]]}」`);
    renderSettings(container);
  });

  // 通知开关
  document.getElementById('settings-notify')?.addEventListener('change', (e) => {
    localStorage.setItem('wudang_notify', e.target.checked ? 'on' : 'off');
    showToast(e.target.checked ? '已开启打卡提醒' : '已关闭打卡提醒');
  });

  // 清除缓存
  document.getElementById('settings-clear-cache')?.addEventListener('click', () => {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('wudang_')) keys.push(key);
    }
    keys.forEach(k => localStorage.removeItem(k));
    showToast('缓存已清除');
    renderSettings(container);
  });
}

export function destroySettings() {}
