/**
 * AI Timeline - Main Application
 * Minimal timeline UX, left-to-right chronology
 */

(function () {
  'use strict';

  const CATEGORIES = {
    'model-release': 'Model Release',
    'architecture': 'Architecture',
    'product-launch': 'Product Launch',
    'research': 'Research',
    'open-source': 'Open Source',
    'regulation': 'Regulation',
    'milestone': 'Milestone',
    'tool': 'Tool',
  };

  // State
  let allEvents = [];
  let activeCategory = null;
  let searchQuery = '';
  let detailCache = {};
  let timelineObserver = null;
  let autoFocusRecent = true;
  let eventById = new Map();
  let navScrollRaf = null;
  let navScrollDir = 0;
  let navScrollVelocity = 0;
  let isFilterPanelOpen = false;
  const TIMELINE_FUTURE_BUFFER_MONTHS = 6;

  // DOM
  const filterBar = document.querySelector('.filter-bar');
  const filterToggle = document.getElementById('filter-toggle');
  const filterPanel = document.getElementById('filter-panel');
  const timelineContainer = document.getElementById('timeline');
  const scrollContainer = document.getElementById('timeline-scroll');
  const timelinePrev = document.getElementById('timeline-prev');
  const timelineNext = document.getElementById('timeline-next');
  const timelinePosition = document.getElementById('timeline-position');
  const searchInput = document.getElementById('search-input');
  const filterChipsContainer = document.getElementById('filter-chips');
  const detailOverlay = document.getElementById('detail-overlay');
  const detailPanel = document.getElementById('detail-panel');
  const detailHeaderMeta = document.getElementById('detail-header-meta');
  const detailClose = document.getElementById('detail-close');
  const detailBody = document.getElementById('detail-body');
  const eventCountEl = document.getElementById('event-count');
  const yearSpanEl = document.getElementById('year-span');
  const mobileLayoutQuery = window.matchMedia('(max-width: 820px)');

  // --- Theme ---
  function initTheme() {
    const stored = localStorage.getItem('ai-timeline-theme');
    document.documentElement.setAttribute('data-theme', stored || 'dark');
  }

  function toggleTheme() {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('ai-timeline-theme', next);
  }

  // --- Data ---
  async function loadEvents() {
    try {
      const response = await fetch('js/events.json');
      if (!response.ok) throw new Error('Failed to load events index');
      const raw = await response.json();

      allEvents = raw.slice().sort((a, b) => {
        if (a.date === b.date) return (a.title || '').localeCompare(b.title || '');
        return a.date.localeCompare(b.date);
      });

      updateStats();
      renderFilters();
      renderTimeline();
    } catch (err) {
      console.error('Error loading events:', err);
      if (timelineContainer) {
        timelineContainer.innerHTML = `
          <div class="no-results">
            <div class="no-results-icon">&#9888;</div>
            <h3>Could not load events</h3>
            <p>Run: <code>node scripts/build-index.js</code></p>
          </div>`;
      }
      setTimelineControlsDisabled(true);
      if (timelinePosition) timelinePosition.textContent = 'Unavailable';
    }
  }

  function updateStats() {
    if (eventCountEl) eventCountEl.textContent = allEvents.length;
    if (!yearSpanEl) return;

    if (allEvents.length === 0) {
      yearSpanEl.textContent = '-';
      return;
    }

    const first = new Date(allEvents[0].date + 'T00:00:00').getFullYear();
    const last = new Date(allEvents[allEvents.length - 1].date + 'T00:00:00').getFullYear();
    yearSpanEl.textContent = `${first}-${last}`;
  }

  // --- Filtering ---
  function getFilteredEvents() {
    return allEvents.filter(ev => {
      const catMatch = !activeCategory || ev.category === activeCategory;
      const q = searchQuery;
      const searchMatch = !q
        || (ev.title && ev.title.toLowerCase().includes(q))
        || (ev.short && ev.short.toLowerCase().includes(q))
        || (ev.tags && ev.tags.some(tag => tag.toLowerCase().includes(q)));
      return catMatch && searchMatch;
    });
  }

  function getEventId(event) {
    if (event && event.file) {
      return `event-${event.file.replace(/\.md$/i, '')}`;
    }
    const date = (event && event.date) ? event.date : 'event';
    const title = (event && event.title) ? event.title : 'item';
    const slug = `${date}-${title}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return `event-${slug}`;
  }

  function getEventPermalink(event, eventId) {
    if (event && event.permalink) {
      return new URL(event.permalink, window.location.href).href;
    }
    return new URL(`#${eventId}`, window.location.href).href;
  }

  function setEventHash(eventId) {
    const nextHash = `#${eventId}`;
    if (window.location.hash === nextHash) return;
    history.replaceState(null, '', `${window.location.pathname}${window.location.search}${nextHash}`);
  }

  function clearEventHash() {
    if (!window.location.hash) return;
    history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
  }

  function getEventByHash() {
    const hash = window.location.hash ? decodeURIComponent(window.location.hash.slice(1)) : '';
    if (!hash) return null;
    return eventById.get(hash) || null;
  }

  function setFilterPanelOpen(open, options = {}) {
    if (!filterPanel || !filterToggle) return;
    isFilterPanelOpen = !!open;
    filterPanel.hidden = !isFilterPanelOpen;
    filterPanel.classList.toggle('open', isFilterPanelOpen);
    if (filterBar) filterBar.classList.toggle('open', isFilterPanelOpen);
    filterToggle.setAttribute('aria-expanded', isFilterPanelOpen ? 'true' : 'false');
    if (isFilterPanelOpen && options.focusSearch && searchInput) {
      searchInput.focus();
    }
  }

  function isMobileStackedLayout() {
    return !!mobileLayoutQuery.matches;
  }

  function scrollToEventId(eventId, behavior) {
    if (!eventId || !scrollContainer) return;
    const target = document.getElementById(eventId);
    if (!target) return;
    target.scrollIntoView({
      behavior: behavior || 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  }

  function openEventFromHash(options = {}) {
    const event = getEventByHash();
    if (!event) return false;
    const eventId = getEventId(event);
    if (options.scroll !== false) {
      scrollToEventId(eventId, options.behavior || 'smooth');
    }
    openDetail(event, { updateHash: false });
    return true;
  }

  function renderFilters() {
    if (!filterChipsContainer) return;
    filterChipsContainer.innerHTML = '';

    const allChip = document.createElement('button');
    allChip.className = 'filter-chip active';
    allChip.textContent = 'All';
    allChip.setAttribute('aria-pressed', 'true');
    allChip.addEventListener('click', () => {
      activeCategory = null;
      updateChips();
      autoFocusRecent = true;
      renderTimeline();
    });
    filterChipsContainer.appendChild(allChip);

    for (const [key, label] of Object.entries(CATEGORIES)) {
      const chip = document.createElement('button');
      chip.className = 'filter-chip';
      chip.textContent = label;
      chip.dataset.category = key;
      chip.setAttribute('aria-pressed', 'false');
      chip.addEventListener('click', () => {
        activeCategory = activeCategory === key ? null : key;
        updateChips();
        autoFocusRecent = true;
        renderTimeline();
      });
      filterChipsContainer.appendChild(chip);
    }
  }

  function updateChips() {
    if (!filterChipsContainer) return;
    filterChipsContainer.querySelectorAll('.filter-chip').forEach(chip => {
      const isAll = !chip.dataset.category;
      const active = isAll ? !activeCategory : chip.dataset.category === activeCategory;
      chip.classList.toggle('active', active);
      chip.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  // --- Timeline controls ---
  function setTimelineControlsDisabled(disabled) {
    if (timelinePrev) timelinePrev.disabled = disabled;
    if (timelineNext) timelineNext.disabled = disabled;
  }

  function updateTimelinePosition() {
    if (!timelinePosition || !scrollContainer || !timelineContainer) return;

    const eventEls = Array.from(timelineContainer.querySelectorAll('.timeline-event'));
    if (eventEls.length === 0) {
      timelinePosition.textContent = 'No events';
      return;
    }

    const leftEdge = scrollContainer.scrollLeft;
    const rightEdge = leftEdge + scrollContainer.clientWidth;

    const visibleYears = eventEls
      .filter(el => {
        const elLeft = el.offsetLeft;
        const elRight = elLeft + el.offsetWidth;
        return elRight >= leftEdge && elLeft <= rightEdge;
      })
      .map(el => Number(el.dataset.year))
      .filter(Number.isFinite);

    let minYear;
    let maxYear;

    if (visibleYears.length > 0) {
      minYear = Math.min(...visibleYears);
      maxYear = Math.max(...visibleYears);
    } else {
      const center = leftEdge + (scrollContainer.clientWidth / 2);
      let closest = eventEls[0];
      let bestDist = Infinity;

      eventEls.forEach(el => {
        const elCenter = el.offsetLeft + (el.offsetWidth / 2);
        const dist = Math.abs(elCenter - center);
        if (dist < bestDist) {
          bestDist = dist;
          closest = el;
        }
      });

      minYear = Number(closest.dataset.year);
      maxYear = minYear;
    }

    timelinePosition.textContent = minYear === maxYear ? `${minYear}` : `${minYear} - ${maxYear}`;
  }

  function updateTimelineControlsState() {
    if (!scrollContainer) return;

    const maxScroll = Math.max(0, scrollContainer.scrollWidth - scrollContainer.clientWidth);
    if (timelinePrev) timelinePrev.disabled = scrollContainer.scrollLeft <= 2;
    if (timelineNext) timelineNext.disabled = scrollContainer.scrollLeft >= maxScroll - 2;

    updateTimelinePosition();
  }

  function stopNavContinuousScroll() {
    navScrollDir = 0;
    navScrollVelocity = 0;
    if (!navScrollRaf) return;
    cancelAnimationFrame(navScrollRaf);
    navScrollRaf = null;
  }

  function startNavContinuousScroll(direction) {
    if (!scrollContainer) return;
    if ((timelinePrev && direction < 0 && timelinePrev.disabled) || (timelineNext && direction > 0 && timelineNext.disabled)) {
      return;
    }

    stopNavContinuousScroll();
    navScrollDir = direction;
    navScrollVelocity = 0;
    let prevTs = 0;

    const tick = ts => {
      if (!scrollContainer || navScrollDir === 0) {
        stopNavContinuousScroll();
        return;
      }

      if (!prevTs) prevTs = ts;
      const dt = Math.max(8, Math.min(32, ts - prevTs));
      prevTs = ts;

      const maxVelocity = Math.max(900, scrollContainer.clientWidth * 2.2); // px/s
      navScrollVelocity = Math.min(maxVelocity, navScrollVelocity + (dt * 5.2));

      const maxScroll = Math.max(0, scrollContainer.scrollWidth - scrollContainer.clientWidth);
      const delta = (navScrollVelocity * dt) / 1000;
      const nextLeft = scrollContainer.scrollLeft + (navScrollDir * delta);

      if (nextLeft <= 0) {
        scrollContainer.scrollLeft = 0;
        updateTimelineControlsState();
        stopNavContinuousScroll();
        return;
      }

      if (nextLeft >= maxScroll) {
        scrollContainer.scrollLeft = maxScroll;
        updateTimelineControlsState();
        stopNavContinuousScroll();
        return;
      }

      scrollContainer.scrollLeft = nextLeft;
      updateTimelineControlsState();
      navScrollRaf = requestAnimationFrame(tick);
    };

    navScrollRaf = requestAnimationFrame(tick);
  }

  function focusRecentDates() {
    if (!scrollContainer) return;
    const maxScroll = Math.max(0, scrollContainer.scrollWidth - scrollContainer.clientWidth);
    scrollContainer.scrollLeft = maxScroll;
    updateTimelineControlsState();
  }

  function scrollTimelineBy(direction) {
    if (!scrollContainer) return;
    const step = Math.max(72, Math.round(scrollContainer.clientWidth * 0.12));
    scrollContainer.scrollBy({ left: direction * step, behavior: 'auto' });
  }

  function initTimelineControls() {
    if (!scrollContainer) return;

    if (timelinePrev) {
      timelinePrev.addEventListener('click', e => {
        e.preventDefault();
      });
      timelinePrev.addEventListener('pointerdown', e => {
        e.preventDefault();
        startNavContinuousScroll(-1);
      });
      timelinePrev.addEventListener('pointerup', stopNavContinuousScroll);
      timelinePrev.addEventListener('pointerleave', stopNavContinuousScroll);
      timelinePrev.addEventListener('pointercancel', stopNavContinuousScroll);
    }

    if (timelineNext) {
      timelineNext.addEventListener('click', e => {
        e.preventDefault();
      });
      timelineNext.addEventListener('pointerdown', e => {
        e.preventDefault();
        startNavContinuousScroll(1);
      });
      timelineNext.addEventListener('pointerup', stopNavContinuousScroll);
      timelineNext.addEventListener('pointerleave', stopNavContinuousScroll);
      timelineNext.addEventListener('pointercancel', stopNavContinuousScroll);
    }

    scrollContainer.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollTimelineBy(1);
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollTimelineBy(-1);
      }
      if (e.key === 'Home') {
        e.preventDefault();
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
      }
      if (e.key === 'End') {
        e.preventDefault();
        scrollContainer.scrollTo({ left: scrollContainer.scrollWidth, behavior: 'smooth' });
      }
    });

    const onScroll = debounce(updateTimelineControlsState, 40);
    scrollContainer.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', debounce(updateTimelineControlsState, 140));
  }

  // --- Rendering ---
  function formatDate(dateStr) {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  function formatShortDate(dateStr) {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  function formatMonthLabel(monthNumber) {
    return String(monthNumber).padStart(2, '0');
  }

  function applyTimelineDensity(eventCount) {
    if (!timelineContainer) return;

    timelineContainer.classList.remove(
      'timeline-density-roomy',
      'timeline-density-balanced',
      'timeline-density-compact'
    );

    let density = 'timeline-density-roomy';
    if (eventCount >= 56) {
      density = 'timeline-density-compact';
    } else if (eventCount >= 32) {
      density = 'timeline-density-balanced';
    }

    timelineContainer.classList.add(density);
  }

  function renderTimeline() {
    if (!timelineContainer) return;

    const events = getFilteredEvents();
    const renderEvents = isMobileStackedLayout() ? events.slice().reverse() : events;
    const groupedEvents = [];

    renderEvents.forEach(event => {
      const prevGroup = groupedEvents[groupedEvents.length - 1];
      if (prevGroup && prevGroup.date === event.date) {
        prevGroup.events.push(event);
      } else {
        groupedEvents.push({ date: event.date, events: [event] });
      }
    });

    eventById = new Map();
    const beam = timelineContainer.querySelector('.timeline-beam');
    timelineContainer.innerHTML = '';
    if (beam) timelineContainer.appendChild(beam);

    applyTimelineDensity(renderEvents.length);

    if (renderEvents.length === 0) {
      timelineContainer.innerHTML = `
        <div class="no-results">
          <div class="no-results-icon">&#128269;</div>
          <h3>No events found</h3>
          <p>Try adjusting search or category filters.</p>
        </div>`;
      setTimelineControlsDisabled(true);
      if (timelinePosition) timelinePosition.textContent = 'No events';
      autoFocusRecent = false;
      return;
    }

    const monthIndexFromDate = dateStr => {
      const date = new Date(dateStr + 'T00:00:00');
      return (date.getFullYear() * 12) + date.getMonth();
    };
    const monthPartsFromIndex = monthIndex => {
      const year = Math.floor(monthIndex / 12);
      const monthNumber = (monthIndex % 12) + 1;
      return { year, monthNumber };
    };
    const firstMonthIndex = monthIndexFromDate(renderEvents[0].date);
    const lastMonthIndex = monthIndexFromDate(renderEvents[renderEvents.length - 1].date);
    const monthDirection = firstMonthIndex <= lastMonthIndex ? 1 : -1;
    const earliestEventMonthIndex = monthIndexFromDate(events[0].date);
    const latestEventMonthIndex = monthIndexFromDate(events[events.length - 1].date);
    const rangeStartMonthIndex = Math.floor(earliestEventMonthIndex / 12) * 12;
    const rangeEndBaseMonthIndex = (Math.floor(latestEventMonthIndex / 12) * 12) + 11;
    const rangeEndMonthIndex = Math.max(rangeEndBaseMonthIndex, latestEventMonthIndex + TIMELINE_FUTURE_BUFFER_MONTHS);
    let monthCursor = monthDirection === 1 ? rangeStartMonthIndex : rangeEndMonthIndex;
    const finalMonthIndex = monthDirection === 1 ? rangeEndMonthIndex : rangeStartMonthIndex;
    let currentMarkerYear = null;

    const appendYearMarker = year => {
      const yearMarker = document.createElement('div');
      yearMarker.className = 'timeline-year-marker';
      yearMarker.innerHTML = `<span>${year}</span>`;
      timelineContainer.appendChild(yearMarker);
    };

    const appendMonthMarker = monthIndex => {
      const { year, monthNumber } = monthPartsFromIndex(monthIndex);
      if (year !== currentMarkerYear) {
        currentMarkerYear = year;
        appendYearMarker(year);
      }

      const monthMarker = document.createElement('div');
      monthMarker.className = 'timeline-month-marker';
      monthMarker.dataset.month = formatMonthLabel(monthNumber);
      monthMarker.innerHTML = `<span>${formatMonthLabel(monthNumber)}</span>`;
      timelineContainer.appendChild(monthMarker);
    };

    const advanceMonthMarkersTo = targetMonthIndex => {
      while ((monthDirection === 1 && monthCursor <= targetMonthIndex) || (monthDirection === -1 && monthCursor >= targetMonthIndex)) {
        appendMonthMarker(monthCursor);
        monthCursor += monthDirection;
      }
    };

    groupedEvents.forEach((group, i) => {
      const firstEvent = group.events[0];
      const eventDate = new Date(firstEvent.date + 'T00:00:00');
      const year = eventDate.getFullYear();
      const eventMonthIndex = monthIndexFromDate(firstEvent.date);
      advanceMonthMarkersTo(eventMonthIndex);

      const eventEl = document.createElement('article');
      eventEl.className = 'timeline-event';
      if (group.events.length > 1) eventEl.classList.add('timeline-event-group');
      eventEl.dataset.year = String(year);
      eventEl.dataset.date = firstEvent.date;
      eventEl.style.transitionDelay = `${Math.min(i * 0.03, 0.42)}s`;

      eventEl.innerHTML = `
        <div class="timeline-node" data-category="${firstEvent.category}" aria-hidden="true"></div>
        <div class="timeline-connector" aria-hidden="true"></div>
        <div class="timeline-event-stack"></div>`;

      timelineContainer.appendChild(eventEl);
      const stackEl = eventEl.querySelector('.timeline-event-stack');

      group.events.forEach(event => {
        const eventId = getEventId(event);
        eventById.set(eventId, event);

        const tags = event.tags && event.tags.length > 0
          ? `<div class="event-tags">${event.tags.slice(0, 3).map(tag => `<span class="event-tag">${tag}</span>`).join('')}</div>`
          : '';

        const itemEl = document.createElement('div');
        itemEl.className = 'timeline-event-item';
        itemEl.id = eventId;
        itemEl.innerHTML = `
          <div class="event-card" data-category="${event.category}" tabindex="0" role="button" aria-label="View details: ${event.title}">
            <div class="event-meta-row">
              <time class="event-date" datetime="${event.date}">${formatShortDate(event.date)}</time>
            </div>
            <span class="event-category-badge" data-category="${event.category}">${CATEGORIES[event.category] || event.category}</span>
            <h3 class="event-title">${event.title}</h3>
            <p class="event-short">${event.short}</p>
            ${tags}
          </div>`;

        const card = itemEl.querySelector('.event-card');
        card.addEventListener('click', () => openDetail(event, { updateHash: true }));
        card.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openDetail(event, { updateHash: true });
          }
        });

        stackEl.appendChild(itemEl);
      });
    });
    advanceMonthMarkersTo(finalMonthIndex);

    observeEvents();
    requestAnimationFrame(() => {
      if (openEventFromHash({ scroll: true })) {
        autoFocusRecent = false;
        return;
      }
      if (autoFocusRecent) {
        if (!isMobileStackedLayout()) {
          focusRecentDates();
        } else {
          updateTimelineControlsState();
        }
        autoFocusRecent = false;
        return;
      }
      updateTimelineControlsState();
    });
  }

  // --- Scroll Animations ---
  function observeEvents() {
    if (!timelineContainer) return;

    const items = timelineContainer.querySelectorAll('.timeline-event');
    if (timelineObserver) {
      timelineObserver.disconnect();
      timelineObserver = null;
    }
    items.forEach(item => item.classList.add('visible'));
  }

  // --- Drag to scroll ---
  function initDragScroll() {
    if (!scrollContainer) return;

    let activePointerId = null;
    let startX = 0;
    let startLeft = 0;
    let dragging = false;

    function isInteractiveTarget(target) {
      return !!target.closest('.event-card, a, button, input, textarea, select, label');
    }

    function endDrag() {
      if (!dragging) return;
      dragging = false;
      activePointerId = null;
      scrollContainer.style.cursor = 'grab';
      scrollContainer.style.scrollBehavior = '';
      scrollContainer.classList.remove('is-dragging');
    }

    scrollContainer.addEventListener('pointerdown', e => {
      if (e.button !== 0) return;
      if (isInteractiveTarget(e.target)) return;

      dragging = true;
      activePointerId = e.pointerId;
      startX = e.clientX;
      startLeft = scrollContainer.scrollLeft;
      scrollContainer.style.cursor = 'grabbing';
      scrollContainer.style.scrollBehavior = 'auto';
      scrollContainer.classList.add('is-dragging');
      scrollContainer.setPointerCapture(e.pointerId);
      e.preventDefault();
    });

    scrollContainer.addEventListener('pointermove', e => {
      if (!dragging || e.pointerId !== activePointerId) return;
      const delta = e.clientX - startX;
      const maxScroll = Math.max(0, scrollContainer.scrollWidth - scrollContainer.clientWidth);
      const nextLeft = Math.min(maxScroll, Math.max(0, startLeft - delta));
      scrollContainer.scrollLeft = nextLeft;
      e.preventDefault();
    });

    scrollContainer.addEventListener('pointerup', e => {
      if (e.pointerId !== activePointerId) return;
      endDrag();
    });
    scrollContainer.addEventListener('pointercancel', endDrag);
    scrollContainer.addEventListener('lostpointercapture', endDrag);

    scrollContainer.addEventListener('dragstart', e => e.preventDefault());

    window.addEventListener('blur', endDrag);
    window.addEventListener('mouseup', stopNavContinuousScroll);
  }

  // --- Detail Panel ---
  async function openDetail(event, options = {}) {
    if (!detailPanel || !detailOverlay || !detailBody || !detailHeaderMeta) return;
    const eventId = getEventId(event);
    const updateHash = options.updateHash !== false;
    const permalinkUrl = getEventPermalink(event, eventId);

    if (updateHash) setEventHash(eventId);

    detailPanel.classList.add('open');
    detailPanel.setAttribute('aria-hidden', 'false');
    detailOverlay.classList.add('open');
    detailOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    detailHeaderMeta.innerHTML = `
      <time class="event-date" datetime="${event.date}">${formatDate(event.date)}</time>
      <span class="event-category-badge" data-category="${event.category}">${CATEGORIES[event.category] || event.category}</span>
      <button type="button" class="detail-copy-link" data-copy-url="${permalinkUrl}" aria-label="Copy event link" title="Copy event link">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M15 7h3a5 5 0 0 1 0 10h-3"/>
          <path d="M9 17H6a5 5 0 1 1 0-10h3"/>
          <path d="M8 12h8"/>
        </svg>
      </button>`;

    detailBody.innerHTML = `
      <h1 class="detail-title">${event.title}</h1>
      <p class="detail-short">${event.short}</p>
      <div class="detail-loading"><div class="spinner"></div> Loading...</div>`;

    try {
      let markdown = detailCache[event.file];
      if (!markdown) {
        const response = await fetch(`events/${event.file}`);
        if (!response.ok) throw new Error('Failed to load event markdown');
        markdown = await response.text();
        detailCache[event.file] = markdown;
      }

      const links = parseFrontmatterLinks(markdown);
      const body = markdown.replace(/^---[\s\S]*?---\n*/, '');
      const html = typeof marked !== 'undefined' ? marked.parse(body) : fallbackMd(body);

      const linksHtml = links.length > 0
        ? `<div class="detail-links">${links.map(link => `
            <a href="${link.url}" class="detail-link" target="_blank" rel="noopener noreferrer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              ${link.label}
            </a>`).join('')}
          </div>`
        : '';

      detailBody.innerHTML = `
        <h1 class="detail-title">${event.title}</h1>
        <p class="detail-short">${event.short}</p>
        ${linksHtml}
        <div class="detail-content">${html}</div>`;

      const copyLinkBtn = detailHeaderMeta.querySelector('.detail-copy-link');
      if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', async () => {
          const copyTarget = copyLinkBtn.dataset.copyUrl || permalinkUrl;
          const copied = await copyTextToClipboard(copyTarget);
          copyLinkBtn.classList.toggle('copied', copied);
          copyLinkBtn.setAttribute('aria-label', copied ? 'Event link copied' : 'Could not copy event link');
          copyLinkBtn.title = copied ? 'Copied' : 'Copy failed';
          window.setTimeout(() => {
            copyLinkBtn.classList.remove('copied');
            copyLinkBtn.setAttribute('aria-label', 'Copy event link');
            copyLinkBtn.title = 'Copy event link';
          }, 1400);
        });
      }
    } catch (err) {
      console.error('Error loading detail panel:', err);
      detailBody.innerHTML = `
        <h1 class="detail-title">${event.title}</h1>
        <p class="detail-short">${event.short}</p>
        <div class="no-results"><p>Could not load full article.</p></div>`;
    }

    if (detailClose) detailClose.focus();
  }

  function parseFrontmatterLinks(markdown) {
    const match = markdown.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return [];

    const links = [];
    let inLinks = false;
    let current = {};

    for (const line of match[1].split('\n')) {
      if (line.match(/^links:/)) {
        inLinks = true;
        continue;
      }

      if (!inLinks) continue;

      if (line.match(/^\w/) && !line.match(/^\s/)) {
        inLinks = false;
        continue;
      }

      const labelMatch = line.match(/label:\s*"([^"]+)"/);
      const urlMatch = line.match(/url:\s*"([^"]+)"/);

      if (labelMatch) current.label = labelMatch[1];
      if (urlMatch) {
        current.url = urlMatch[1];
        if (current.label) {
          links.push({ ...current });
          current = {};
        }
      }
    }

    return links;
  }

  function closeDetail() {
    if (!detailPanel || !detailOverlay) return;
    detailPanel.classList.remove('open');
    detailPanel.setAttribute('aria-hidden', 'true');
    detailOverlay.classList.remove('open');
    detailOverlay.setAttribute('aria-hidden', 'true');
    if (detailHeaderMeta) detailHeaderMeta.innerHTML = '';
    document.body.style.overflow = '';
    clearEventHash();
  }

  function fallbackMd(text) {
    return text
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/^\- (.*$)/gm, '<li>$1</li>')
      .replace(/\n\n/g, '</p><p>');
  }

  function debounce(fn, ms) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  async function copyTextToClipboard(text) {
    if (!text) return false;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (err) {
      console.warn('Clipboard API write failed, using fallback.', err);
    }

    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.top = '-9999px';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const copied = document.execCommand('copy');
      document.body.removeChild(textarea);
      return copied;
    } catch (err) {
      console.error('Clipboard fallback failed:', err);
      return false;
    }
  }

  // --- Init ---
  function init() {
    initTheme();

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

    if (searchInput) {
      searchInput.addEventListener('input', debounce(function () {
        searchQuery = this.value.toLowerCase().trim();
        autoFocusRecent = true;
        renderTimeline();
      }, 220));
    }

    setFilterPanelOpen(false);
    if (filterToggle) {
      filterToggle.addEventListener('click', () => {
        setFilterPanelOpen(!isFilterPanelOpen, { focusSearch: !isFilterPanelOpen });
      });
    }

    if (detailClose) detailClose.addEventListener('click', closeDetail);
    if (detailOverlay) detailOverlay.addEventListener('click', closeDetail);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeDetail();
        if (isFilterPanelOpen) setFilterPanelOpen(false);
      }
    });
    document.addEventListener('click', e => {
      if (!isFilterPanelOpen || !filterBar) return;
      const clickedInsideFilterBar = filterBar.contains(e.target);
      const clickedFilterToggle = filterToggle && filterToggle.contains(e.target);
      if (!clickedInsideFilterBar && !clickedFilterToggle) setFilterPanelOpen(false);
    });
    window.addEventListener('hashchange', () => {
      if (openEventFromHash({ scroll: false })) return;
      closeDetail();
    });
    const onMobileLayoutChange = () => {
      autoFocusRecent = true;
      renderTimeline();
    };
    if (typeof mobileLayoutQuery.addEventListener === 'function') {
      mobileLayoutQuery.addEventListener('change', onMobileLayoutChange);
    } else if (typeof mobileLayoutQuery.addListener === 'function') {
      mobileLayoutQuery.addListener(onMobileLayoutChange);
    }

    initTimelineControls();
    initDragScroll();
    loadEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
