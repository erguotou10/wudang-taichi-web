/**
 * 教学列表页 - 招式网格 + 套路列表
 */
import { moves, routines } from '../mock-data.js';
import { starsText, showToast } from '../utils.js';

let viewMode = 'grid'; // grid | routine

// 招式首字配色
const gridStyles = [
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

export function renderTeachIndex(container) {
  viewMode = 'grid';
  const completedCount = 6;

  container.innerHTML = `
    <div class="page active" id="page-teach">
      <div class="teach-progress">
        <div class="teach-progress-header">
          <span class="teach-progress-title">我的学习进度</span>
          <span class="teach-progress-count">已学 ${completedCount}/${moves.length} 势</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width:${(completedCount / moves.length * 100).toFixed(0)}%"></div>
        </div>
      </div>

      <div class="view-toggle">
        <div class="view-toggle-item active" data-mode="grid">招式库</div>
        <div class="view-toggle-item" data-mode="routine">套路学习</div>
      </div>

      <div id="teach-grid-view">
        <div class="move-grid" id="move-grid"></div>
        <div class="section">
          <div class="section-title">基本功训练</div>
        </div>
        <div class="basic-grid">
          <div class="basic-item">
            <div class="basic-icon bi-stance">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="5" r="2.5"/><path d="M8 21v-4a4 4 0 0 1 8 0v4"/><path d="M6 12c0-1 .5-2 2-2h8c1.5 0 2 1 2 2"/></svg>
            </div>
            <span class="basic-label">站桩</span>
          </div>
          <div class="basic-item">
            <div class="basic-icon bi-step">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 16l4-4 4 4 4-4 4 4"/><path d="M4 20l4-4 4 4 4-4 4 4"/></svg>
            </div>
            <span class="basic-label">步法</span>
          </div>
          <div class="basic-item">
            <div class="basic-icon bi-hand">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 11V6a2 2 0 0 0-4 0"/><path d="M14 10V4a2 2 0 0 0-4 0v7"/><path d="M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 11a2 2 0 0 1 4 0v3a8 8 0 0 1-8 8h-2c-2.5 0-4.5-1-5.5-2.5L4 16"/></svg>
            </div>
            <span class="basic-label">手法</span>
          </div>
          <div class="basic-item">
            <div class="basic-icon bi-body">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="5" r="2.5"/><path d="M12 7.5v5"/><path d="M8 17l4-4.5 4 4.5"/><path d="M6 12.5l6-1 6 1"/></svg>
            </div>
            <span class="basic-label">身法</span>
          </div>
        </div>
      </div>

      <div id="teach-routine-view" style="display:none;">
        <div class="section">
          <div class="section-title">${routines[0].name}</div>
        </div>
        <div class="routine-list" id="routine-list"></div>
      </div>
    </div>
  `;

  renderMoveGrid();
  renderRoutineList();
  bindEvents(container);
}

function renderMoveGrid() {
  const el = document.getElementById('move-grid');
  if (!el) return;

  const statuses = ['completed', 'completed', 'completed', 'completed', 'completed', 'completed', 'learning', 'not_started', 'not_started'];

  el.innerHTML = moves.map((m, i) => {
    const status = statuses[i] || 'not_started';
    const style = gridStyles[i] || gridStyles[0];
    const badge = status === 'completed' ? '<span class="grid-badge completed">✓</span>'
      : status === 'learning' ? '<span class="grid-badge learning">学习中</span>'
      : '';

    return `
      <div class="move-grid-item" data-id="${m._id}">
        <div class="move-grid-img" style="background:${style.grad}">
          <span class="move-grid-char" style="color:${style.accent}">${style.char}</span>
          <div class="move-grid-ring"></div>
          ${badge}
        </div>
        <div class="move-grid-info">
          <div class="move-grid-name">${m.name.split('（')[0]}</div>
          <div class="move-grid-stars">${starsText(m.difficulty)}</div>
        </div>
      </div>
    `;
  }).join('');

  el.querySelectorAll('.move-grid-item').forEach(item => {
    item.addEventListener('click', () => {
      location.hash = '#/teach/detail?id=' + item.dataset.id;
    });
  });
}

function renderRoutineList() {
  const el = document.getElementById('routine-list');
  if (!el) return;

  const statuses = ['completed', 'completed', 'completed', 'completed', 'completed', 'completed', 'learning', 'not_started', 'not_started'];
  const statusLabels = { completed: '已学', learning: '学习中', not_started: '未学' };

  el.innerHTML = moves.map((m, i) => {
    const status = statuses[i] || 'not_started';
    const numContent = status === 'completed' ? '✓' : (i + 1);

    return `
      <div class="routine-item ${status}" data-id="${m._id}">
        <div class="routine-num">${numContent}</div>
        <div class="routine-name">${i + 1}. ${m.name}</div>
        <div class="routine-status">${statusLabels[status]}</div>
      </div>
    `;
  }).join('');

  el.querySelectorAll('.routine-item').forEach(item => {
    item.addEventListener('click', () => {
      location.hash = '#/teach/detail?id=' + item.dataset.id;
    });
  });
}

function bindEvents(container) {
  container.querySelectorAll('.view-toggle-item').forEach(item => {
    item.addEventListener('click', () => {
      viewMode = item.dataset.mode;
      container.querySelectorAll('.view-toggle-item').forEach(t => t.classList.toggle('active', t === item));
      document.getElementById('teach-grid-view').style.display = viewMode === 'grid' ? '' : 'none';
      document.getElementById('teach-routine-view').style.display = viewMode === 'routine' ? '' : 'none';
    });
  });
}
