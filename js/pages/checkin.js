/**
 * 打卡/练习模块 - 练习计时 + 打卡日历 + 统计
 */
import { showToast } from '../utils.js';

const STORAGE_KEY = 'wudang_checkins';

function getCheckins() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch { return {}; }
}

function saveCheckin(dateStr) {
  const checkins = getCheckins();
  if (!checkins[dateStr]) {
    checkins[dateStr] = { count: 0, minutes: 0 };
  }
  checkins[dateStr].count += 1;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(checkins));
  return checkins;
}

function getStreak() {
  const checkins = getCheckins();
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = formatDate(d);
    if (checkins[key]) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

function getTotalStats() {
  const checkins = getCheckins();
  let totalDays = 0, totalMinutes = 0, totalCount = 0;
  for (const key of Object.keys(checkins)) {
    totalDays++;
    totalMinutes += checkins[key].minutes || 0;
    totalCount += checkins[key].count || 0;
  }
  return { totalDays, totalMinutes, totalCount };
}

function formatDate(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

let timerInterval = null;
let timerSeconds = 0;
let timerRunning = false;

export function renderCheckin(container) {
  timerSeconds = 0;
  timerRunning = false;
  clearInterval(timerInterval);
  timerInterval = null;

  const today = formatDate(new Date());
  const checkins = getCheckins();
  const streak = getStreak();
  const stats = getTotalStats();
  const todayChecked = !!checkins[today];

  container.innerHTML = `
    <div class="page active" id="page-checkin">
      <div class="detail-nav">
        <span class="nav-back" id="checkin-back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
        </span>
        <span class="nav-title">每日打卡</span>
        <span class="nav-right"></span>
      </div>

      <div class="checkin-hero">
        <div class="checkin-hero-streak">
          <div class="streak-num">${streak}</div>
          <div class="streak-label">连续打卡天数</div>
        </div>
        <div class="checkin-hero-row">
          <div class="checkin-hero-stat">
            <div class="ch-val">${stats.totalDays}</div>
            <div class="ch-label">累计天数</div>
          </div>
          <div class="checkin-hero-stat">
            <div class="ch-val">${stats.totalMinutes}</div>
            <div class="ch-label">练习分钟</div>
          </div>
          <div class="checkin-hero-stat">
            <div class="ch-val">${stats.totalCount}</div>
            <div class="ch-label">打卡次数</div>
          </div>
        </div>
      </div>

      <div class="checkin-timer-section">
        <div class="timer-display" id="timer-display">00:00</div>
        <div class="timer-controls">
          <button class="timer-btn timer-start" id="timer-start">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
            开始练习
          </button>
          <button class="timer-btn timer-pause" id="timer-pause" style="display:none">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            暂停
          </button>
          <button class="timer-btn timer-stop" id="timer-stop" style="display:none">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
            结束打卡
          </button>
        </div>
      </div>

      <div class="checkin-calendar-section">
        <div class="calendar-header">
          <button class="cal-nav" id="cal-prev">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <span class="cal-month" id="cal-month"></span>
          <button class="cal-nav" id="cal-next">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
        <div class="calendar-weekdays">
          <span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span>
        </div>
        <div class="calendar-grid" id="calendar-grid"></div>
      </div>
    </div>
  `;

  renderCalendar(new Date());
  bindCheckinEvents(container);
}

function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const checkins = getCheckins();

  document.getElementById('cal-month').textContent = `${year}年${month + 1}月`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = formatDate(new Date());

  let html = '';
  for (let i = 0; i < firstDay; i++) {
    html += '<div class="cal-day empty"></div>';
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const isToday = dateStr === today;
    const checked = !!checkins[dateStr];
    const classes = ['cal-day'];
    if (isToday) classes.push('today');
    if (checked) classes.push('checked');
    html += `<div class="${classes.join(' ')}">${d}${checked ? '<div class="cal-check">✓</div>' : ''}</div>`;
  }

  document.getElementById('calendar-grid').innerHTML = html;
}

function bindCheckinEvents(container) {
  // 返回
  document.getElementById('checkin-back')?.addEventListener('click', () => {
    location.hash = '#/';
  });

  // 日历翻页
  let calDate = new Date();
  document.getElementById('cal-prev')?.addEventListener('click', () => {
    calDate.setMonth(calDate.getMonth() - 1);
    renderCalendar(calDate);
  });
  document.getElementById('cal-next')?.addEventListener('click', () => {
    calDate.setMonth(calDate.getMonth() + 1);
    renderCalendar(calDate);
  });

  // 计时器
  const display = document.getElementById('timer-display');
  const startBtn = document.getElementById('timer-start');
  const pauseBtn = document.getElementById('timer-pause');
  const stopBtn = document.getElementById('timer-stop');

  startBtn?.addEventListener('click', () => {
    timerRunning = true;
    startBtn.style.display = 'none';
    pauseBtn.style.display = '';
    stopBtn.style.display = '';
    timerInterval = setInterval(() => {
      timerSeconds++;
      const m = Math.floor(timerSeconds / 60);
      const s = timerSeconds % 60;
      if (display) display.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }, 1000);
  });

  pauseBtn?.addEventListener('click', () => {
    if (timerRunning) {
      clearInterval(timerInterval);
      timerRunning = false;
      pauseBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg> 继续';
    } else {
      timerRunning = true;
      pauseBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> 暂停';
      timerInterval = setInterval(() => {
        timerSeconds++;
        const m = Math.floor(timerSeconds / 60);
        const s = timerSeconds % 60;
        if (display) display.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
      }, 1000);
    }
  });

  stopBtn?.addEventListener('click', () => {
    if (timerSeconds < 10) {
      showToast('练习时间太短，至少练习10秒');
      return;
    }
    clearInterval(timerInterval);
    timerRunning = false;

    const today = formatDate(new Date());
    const checkins = getCheckins();
    if (!checkins[today]) checkins[today] = { count: 0, minutes: 0 };
    checkins[today].minutes += Math.round(timerSeconds / 60) || 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checkins));
    saveCheckin(today);

    const minutes = Math.round(timerSeconds / 60) || 1;
    showToast(`打卡成功！本次练习 ${minutes} 分钟`);

    // 弹出分享到社区选项
    showSharePrompt(minutes);

    timerSeconds = 0;
    if (display) display.textContent = '00:00';
    startBtn.style.display = '';
    pauseBtn.style.display = 'none';
    stopBtn.style.display = 'none';
    pauseBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> 暂停';

    // 刷新日历和统计
    renderCalendar(new Date());
  });
}

