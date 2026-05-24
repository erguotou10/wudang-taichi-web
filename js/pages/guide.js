/**
 * 导览页 - 地图 + 景点列表
 */
import { spots, routes, spotCategoryColors } from '../mock-data.js';
import { showToast } from '../utils.js';

let map = null;
let routePolylines = [];
let currentView = 'map';
let currentRoute = 0;
let currentFilter = 'all';

// SVG marker icons by category
const spotCategorySVG = {
  palace: '<svg width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="none"><path d="M3 21h18v-2H3v2zm0-4h18v-1H3v1zm0-3h18v-1H3v1zm9-11L2 9h20L12 3z"/></svg>',
  nature: '<svg width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="none"><path d="M12 2L7 10h3l-2 6h8l-2-6h3L12 2z"/><rect x="11" y="16" width="2" height="6"/></svg>',
  heritage: '<svg width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="none"><path d="M12 2L2 7v2h20V7L12 2zM4 11v8h3v-8H4zm5 0v8h3v-8H9zm5 0v8h3v-8h-3zm5 0v8h3v-8h-3zM2 21h20v2H2v-2z"/></svg>'
};

// Spot list icons (slightly larger)
const spotListSVG = {
  palace: '<svg width="24" height="24" viewBox="0 0 24 24" fill="#b8322a" stroke="none"><path d="M3 21h18v-2H3v2zm0-4h18v-1H3v1zm0-3h18v-1H3v1zm9-11L2 9h20L12 3z"/></svg>',
  nature: '<svg width="24" height="24" viewBox="0 0 24 24" fill="#2d5a3d" stroke="none"><path d="M12 2L7 10h3l-2 6h8l-2-6h3L12 2z"/><rect x="11" y="16" width="2" height="6"/></svg>',
  heritage: '<svg width="24" height="24" viewBox="0 0 24 24" fill="#4a7dbd" stroke="none"><path d="M12 2L2 7v2h20V7L12 2zM4 11v8h3v-8H4zm5 0v8h3v-8H9zm5 0v8h3v-8h-3zm5 0v8h3v-8h-3zM2 21h20v2H2v-2z"/></svg>'
};

export function renderGuide(container) {
  currentView = 'map';
  currentRoute = 0;
  currentFilter = 'all';

  container.innerHTML = `
    <div class="page active" id="page-guide">
      <div class="guide-header">
        <div class="guide-header-row">
          <span class="guide-title">武当山景区导览</span>
          <div class="guide-toggle">
            <div class="guide-toggle-item active" data-view="map">地图</div>
            <div class="guide-toggle-item" data-view="list">列表</div>
          </div>
        </div>
      </div>
      <div id="guide-map-view">
        <div id="leaflet-map" style="height: 320px; width: 100%;"></div>
        <div class="route-panel">
          <div class="route-tabs" id="route-tabs">
            ${routes.map((r, i) => `
              <div class="route-tab ${i === 0 ? 'active' : ''}" data-index="${i}">${r.name}</div>
            `).join('')}
          </div>
          <div class="route-info" id="route-info"></div>
        </div>
      </div>
      <div id="guide-list-view" style="display:none;">
        <div class="filter-tabs" id="filter-tabs">
          <div class="filter-tab active" data-filter="all">全部</div>
          <div class="filter-tab" data-filter="palace">宫殿</div>
          <div class="filter-tab" data-filter="nature">自然</div>
          <div class="filter-tab" data-filter="heritage">古迹</div>
        </div>
        <div class="spot-list" id="spot-list"></div>
      </div>
    </div>
  `;

  // 初始化地图
  initLeafletMap();

  // 渲染路线信息
  renderRouteInfo();

  // 渲染景点列表
  renderSpotList();

  // 绑定事件
  bindEvents(container);
}

