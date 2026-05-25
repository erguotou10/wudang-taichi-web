/**
 * 首页 - 视觉增强版
 */
import { moves } from '../mock-data.js';
import { starsText } from '../utils.js';

const CHECKIN_KEY = 'wudang_checkins';

function getCheckinData() {
  try { return JSON.parse(localStorage.getItem(CHECKIN_KEY) || '{}'); } catch { return {}; }
}

function getCheckinStreak() {
  const checkins = getCheckinData();
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    if (checkins[key]) { streak++; } else { break; }
  }
  return streak;
}

function isTodayChecked() {
  const checkins = getCheckinData();
  const d = new Date();
  const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  return !!checkins[key];
}

let swiperInterval = null;

// 招式首字和配色
const moveStyles = [
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

export function renderHome(container) {
  const recommended = moves.slice(0, 4);
  const streak = getCheckinStreak();
  const todayChecked = isTodayChecked();

  container.innerHTML = `
    <div class="page active" id="page-home">
      <div class="home-header">
        <div class="header-row">
          <div class="logo"><span>武当</span>太极导览</div>
          <div class="search-box" id="home-search" style="cursor:pointer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            搜索招式、景点...
          </div>
        </div>
      </div>

      <div class="banner" id="banner">
        <div class="banner-slides" id="banner-slides">
          <div class="banner-slide active" data-banner-route="/teach">
            <span class="banner-tag">精选推荐</span>
            <div class="banner-title">武当太极九势</div>
            <div class="banner-desc">武当派基础套路，动作简洁，适合初学者入门</div>
          </div>
          <div class="banner-slide" data-banner-route="/guide">
            <span class="banner-tag">文化之旅</span>
            <div class="banner-title">武当山景区导览</div>
            <div class="banner-desc">金殿、南岩宫、紫霄宫，感受千年道教文化</div>
          </div>
          <div class="banner-slide" data-banner-route="/checkin">
            <span class="banner-tag">每日打卡</span>
            <div class="banner-title">坚持太极练习</div>
            <div class="banner-desc">记录你的每一次进步，成就更好的自己</div>
          </div>
        </div>
        <div class="banner-dots" id="banner-dots">
          <div class="banner-dot active"></div>
          <div class="banner-dot"></div>
          <div class="banner-dot"></div>
        </div>
        <div class="banner-deco-taiji"></div>
      </div>

      <div class="quick-entry">
        <div class="quick-entry-item" data-route="/guide">
          <div class="quick-entry-icon qe-map">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
          </div>
          <span class="quick-entry-label">地图导览</span>
        </div>
        <div class="quick-entry-item" data-route="/teach">
          <div class="quick-entry-icon qe-teach">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 0 20"/><path d="M12 2a10 10 0 0 0 0 20"/><circle cx="12" cy="8" r="1.5" fill="currentColor"/><circle cx="12" cy="16" r="1.5" fill="currentColor"/></svg>
          </div>
          <span class="quick-entry-label">太极教学</span>
        </div>
        <div class="quick-entry-item" data-route="/culture">
          <div class="quick-entry-icon qe-culture">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M8 7h8M8 11h6"/></svg>
          </div>
          <span class="quick-entry-label">文化介绍</span>
        </div>
        <div class="quick-entry-item" data-route="/checkin">
          <div class="quick-entry-icon qe-checkin">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="m9 16 2 2 4-4"/></svg>
          </div>
          <span class="quick-entry-label">每日打卡</span>
        </div>
      </div>

      <div class="section">
        <div class="section-title-row">
          <div class="section-title">今日推荐招式</div>
          <div class="section-more" data-route="/teach">查看全部 ›</div>
        </div>
      </div>
      <div class="section">
        <div class="section-title-row">
          <div class="section-title">社区动态</div>
          <div class="section-more" data-route="/community">查看全部 ›</div>
        </div>
      </div>
      <div class="community-preview" data-route="/community">
        <div class="community-preview-item">
          <div class="cp-avatar" style="background:#2d5a3d">王</div>
          <div class="cp-text">太极小王：今天终于把揽雀尾的四劲连贯起来了！</div>
          <div class="cp-time">2小时前</div>
        </div>
        <div class="community-preview-item">
          <div class="cp-avatar" style="background:#4a7dbd">道</div>
          <div class="cp-text">武当问道：第一次登金殿，日出真的太美了！</div>
          <div class="cp-time">1天前</div>
        </div>
      </div>
      <div class="move-scroll">
        ${recommended.map((m, i) => {
          const style = moveStyles[i];
          const diffLabel = m.difficulty === 1 ? '初级' : m.difficulty === 2 ? '中级' : '高级';
          return `
            <div class="move-card" data-id="${m._id}">
              <div class="move-card-img" style="background:${style.grad}">
                <div class="move-card-char" style="color:${style.accent}">${style.char}</div>
                <span class="move-badge">${diffLabel}</span>
                <div class="move-card-ring"></div>
              </div>
              <div class="move-card-info">
                <div class="move-card-name">${m.name.split('（')[0]}</div>
                <div class="move-card-stars">${starsText(m.difficulty)}</div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div class="checkin-status">
        <div class="checkin-info">
          <div class="checkin-label">${todayChecked ? '今日已打卡' : '今日练习'}</div>
          <div class="checkin-days">${streak > 0 ? `已连续打卡 <span>${streak}天</span>` : '还未开始打卡'}</div>
        </div>
        <button class="checkin-btn" data-route="/checkin">${todayChecked ? '查看详情' : '去打卡'}</button>
      </div>
    </div>
  `;

  // 搜索框
  document.getElementById('home-search')?.addEventListener('click', () => location.hash = '#/search');

  // 绑定事件
  container.querySelectorAll('[data-route]').forEach(el => {
    el.addEventListener('click', () => location.hash = '#' + el.dataset.route);
  });
  container.querySelectorAll('[data-action]').forEach(el => {
    el.addEventListener('click', () => {
      const action = el.dataset.action;
      // 保留给其他 action 使用
    });
  });
  container.querySelectorAll('.move-card').forEach(el => {
    el.addEventListener('click', () => location.hash = '#/teach/detail?id=' + el.dataset.id);
  });

  // Banner 点击跳转
  slides.forEach(slide => {
    slide.addEventListener('click', () => {
      const route = slide.dataset.bannerRoute;
      if (route) location.hash = '#' + route;
    });
  });

  // Banner 轮播
  let currentSlide = 0;
  const slides = container.querySelectorAll('.banner-slide');
  const dots = container.querySelectorAll('.banner-dot');

  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
  }

  swiperInterval = setInterval(() => showSlide((currentSlide + 1) % slides.length), 4000);
  dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));
}

export function destroyHome() {
  if (swiperInterval) { clearInterval(swiperInterval); swiperInterval = null; }
}
