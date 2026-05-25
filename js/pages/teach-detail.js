/**
 * 招式详情页 - 视频演示 + 内容 Tab
 */
import { moves } from '../mock-data.js';
import { starsText, showToast } from '../utils.js';

const relatedStyles = [
  { char: '起', grad: 'linear-gradient(135deg, #2d5a3d, #1a3a2a)', accent: '#6b8f71' },
  { char: '怀', grad: 'linear-gradient(135deg, #4a3728, #2a1a0e)', accent: '#8b7355' },
  { char: '野', grad: 'linear-gradient(135deg, #3d5a4a, #1e3028)', accent: '#6b9f71' },
  { char: '揽', grad: 'linear-gradient(135deg, #5a3d4a, #3a1e28)', accent: '#9f6b81' },
  { char: '叶', grad: 'linear-gradient(135deg, #3d5a5a, #1e3838)', accent: '#6b9f9f' },
  { char: '玉', grad: 'linear-gradient(135deg, #5a4a3d, #38281e)', accent: '#9f8b6b' },
  { char: '道', grad: 'linear-gradient(135deg, #4a3d5a, #281e38)', accent: '#8b6b9f' },
  { char: '推', grad: 'linear-gradient(135deg, #5a3d3d, #381e1e)', accent: '#9f6b6b' },
  { char: '收', grad: 'linear-gradient(135deg, #3d4a5a, #1e2838)', accent: '#6b8b9f' }
];

let videoEl = null;
let currentTab = 'steps';
let isPlaying = true;
let playSpeed = 1;
let currentMoveId = null;

export function renderTeachDetail(container, params) {
  const id = params.id || 'move_01';
  const move = moves.find(m => m._id === id) || moves[0];
  currentMoveId = move._id;
  currentTab = 'steps';
  isPlaying = true;
  playSpeed = 1;

  const stepsList = move.description.split(/[。！]/).filter(s => s.trim());
  const relatedMoves = moves.filter(m => m._id !== id).slice(0, 3);
  const videoSrc = `assets/videos/${move._id.replace('move_', '')}.mp4`;

  container.innerHTML = `
    <div class="page active detail-page" id="page-teach-detail">
      <div class="detail-nav">
        <span class="nav-back" id="detail-back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
        </span>
        <span class="nav-title">${move.name}</span>
        <span class="nav-right">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>
        </span>
      </div>

      <div class="video-area" id="video-area">
        <video id="teach-video" src="${videoSrc}" loop playsinline preload="auto"></video>
        <div class="video-overlay" id="video-overlay">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)"><polygon points="5,3 19,12 5,21"/></svg>
        </div>
        <div class="play-controls">
          <div class="play-btn" id="play-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
          </div>
          <div class="video-progress" id="video-progress">
            <div class="video-progress-bar" id="video-progress-bar"></div>
          </div>
          <div class="speed-btn" id="speed-btn">${playSpeed}x</div>
        </div>
      </div>

      <div class="move-info">
        <div class="move-header">
          <div class="move-name">${move.name}</div>
          <div class="move-meta">
            <span class="difficulty-stars">${starsText(move.difficulty)}</span>
            <span class="duration">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:-2px"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ${move.duration}秒
            </span>
          </div>
        </div>

        <div class="content-tabs">
          <div class="tab-item ${currentTab === 'steps' ? 'active' : ''}" data-tab="steps">要领</div>
          <div class="tab-item ${currentTab === 'breathing' ? 'active' : ''}" data-tab="breathing">呼吸</div>
          <div class="tab-item ${currentTab === 'mistakes' ? 'active' : ''}" data-tab="mistakes">易错</div>
          <div class="tab-item ${currentTab === 'related' ? 'active' : ''}" data-tab="related">相关</div>
        </div>

        <div class="tab-content" id="tab-content"></div>
      </div>

      <div class="bottom-bar">
        <div class="bar-left">
          <div class="icon-btn" id="favorite-btn">
            <svg class="icon-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/></svg>
            <span class="icon-label">收藏</span>
          </div>
        </div>
        <div class="bar-right">
          <button class="btn-secondary" id="add-plan-btn">加入学习计划</button>
          <button class="btn-primary" id="start-learn-btn">开始学习</button>
        </div>
      </div>
    </div>
  `;

  // 存储数据供 tab 渲染使用
  container._moveData = { move, stepsList, relatedMoves };

  renderTabContent(container);
  bindEvents(container);
  initVideo();
}