function initLeafletMap() {
  const L = window.L;
  if (!L) {
    console.warn('Leaflet 未加载');
    return;
  }

  map = L.map('leaflet-map', {
    center: [32.3995, 111.0045],
    zoom: 14,
    zoomControl: false
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap',
    maxZoom: 18
  }).addTo(map);

  // 添加景点标记 (SVG instead of emoji)
  spots.forEach(spot => {
    const color = spotCategoryColors[spot.category] || '#999';
    const svg = spotCategorySVG[spot.category] || spotCategorySVG.palace;
    const icon = L.divIcon({
      className: 'custom-marker',
      html: `<div style="background:${color};width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3);">${svg}</div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    L.marker([spot.location.latitude, spot.location.longitude], { icon })
      .addTo(map)
      .bindPopup(`<div class="popup-content"><strong>${spot.name}</strong><br><span style="font-size:12px;color:#666;">${spot.description}</span></div>`);
  });

  // 绘制路线
  drawRoutePolylines();

  // 添加缩放控件
  L.control.zoom({ position: 'topright' }).addTo(map);

  setTimeout(() => map.invalidateSize(), 100);
}

function drawRoutePolylines() {
  const L = window.L;
  if (!L || !map) return;

  // 清除已有路线
  routePolylines.forEach(p => map.removeLayer(p));
  routePolylines = [];

  const routeColors = ['#b8322a', '#d4a574', '#2d5a3d'];

  routes.forEach((route, i) => {
    const coords = route.spots
      .map(sid => spots.find(s => s._id === sid))
      .filter(Boolean)
      .map(s => [s.location.latitude, s.location.longitude]);

    if (coords.length < 2) return;

    const polyline = L.polyline(coords, {
      color: routeColors[i] || '#999',
      weight: 3,
      opacity: i === currentRoute ? 0.9 : 0.3,
      dashArray: i === currentRoute ? null : '6 4'
    }).addTo(map);

    routePolylines.push(polyline);
  });
}

function renderRouteInfo() {
  const route = routes[currentRoute];
  const el = document.getElementById('route-info');
  if (!el) return;

  const hours = Math.floor(route.totalDuration / 60);
  const km = (route.totalDistance / 1000).toFixed(1);

  el.innerHTML = `
    <div class="route-detail">
      <div class="route-name">${route.description}</div>
      <div class="route-meta">预计用时 ${hours}小时 · 步行 ${km}km</div>
    </div>
    <button class="route-nav-btn" id="route-nav-btn">开始导航</button>
  `;

  document.getElementById('route-nav-btn')?.addEventListener('click', () => {
    showToast('导航功能开发中');
  });
}

function renderSpotList() {
  const el = document.getElementById('spot-list');
  if (!el) return;

  const filtered = currentFilter === 'all'
    ? spots
    : spots.filter(s => s.category === currentFilter);

  el.innerHTML = filtered.map(spot => `
    <div class="spot-item" data-id="${spot._id}">
      <div class="spot-thumb ${spot.category}">
        ${spotListSVG[spot.category] || spotListSVG.palace}
      </div>
      <div class="spot-content">
        <div class="spot-name">${spot.name}</div>
        <div class="spot-desc">${spot.description}</div>
        <div class="spot-meta">
          <span class="spot-rating">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#d4a574" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/></svg>
            ${spot.rating}
          </span>
          <span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#b8a898" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            建议${spot.visitDuration}分钟
          </span>
        </div>
      </div>
    </div>
  `).join('');

  el.querySelectorAll('.spot-item').forEach(item => {
    item.addEventListener('click', () => showToast(`${spots.find(s => s._id === item.dataset.id)?.name} 详情`));
  });
}

function bindEvents(container) {
  // 视图切换
  container.querySelectorAll('.guide-toggle-item').forEach(item => {
    item.addEventListener('click', () => {
      currentView = item.dataset.view;
      container.querySelectorAll('.guide-toggle-item').forEach(t => t.classList.toggle('active', t === item));
      document.getElementById('guide-map-view').style.display = currentView === 'map' ? '' : 'none';
      document.getElementById('guide-list-view').style.display = currentView === 'list' ? '' : 'none';
      if (currentView === 'map' && map) setTimeout(() => map.invalidateSize(), 100);
    });
  });

  // 路线切换
  container.querySelectorAll('.route-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      currentRoute = parseInt(tab.dataset.index);
      container.querySelectorAll('.route-tab').forEach(t => t.classList.toggle('active', t === tab));
      renderRouteInfo();
      // 更新路线高亮
      routePolylines.forEach((p, i) => {
        p.setStyle({
          opacity: i === currentRoute ? 0.9 : 0.3,
          dashArray: i === currentRoute ? null : '6 4',
          weight: i === currentRoute ? 4 : 3
        });
      });
    });
  });

  // 筛选切换
  container.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      currentFilter = tab.dataset.filter;
      container.querySelectorAll('.filter-tab').forEach(t => t.classList.toggle('active', t === tab));
      renderSpotList();
    });
  });
}

export function destroyGuide() {
  if (map) {
    map.remove();
    map = null;
  }
}
