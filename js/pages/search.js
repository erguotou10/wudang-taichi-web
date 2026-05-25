/**
 * 搜索页 - 招式 + 景点搜索
 */
import { moves, spots, articleCategories } from '../mock-data.js';
import { starsText } from '../utils.js';

export function renderSearch(container) {
  container.innerHTML = `
    <div class="page active" id="page-search">
      <div class="search-header">
        <div class="search-input-wrap">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a09080" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input type="text" class="search-input" id="search-input" placeholder="搜索招式、景点..." autofocus>
          <span class="search-cancel" id="search-cancel">取消</span>
        </div>
      </div>
      <div class="search-body" id="search-body">
        <div class="search-hot">
          <div class="search-section-title">热门搜索</div>
          <div class="search-tags">
            <span class="search-tag" data-q="太极拳">太极拳</span>
            <span class="search-tag" data-q="金殿">金殿</span>
            <span class="search-tag" data-q="起势">起势</span>
            <span class="search-tag" data-q="南岩宫">南岩宫</span>
            <span class="search-tag" data-q="太极">太极</span>
            <span class="search-tag" data-q="紫霄宫">紫霄宫</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const input = document.getElementById('search-input');
  const body = document.getElementById('search-body');

  // 输入搜索
  let debounce = null;
  input?.addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => doSearch(input.value.trim(), body), 200);
  });

  // 热门标签
  container.querySelectorAll('.search-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      input.value = tag.dataset.q;
      doSearch(tag.dataset.q, body);
    });
  });

  // 取消
  document.getElementById('search-cancel')?.addEventListener('click', () => {
    history.back();
  });

  // 回车搜索
  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') doSearch(input.value.trim(), body);
  });
}

function doSearch(query, container) {
  if (!query) {
    container.innerHTML = `
      <div class="search-hot">
        <div class="search-section-title">热门搜索</div>
        <div class="search-tags">
          <span class="search-tag" data-q="太极拳">太极拳</span>
          <span class="search-tag" data-q="金殿">金殿</span>
          <span class="search-tag" data-q="起势">起势</span>
          <span class="search-tag" data-q="南岩宫">南岩宫</span>
        </div>
      </div>
    `;
    return;
  }

  const q = query.toLowerCase();
  const matchedMoves = moves.filter(m =>
    m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q)
  );
  const matchedSpots = spots.filter(s =>
    s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
  );

  if (matchedMoves.length === 0 && matchedSpots.length === 0) {
    container.innerHTML = `
      <div class="search-empty">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d8cfc5" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <div class="search-empty-text">未找到"${query}"相关内容</div>
      </div>
    `;
    return;
  }

  let html = '';

  if (matchedMoves.length > 0) {
    html += `<div class="search-section-title">招式 (${matchedMoves.length})</div>`;
    html += '<div class="search-results">';
    matchedMoves.forEach(m => {
      html += `
        <div class="search-result-item" data-type="move" data-id="${m._id}">
          <div class="sr-icon" style="background:linear-gradient(135deg,#2d5a3d,#1a3a2a);color:#6b8f71">
            <span style="font-size:16px;font-weight:900;font-family:serif">${m.name[0]}</span>
          </div>
          <div class="sr-info">
            <div class="sr-name">${highlightMatch(m.name, query)}</div>
            <div class="sr-desc">${starsText(m.difficulty)} · ${m.duration}秒</div>
          </div>
        </div>
      `;
    });
    html += '</div>';
  }

  if (matchedSpots.length > 0) {
    html += `<div class="search-section-title">景点 (${matchedSpots.length})</div>`;
    html += '<div class="search-results">';
    matchedSpots.forEach(s => {
      const catColors = { palace: '#b8322a', nature: '#2d5a3d', heritage: '#4a7dbd' };
      html += `
        <div class="search-result-item" data-type="spot" data-id="${s._id}">
          <div class="sr-icon" style="background:${catColors[s.category]}18;color:${catColors[s.category]}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>
          </div>
          <div class="sr-info">
            <div class="sr-name">${highlightMatch(s.name, query)}</div>
            <div class="sr-desc">${s.description}</div>
          </div>
        </div>
      `;
    });
    html += '</div>';
  }

  container.innerHTML = html;

  // 点击结果
  container.querySelectorAll('.search-result-item').forEach(item => {
    item.addEventListener('click', () => {
      const type = item.dataset.type;
      const id = item.dataset.id;
      if (type === 'move') location.hash = '#/teach/detail?id=' + id;
      else if (type === 'spot') location.hash = '#/guide';
    });
  });
}

function highlightMatch(text, query) {
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return text.slice(0, idx) + '<mark>' + text.slice(idx, idx + query.length) + '</mark>' + text.slice(idx + query.length);
}

export function destroySearch() {}