function renderTabContent(container) {
  const { move, stepsList, relatedMoves } = container._moveData || {};
  if (!move) return;

  const el = document.getElementById('tab-content');
  if (!el) return;

  switch (currentTab) {
    case 'steps':
      el.innerHTML = `
        <div class="steps-list">
          ${stepsList.map((s, i) => `
            <div class="step-item">
              <div class="step-number">${i + 1}</div>
              <div class="step-text">${s}</div>
            </div>
          `).join('')}
        </div>
      `;
      break;

    case 'breathing':
      el.innerHTML = `
        <div class="breathing-card">
          <div class="breathing-icon">
            <div class="breath-pulse"></div>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d4a574" stroke-width="1.5"><path d="M12 22c-4-3-8-6-8-11a8 8 0 0 1 16 0c0 5-4 8-8 11z"/><path d="M12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>
          </div>
          <div class="breathing-text">${move.breathing}</div>
        </div>
      `;
      break;

    case 'mistakes':
      el.innerHTML = `
        <div class="mistakes-list">
          ${move.commonMistakes.map(m => `
            <div class="mistake-item">
              <div class="mistake-title">${m.title}</div>
              <div class="mistake-wrong">
                <span class="mistake-label">✗ 错误</span>
                <span class="mistake-desc">${m.wrong}</span>
              </div>
              <div class="mistake-correct">
                <span class="mistake-label">✓ 正确</span>
                <span class="mistake-desc">${m.correct}</span>
              </div>
            </div>
          `).join('')}
        </div>
      `;
      break;

    case 'related':
      el.innerHTML = `
        <div class="related-list">
          ${relatedMoves.map((m, i) => {
            const idx = moves.indexOf(m);
            const style = relatedStyles[idx] || relatedStyles[0];
            return `
            <div class="related-item" data-id="${m._id}">
              <div class="related-icon" style="background:${style.grad}; color:${style.accent}">
                <span class="related-char">${style.char}</span>
              </div>
              <div class="related-info">
                <div class="related-name">${m.name}</div>
                <div class="related-meta">
                  <span class="related-stars">${starsText(m.difficulty)}</span>
                  <span>${m.duration}秒</span>
                </div>
              </div>
              <span class="related-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
              </span>
            </div>
          `;
          }).join('')}
        </div>
      `;

      el.querySelectorAll('.related-item').forEach(item => {
        item.addEventListener('click', () => {
          location.hash = '#/teach/detail?id=' + item.dataset.id;
        });
      });
      break;
  }
}

