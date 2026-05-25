/**
 * 社区模块 - 动态列表 + 详情 + 发布 + 我的动态
 */
import { communityPosts, communityComments, moves } from '../mock-data.js';
import { showToast } from '../utils.js';

const POSTS_KEY = 'wudang_community_posts';
const COMMENTS_KEY = 'wudang_community_comments';
const LIKES_KEY = 'wudang_community_likes';

function getStoredPosts() {
  try {
    const stored = JSON.parse(localStorage.getItem(POSTS_KEY) || 'null');
    return stored || [...communityPosts];
  } catch { return [...communityPosts]; }
}

function savePosts(posts) {
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
}

function getStoredComments() {
  try {
    const stored = JSON.parse(localStorage.getItem(COMMENTS_KEY) || 'null');
    return stored || { ...communityComments };
  } catch { return { ...communityComments }; }
}

function saveComments(comments) {
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
}

function getLikedPosts() {
  try { return JSON.parse(localStorage.getItem(LIKES_KEY) || '[]'); } catch { return []; }
}

function saveLikedPosts(likes) {
  localStorage.setItem(LIKES_KEY, JSON.stringify(likes));
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return '刚刚';
  if (mins < 60) return `${mins}分钟前`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}小时前`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}天前`;
  return `${Math.floor(days / 30)}个月前`;
}

function avatarLetter(nickname) {
  return nickname ? nickname.charAt(0) : '?';
}

const avatarColors = ['#b8322a', '#2d5a3d', '#4a7dbd', '#c4863a', '#8b6b9f', '#4a9f6b', '#d4a574'];
function avatarColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

// ---- 社区动态列表 ----
export function renderCommunity(container) {
  const posts = getStoredPosts();
  const likedIds = getLikedPosts();

  container.innerHTML = `
    <div class="page active" id="page-community">
      <div class="detail-nav">
        <span class="nav-back" id="community-back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
        </span>
        <span class="nav-title">社区动态</span>
        <span class="nav-right" id="community-publish" style="cursor:pointer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4a574" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
        </span>
      </div>
      <div class="community-feed" id="community-feed">
        ${posts.map(post => renderPostCard(post, likedIds)).join('')}
      </div>
    </div>
  `;

  bindCommunityEvents(container, posts, likedIds);
}

