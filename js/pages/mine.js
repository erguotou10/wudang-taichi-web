/**
 * 我的页面
 */
import { moves, badges } from '../mock-data.js';
import { showToast } from '../utils.js';

const menuSVG = {
  'fav-moves': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L7 10h3l-2 6h8l-2-6h3L12 2z"/></svg>',
  'fav-articles': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  'posts': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  'plan': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg>',
  'checkin-records': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  'badges': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>',
  'notifications': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
  'cache': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>',
  'about': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>'
};

const menuColors = {
  'fav-moves': '#b8322a',
  'fav-articles': '#c4863a',
  'posts': '#4a7fb5',
  'plan': '#4a9f6b',
  'checkin-records': '#2d5a3d',
  'badges': '#d4a574',
  'notifications': '#8b6b9f',
  'cache': '#6b8b9f',
  'about': '#a09080'
};

function menuIconBg(action) {
  const c = menuColors[action] || '#999';
  return `background:${c}18; color:${c}`;
}

export function renderMine(container) {
  container.innerHTML = `
    <div class="page active" id="page-mine">
      <div class="profile-header">
        <div class="profile-deco-taiji"></div>
        <div class="profile-avatar">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)" stroke="none"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a6 6 0 0 1 12 0v2"/></svg>
        </div>
        <div class="profile-info">
          <div class="profile-name">太极爱好者</div>
          <div class="profile-level">太极水平：初学者</div>
        </div>
        <div class="profile-streak">
          <div class="streak-num">5</div>
          <div class="streak-label">连续打卡</div>
        </div>
      </div>
      <div class="profile-stats">
        <div class="profile-stat">
          <div class="p-stat-val">6/9</div>
          <div class="p-stat-label">已学招式</div>
        </div>
        <div class="profile-stat">
          <div class="p-stat-val">12h</div>
          <div class="p-stat-label">累计学习</div>
        </div>
        <div class="profile-stat">
          <div class="p-stat-val">23</div>
          <div class="p-stat-label">打卡次数</div>
        </div>
      </div>

      <div class="section"><div class="section-title">我的收藏</div></div>
      <div class="menu-list">
        <div class="menu-item" data-action="fav-moves">
          <div class="menu-icon-wrap" style="${menuIconBg('fav-moves')}">${menuSVG['fav-moves']}</div>
          <span class="menu-label">招式收藏</span>
          <span class="menu-badge">6</span>
          <span class="menu-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></span>
        </div>
        <div class="menu-item" data-action="fav-articles">
          <div class="menu-icon-wrap" style="${menuIconBg('fav-articles')}">${menuSVG['fav-articles']}</div>
          <span class="menu-label">文章收藏</span>
          <span class="menu-badge">3</span>
          <span class="menu-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></span>
        </div>
      </div>

      <div class="menu-list">
        ${['posts', 'plan', 'checkin-records', 'badges'].map(action => `
          <div class="menu-item" data-action="${action}">
            <div class="menu-icon-wrap" style="${menuIconBg(action)}">${menuSVG[action]}</div>
            <span class="menu-label">${{posts:'我的动态',plan:'学习计划','checkin-records':'打卡记录',badges:'成就徽章'}[action]}</span>
            <span class="menu-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></span>
          </div>
        `).join('')}
      </div>

      <div class="menu-list">
        ${['notifications', 'cache', 'about'].map(action => `
          <div class="menu-item" data-action="${action}">
            <div class="menu-icon-wrap" style="${menuIconBg(action)}">${menuSVG[action]}</div>
            <span class="menu-label">${{notifications:'通知设置',cache:'缓存管理',about:'关于'}[action]}</span>
            <span class="menu-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></span>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  container.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
      const action = item.dataset.action;
      if (action === 'checkin-records') {
        location.hash = '#/checkin';
      } else if (action === 'badges') {
        location.hash = '#/mine/badges';
      } else if (action === 'plan') {
        location.hash = '#/mine/plan';
      } else if (action === 'fav-moves') {
        location.hash = '#/mine/favorites';
      } else if (['notifications', 'cache', 'about'].includes(action)) {
        location.hash = '#/mine/settings';
      } else if (action === 'posts') {
        location.hash = '#/mine/posts';
      } else {
        showToast('功能开发中');
      }
    });
  });
}