function showSharePrompt(minutes) {
  // 移除已有的
  document.querySelector('.share-prompt-mask')?.remove();
  document.querySelector('.share-prompt-sheet')?.remove();

  const mask = document.createElement('div');
  mask.className = 'share-prompt-mask spot-detail-mask show';

  const sheet = document.createElement('div');
  sheet.className = 'share-prompt-sheet spot-detail-sheet show';
  sheet.innerHTML = `
    <div class="spot-detail-header" style="text-align:center;padding-bottom:8px">
      <div style="font-size:32px;margin-bottom:8px">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4a9f6b" stroke-width="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      </div>
      <div class="sd-name">打卡成功！</div>
      <div style="font-size:13px;color:#a09080;margin-top:4px">本次练习 ${minutes} 分钟</div>
      <button class="spot-detail-close" id="share-close">&times;</button>
    </div>
    <div style="padding:16px;display:flex;flex-direction:column;gap:10px">
      <button id="share-to-community" style="width:100%;padding:13px;border:none;border-radius:12px;background:linear-gradient(135deg,#b8322a,#942820);color:#fff;font-size:15px;font-weight:600;cursor:pointer;box-shadow:0 4px 14px rgba(184,50,42,0.3)">
        分享到社区
      </button>
      <button id="share-skip" style="width:100%;padding:13px;border:1px solid #ede8e2;border-radius:12px;background:#fff;color:#6b5e52;font-size:14px;cursor:pointer">
        稍再说
      </button>
    </div>
  `;

  document.body.appendChild(mask);
  document.body.appendChild(sheet);
  requestAnimationFrame(() => { mask.classList.add('show'); sheet.classList.add('show'); });

  const close = () => {
    mask.classList.remove('show'); sheet.classList.remove('show');
    setTimeout(() => { mask.remove(); sheet.remove(); }, 300);
  };

  document.getElementById('share-close')?.addEventListener('click', close);
  mask.addEventListener('click', close);
  document.getElementById('share-skip')?.addEventListener('click', close);
  document.getElementById('share-to-community')?.addEventListener('click', () => {
    close();
    const content = `今日打卡完成！练习了${minutes}分钟，继续坚持！`;
    location.hash = '#/community/publish?content=' + encodeURIComponent(content) + '&duration=' + minutes;
  });
}

export function destroyCheckin() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerRunning = false;
}