function renderPostCard(post, likedIds) {
  const isLiked = likedIds.includes(post._id);
  const color = avatarColor(post.nickname);
  return `
    <div class="post-card" data-id="${post._id}">
      <div class="post-header">
        <div class="post-avatar" style="background:${color}">${avatarLetter(post.nickname)}</div>
        <div class="post-user-info">
          <div class="post-nickname">${post.nickname}</div>
          <div class="post-time">${timeAgo(post.createdAt)}</div>
        </div>
      </div>
      <div class="post-content">${post.content}</div>
      ${post.checkin ? `
        <div class="post-checkin-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          练习 ${post.checkin.duration} 分钟${post.checkin.moves ? ' · ' + post.checkin.moves.join('、') : ''}
        </div>` : ''}
      <div class="post-tags">
        ${post.tags.map(t => `<span class="post-tag">#${t}</span>`).join('')}
      </div>
      <div class="post-actions">
        <div class="post-action post-like-btn ${isLiked ? 'liked' : ''}" data-id="${post._id}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="${isLiked ? '#e74c3c' : 'none'}" stroke="${isLiked ? '#e74c3c' : 'currentColor'}" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          <span>${post.likes}</span>
        </div>
        <div class="post-action post-comment-btn" data-id="${post._id}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          <span>${post.comments}</span>
        </div>
      </div>
    </div>
  `;
}

function bindCommunityEvents(container, posts, likedIds) {
  document.getElementById('community-back')?.addEventListener('click', () => location.hash = '#/');

  document.getElementById('community-publish')?.addEventListener('click', () => {
    location.hash = '#/community/publish';
  });

  // 点赞
  container.querySelectorAll('.post-like-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const postId = btn.dataset.id;
      const allPosts = getStoredPosts();
      const post = allPosts.find(p => p._id === postId);
      if (!post) return;

      const likes = getLikedPosts();
      const idx = likes.indexOf(postId);
      if (idx >= 0) {
        likes.splice(idx, 1);
        post.likes = Math.max(0, post.likes - 1);
      } else {
        likes.push(postId);
        post.likes += 1;
      }
      saveLikedPosts(likes);
      savePosts(allPosts);

      const isLiked = likes.includes(postId);
      btn.classList.toggle('liked', isLiked);
      btn.querySelector('svg').setAttribute('fill', isLiked ? '#e74c3c' : 'none');
      btn.querySelector('svg').setAttribute('stroke', isLiked ? '#e74c3c' : 'currentColor');
      btn.querySelector('span').textContent = post.likes;
    });
  });

  // 评论 - 跳转详情
  container.querySelectorAll('.post-comment-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      location.hash = '#/community/detail?id=' + btn.dataset.id;
    });
  });

  // 卡片点击 - 跳转详情
  container.querySelectorAll('.post-card').forEach(card => {
    card.addEventListener('click', () => {
      location.hash = '#/community/detail?id=' + card.dataset.id;
    });
  });
}

// ---- 动态详情 + 评论 ----
export function renderCommunityDetail(container, params) {
  const postId = params.id || 'post_01';
  const allPosts = getStoredPosts();
  const post = allPosts.find(p => p._id === postId) || allPosts[0];
  const allComments = getStoredComments();
  const postComments = allComments[postId] || [];
  const likedIds = getLikedPosts();
  const isLiked = likedIds.includes(post._id);
  const color = avatarColor(post.nickname);

  container.innerHTML = `
    <div class="page active" id="page-community-detail">
      <div class="detail-nav">
        <span class="nav-back" id="cmt-back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
        </span>
        <span class="nav-title">动态详情</span>
        <span class="nav-right"></span>
      </div>
      <div class="post-detail-content">
        <div class="post-header">
          <div class="post-avatar" style="background:${color}">${avatarLetter(post.nickname)}</div>
          <div class="post-user-info">
            <div class="post-nickname">${post.nickname}</div>
            <div class="post-time">${timeAgo(post.createdAt)}</div>
          </div>
        </div>
        <div class="post-body">${post.content}</div>
        ${post.checkin ? `
          <div class="post-checkin-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            练习 ${post.checkin.duration} 分钟${post.checkin.moves ? ' · ' + post.checkin.moves.join('、') : ''}
          </div>` : ''}
        <div class="post-tags">
          ${post.tags.map(t => `<span class="post-tag">#${t}</span>`).join('')}
        </div>
        <div class="post-detail-actions">
          <div class="post-action post-detail-like ${isLiked ? 'liked' : ''}" id="detail-like-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isLiked ? '#e74c3c' : 'none'}" stroke="${isLiked ? '#e74c3c' : 'currentColor'}" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <span>${post.likes}</span>
          </div>
        </div>
      </div>

      <div class="comments-section">
        <div class="comments-title">评论 (${postComments.length})</div>
        <div class="comments-list" id="comments-list">
          ${postComments.map(c => `
            <div class="comment-item">
              <div class="comment-avatar" style="background:${avatarColor(c.nickname)}">${avatarLetter(c.nickname)}</div>
              <div class="comment-body">
                <div class="comment-nickname">${c.nickname}</div>
                <div class="comment-text">${c.content}</div>
                <div class="comment-time">${timeAgo(c.createdAt)}</div>
              </div>
            </div>
          `).join('')}
          ${postComments.length === 0 ? '<div class="comments-empty">暂无评论，快来发表第一条评论吧</div>' : ''}
        </div>
      </div>

      <div class="comment-input-bar" id="comment-input-bar">
        <input type="text" class="comment-input" id="comment-input" placeholder="写评论..." maxlength="200">
        <button class="comment-send-btn" id="comment-send-btn">发送</button>
      </div>
    </div>
  `;

  document.getElementById('cmt-back')?.addEventListener('click', () => location.hash = '#/community');

  // 点赞
  document.getElementById('detail-like-btn')?.addEventListener('click', () => {
    const allPosts = getStoredPosts();
    const p = allPosts.find(pp => pp._id === post._id);
    if (!p) return;
    const likes = getLikedPosts();
    const idx = likes.indexOf(post._id);
    if (idx >= 0) { likes.splice(idx, 1); p.likes = Math.max(0, p.likes - 1); }
    else { likes.push(post._id); p.likes += 1; }
    saveLikedPosts(likes);
    savePosts(allPosts);
    const btn = document.getElementById('detail-like-btn');
    const liked = likes.includes(post._id);
    btn.classList.toggle('liked', liked);
    btn.querySelector('svg').setAttribute('fill', liked ? '#e74c3c' : 'none');
    btn.querySelector('svg').setAttribute('stroke', liked ? '#e74c3c' : 'currentColor');
    btn.querySelector('span').textContent = p.likes;
  });

  // 发评论
  document.getElementById('comment-send-btn')?.addEventListener('click', () => {
    const input = document.getElementById('comment-input');
    const text = input.value.trim();
    if (!text) { showToast('请输入评论内容'); return; }

    const allComments = getStoredComments();
    if (!allComments[post._id]) allComments[post._id] = [];
    allComments[post._id].push({
      _id: 'cmt_' + Date.now(),
      nickname: '我',
      content: text,
      createdAt: new Date().toISOString()
    });
    saveComments(allComments);

    // 更新评论数
    const allPosts = getStoredPosts();
    const p = allPosts.find(pp => pp._id === post._id);
    if (p) { p.comments = (allComments[post._id] || []).length; savePosts(allPosts); }

    input.value = '';
    showToast('评论成功');
    renderCommunityDetail(container, params);
  });

  // 回车发送
  document.getElementById('comment-input')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('comment-send-btn')?.click();
  });
}

export function destroyCommunity() {}
export function destroyCommunityDetail() {}

// ---- 发布动态 ----
export function renderPublish(container, params) {
  const preContent = params.content || '';
  const preTags = params.tags || '';

  container.innerHTML = `
    <div class="page active" id="page-publish">
      <div class="detail-nav">
        <span class="nav-back" id="publish-back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
        </span>
        <span class="nav-title">发布动态</span>
        <span class="nav-right" id="publish-submit" style="cursor:pointer;color:#d4a574;font-size:14px;font-weight:600">发布</span>
      </div>
      <div class="publish-form">
        <textarea class="publish-textarea" id="publish-text" placeholder="分享你的太极心得、练习感悟..." maxlength="500">${preContent}</textarea>
        <div class="publish-count"><span id="text-count">0</span>/500</div>
        <div class="publish-tags-section">
          <div class="publish-tags-label">添加标签</div>
          <div class="publish-tags-input">
            <input type="text" class="publish-tag-input" id="publish-tag-input" placeholder="输入标签后回车" maxlength="10">
          </div>
          <div class="publish-tags-list" id="publish-tags-list"></div>
        </div>
        ${preContent ? `
          <div class="publish-checkin-info">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4a9f6b" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            附带打卡记录
          </div>` : ''}
      </div>
    </div>
  `;

  let tags = preTags ? preTags.split(',').filter(Boolean) : [];
  const textarea = document.getElementById('publish-text');
  const countEl = document.getElementById('text-count');
  const tagInput = document.getElementById('publish-tag-input');
  const tagsList = document.getElementById('publish-tags-list');

  function renderTags() {
    tagsList.innerHTML = tags.map((t, i) => `
      <span class="publish-tag-item">${t}<span class="publish-tag-remove" data-idx="${i}">&times;</span></span>
    `).join('');
    tagsList.querySelectorAll('.publish-tag-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        tags.splice(parseInt(btn.dataset.idx), 1);
        renderTags();
      });
    });
  }

  if (preContent) {
    countEl.textContent = preContent.length;
    textarea.value = preContent;
  }
  renderTags();

  textarea.addEventListener('input', () => {
    countEl.textContent = textarea.value.length;
  });

  tagInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = tagInput.value.trim();
      if (val && !tags.includes(val) && tags.length < 5) {
        tags.push(val);
        tagInput.value = '';
        renderTags();
      } else if (tags.length >= 5) {
        showToast('最多添加5个标签');
      }
    }
  });

  document.getElementById('publish-back')?.addEventListener('click', () => {
    history.back();
  });

  document.getElementById('publish-submit')?.addEventListener('click', () => {
    const content = textarea.value.trim();
    if (!content) { showToast('请输入内容'); return; }

    const allPosts = getStoredPosts();
    const newPost = {
      _id: 'post_' + Date.now(),
      userId: 'user_me',
      nickname: '我',
      avatar: '',
      content,
      tags: tags.length > 0 ? tags : ['太极打卡'],
      likes: 0,
      comments: 0,
      liked: false,
      createdAt: new Date().toISOString(),
      checkin: preContent ? { duration: parseInt(params.duration) || 0, moves: [] } : null
    };
    allPosts.unshift(newPost);
    savePosts(allPosts);
    showToast('发布成功！');
    location.hash = '#/community';
  });
}

export function destroyPublish() {}

// ---- 我的动态 ----
export function renderMyPosts(container) {
  const allPosts = getStoredPosts();
  const myPosts = allPosts.filter(p => p.userId === 'user_me');
  const likedIds = getLikedPosts();

  container.innerHTML = `
    <div class="page active" id="page-my-posts">
      <div class="detail-nav">
        <span class="nav-back" id="my-posts-back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
        </span>
        <span class="nav-title">我的动态</span>
        <span class="nav-right"></span>
      </div>
      ${myPosts.length === 0 ? `
        <div class="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d8cfc5" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          <div class="empty-text">还没有发布过动态</div>
          <div class="empty-sub">打卡后可以分享你的练习心得</div>
        </div>
      ` : `
        <div class="community-feed">
          ${myPosts.map(post => {
            const color = avatarColor(post.nickname);
            return `
              <div class="post-card" data-id="${post._id}">
                <div class="post-header">
                  <div class="post-avatar" style="background:${color}">${avatarLetter(post.nickname)}</div>
                  <div class="post-user-info">
                    <div class="post-nickname">${post.nickname}</div>
                    <div class="post-time">${timeAgo(post.createdAt)}</div>
                  </div>
                  <div class="post-delete-btn" data-id="${post._id}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  </div>
                </div>
                <div class="post-content">${post.content}</div>
                <div class="post-tags">
                  ${post.tags.map(t => `<span class="post-tag">#${t}</span>`).join('')}
                </div>
                <div class="post-actions">
                  <div class="post-action">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    <span>${post.likes}</span>
                  </div>
                  <div class="post-action">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    <span>${post.comments}</span>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `}
    </div>
  `;

  document.getElementById('my-posts-back')?.addEventListener('click', () => location.hash = '#/mine');

  // 删除动态
  container.querySelectorAll('.post-delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const posts = getStoredPosts().filter(p => p._id !== id);
      savePosts(posts);
      showToast('已删除');
      renderMyPosts(container);
    });
  });
}

export function destroyMyPosts() {}
