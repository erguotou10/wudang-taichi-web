/**
 * 文化模块 - 文章列表 + 详情
 */
import { articles, articleCategories } from '../mock-data.js';
import { showToast } from '../utils.js';

const categorySVG = {
  history: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  philosophy: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
  school: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  master: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'
};

let currentCategory = 'all';

export function renderCulture(container) {
  currentCategory = 'all';

  container.innerHTML = `
    <div class="page active" id="page-culture">
      <div class="culture-header">
        <div class="culture-header-row">
          <span class="culture-title">武当文化</span>
          <span class="culture-subtitle">道法自然 · 天人合一</span>
        </div>
      </div>
      <div class="culture-categories" id="culture-categories">
        <div class="culture-cat active" data-cat="all">全部</div>
        ${Object.entries(articleCategories).map(([key, cat]) => `
          <div class="culture-cat" data-cat="${key}" style="--cat-color:${cat.color}">${cat.name}</div>
        `).join('')}
      </div>
      <div class="article-list" id="article-list"></div>
    </div>
  `;

  renderArticleList();
  bindListEvents(container);
}

function renderArticleList() {
  const el = document.getElementById('article-list');
  if (!el) return;

  const filtered = currentCategory === 'all'
    ? articles
    : articles.filter(a => a.category === currentCategory);

  el.innerHTML = filtered.map(article => {
    const cat = articleCategories[article.category];
    return `
      <div class="article-card" data-id="${article._id}">
        <div class="article-card-header">
          <div class="article-cat-tag" style="background:${cat.color}15;color:${cat.color}">${cat.name}</div>
          <span class="article-read-time">${article.readTime}分钟阅读</span>
        </div>
        <div class="article-card-title">${article.title}</div>
        <div class="article-card-summary">${article.summary}</div>
        <div class="article-card-footer">
          <span class="article-author">${article.author}</span>
          <span class="article-date">${article.date}</span>
        </div>
      </div>
    `;
  }).join('');

  el.querySelectorAll('.article-card').forEach(card => {
    card.addEventListener('click', () => {
      location.hash = '#/culture/detail?id=' + card.dataset.id;
    });
  });
}

function bindListEvents(container) {
  container.querySelectorAll('.culture-cat').forEach(cat => {
    cat.addEventListener('click', () => {
      currentCategory = cat.dataset.cat;
      container.querySelectorAll('.culture-cat').forEach(c => c.classList.toggle('active', c === cat));
      renderArticleList();
    });
  });
}

export function destroyCulture() {}

// ---- 文章详情 ----

export function renderCultureDetail(container, params) {
  const id = params.id || 'article_01';
  const article = articles.find(a => a._id === id) || articles[0];
  const cat = articleCategories[article.category];
  const currentArticleId = article._id;

  const paragraphs = article.content.split('\n\n').filter(p => p.trim());

  // 持久化数据
  const ART_LIKE_KEY = 'wudang_article_likes';
  const ART_FAV_KEY = 'wudang_article_favs';
  let likedArticles = (() => { try { return JSON.parse(localStorage.getItem(ART_LIKE_KEY) || '[]'); } catch { return []; } })();
  let favArticles = (() => { try { return JSON.parse(localStorage.getItem(ART_FAV_KEY) || '[]'); } catch { return []; } })();
  let isLiked = likedArticles.includes(currentArticleId);
  let isFav = favArticles.includes(currentArticleId);

  container.innerHTML = `
    <div class="page active" id="page-culture-detail">
      <div class="detail-nav">
        <span class="nav-back" id="culture-back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
        </span>
        <span class="nav-title">文章详情</span>
        <span class="nav-right"></span>
      </div>

      <div class="article-detail">
        <div class="article-detail-cat" style="background:${cat.color}15;color:${cat.color}">${cat.name}</div>
        <h1 class="article-detail-title">${article.title}</h1>
        <div class="article-detail-meta">
          <span class="article-author">${article.author}</span>
          <span class="article-dot">·</span>
          <span class="article-date">${article.date}</span>
          <span class="article-dot">·</span>
          <span class="article-read-time">${article.readTime}分钟阅读</span>
        </div>
        <div class="article-detail-content">
          ${paragraphs.map(p => {
            if (p.startsWith('**') && p.endsWith('**')) {
              return `<h3 class="article-h3">${p.replace(/\*\*/g, '')}</h3>`;
            }
            const formatted = p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            return `<p>${formatted}</p>`;
          }).join('')}
        </div>
        <div class="article-detail-tags">
          ${article.tags.map(t => `<span class="article-tag">${t}</span>`).join('')}
        </div>
      </div>

      <div class="article-action-bar" id="article-action-bar">
        <div class="article-action ${isLiked ? 'active' : ''}" id="art-like-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="${isLiked ? '#e74c3c' : 'none'}" stroke="${isLiked ? '#e74c3c' : 'currentColor'}" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          <span>${isLiked ? '已点赞' : '点赞'}</span>
        </div>
        <div class="article-action ${isFav ? 'active' : ''}" id="art-fav-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="${isFav ? '#d4a574' : 'none'}" stroke="${isFav ? '#d4a574' : 'currentColor'}" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/></svg>
          <span>${isFav ? '已收藏' : '收藏'}</span>
        </div>
        <div class="article-action" id="art-share-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>
          <span>分享</span>
        </div>
      </div>
    </div>
  `;

  document.getElementById('culture-back')?.addEventListener('click', () => {
    location.hash = '#/culture';
  });

  // 点赞
  document.getElementById('art-like-btn')?.addEventListener('click', () => {
    isLiked = !isLiked;
    if (isLiked) { likedArticles.push(currentArticleId); } else { likedArticles = likedArticles.filter(a => a !== currentArticleId); }
    localStorage.setItem(ART_LIKE_KEY, JSON.stringify(likedArticles));
    const btn = document.getElementById('art-like-btn');
    btn.classList.toggle('active', isLiked);
    btn.querySelector('svg').setAttribute('fill', isLiked ? '#e74c3c' : 'none');
    btn.querySelector('svg').setAttribute('stroke', isLiked ? '#e74c3c' : 'currentColor');
    btn.querySelector('span').textContent = isLiked ? '已点赞' : '点赞';
    showToast(isLiked ? '已点赞' : '已取消点赞');
  });

  // 收藏
  document.getElementById('art-fav-btn')?.addEventListener('click', () => {
    isFav = !isFav;
    if (isFav) { favArticles.push(currentArticleId); } else { favArticles = favArticles.filter(a => a !== currentArticleId); }
    localStorage.setItem(ART_FAV_KEY, JSON.stringify(favArticles));
    const btn = document.getElementById('art-fav-btn');
    btn.classList.toggle('active', isFav);
    btn.querySelector('svg').setAttribute('fill', isFav ? '#d4a574' : 'none');
    btn.querySelector('svg').setAttribute('stroke', isFav ? '#d4a574' : 'currentColor');
    btn.querySelector('span').textContent = isFav ? '已收藏' : '收藏';
    showToast(isFav ? '已收藏' : '已取消收藏');
  });

  // 分享
  document.getElementById('art-share-btn')?.addEventListener('click', () => {
    if (navigator.share) {
      navigator.share({ title: article.title, text: article.summary, url: location.href }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(location.href);
      showToast('链接已复制到剪贴板');
    }
  });
}

export function destroyCultureDetail() {}