function bindEvents(container) {
  // 返回
  document.getElementById('detail-back')?.addEventListener('click', () => {
    location.hash = '#/teach';
  });

  // Tab 切换
  container.querySelectorAll('.content-tabs .tab-item').forEach(tab => {
    tab.addEventListener('click', () => {
      currentTab = tab.dataset.tab;
      container.querySelectorAll('.content-tabs .tab-item').forEach(t => t.classList.toggle('active', t === tab));
      renderTabContent(container);
    });
  });

  // 视频遮罩点击播放/暂停
  document.getElementById('video-overlay')?.addEventListener('click', () => {
    if (!videoEl) return;
    if (videoEl.paused) {
      videoEl.play();
    } else {
      videoEl.pause();
    }
  });

  // 播放/暂停按钮
  document.getElementById('play-btn')?.addEventListener('click', () => {
    if (!videoEl) return;
    if (videoEl.paused) {
      videoEl.play();
    } else {
      videoEl.pause();
    }
  });

  // 速度切换
  document.getElementById('speed-btn')?.addEventListener('click', () => {
    const speeds = [0.5, 1, 1.5, 2];
    const idx = (speeds.indexOf(playSpeed) + 1) % speeds.length;
    playSpeed = speeds[idx];
    if (videoEl) videoEl.playbackRate = playSpeed;
    document.getElementById('speed-btn').textContent = playSpeed + 'x';
  });

  // 进度条点击跳转
  document.getElementById('video-progress')?.addEventListener('click', (e) => {
    if (!videoEl || !videoEl.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    videoEl.currentTime = ratio * videoEl.duration;
  });

  // 收藏（持久化）
  const favKey = 'wudang_fav_moves';
  let favList = (() => { try { return JSON.parse(localStorage.getItem(favKey) || '[]'); } catch { return []; } })();
  let isFavorited = favList.includes(currentMoveId);

  function updateFavUI() {
    const btn = document.getElementById('favorite-btn');
    const svg = btn?.querySelector('.icon-svg');
    if (svg) {
      svg.setAttribute('fill', isFavorited ? '#d4a574' : 'none');
      svg.setAttribute('stroke', isFavorited ? '#d4a574' : 'currentColor');
    }
    btn?.querySelector('.icon-label') && (btn.querySelector('.icon-label').textContent = isFavorited ? '已收藏' : '收藏');
    btn?.classList.toggle('active', isFavorited);
  }
  updateFavUI();

  document.getElementById('favorite-btn')?.addEventListener('click', () => {
    isFavorited = !isFavorited;
    if (isFavorited) { favList.push(currentMoveId); } else { favList = favList.filter(id => id !== currentMoveId); }
    localStorage.setItem(favKey, JSON.stringify(favList));
    updateFavUI();
    showToast(isFavorited ? '已收藏' : '已取消收藏');
  });

  // 加入学习计划（持久化）
  document.getElementById('add-plan-btn')?.addEventListener('click', () => {
    const planKey = 'wudang_plan';
    let plan = (() => { try { return JSON.parse(localStorage.getItem(planKey) || '[]'); } catch { return []; } })();
    if (plan.includes(currentMoveId)) {
      showToast('已在学习计划中');
    } else {
      plan.push(currentMoveId);
      localStorage.setItem(planKey, JSON.stringify(plan));
      showToast('已加入学习计划');
    }
  });

  // 开始学习（更新进度）
  document.getElementById('start-learn-btn')?.addEventListener('click', () => {
    const progressKey = 'wudang_move_progress';
    let progress = (() => { try { return JSON.parse(localStorage.getItem(progressKey) || '{}'); } catch { return {}; } })();
    const current = progress[currentMoveId] || 'not_started';
    if (current === 'not_started') {
      progress[currentMoveId] = 'learning';
      showToast('开始学习，加油！');
    } else if (current === 'learning') {
      progress[currentMoveId] = 'completed';
      showToast('恭喜完成学习！');
    } else {
      showToast('已经学完啦，可以复习巩固');
    }
    localStorage.setItem(progressKey, JSON.stringify(progress));
  });
}

function initVideo() {
  videoEl = document.getElementById('teach-video');
  if (!videoEl) return;

  const overlay = document.getElementById('video-overlay');
  const progressBar = document.getElementById('video-progress-bar');
  const playBtn = document.getElementById('play-btn');

  // 视频可以播放时自动播放
  videoEl.addEventListener('canplay', () => {
    videoEl.play().catch(() => {});
  }, { once: true });

  // 播放状态同步
  videoEl.addEventListener('play', () => {
    isPlaying = true;
    if (overlay) overlay.classList.add('hidden');
    if (playBtn) {
      playBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
    }
  });

  videoEl.addEventListener('pause', () => {
    isPlaying = false;
    if (overlay) overlay.classList.remove('hidden');
    if (playBtn) {
      playBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>';
    }
  });

  // 进度条更新
  videoEl.addEventListener('timeupdate', () => {
    if (progressBar && videoEl.duration) {
      progressBar.style.width = (videoEl.currentTime / videoEl.duration * 100) + '%';
    }
  });
}

export function destroyTeachDetail() {
  if (videoEl) {
    videoEl.pause();
    videoEl.removeAttribute('src');
    videoEl.load();
    videoEl = null;
  }
}
