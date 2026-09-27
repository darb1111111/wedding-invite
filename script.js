// ── ENVELOPE INTRO ──
// Clicking the envelope fades it out and unlocks scrolling on the page.
const envelope = document.getElementById('envelope');
const body = document.body;
const backgroundMusic = new Audio('music/wedding-song.mp3');
backgroundMusic.preload = 'none';
backgroundMusic.loop = true;
backgroundMusic.volume = 0.18;

envelope.addEventListener('click', () => {
  backgroundMusic.play().catch(() => {});
  envelope.classList.add('hidden');
  body.classList.remove('locked');
}, { once: true });

// ── SMOOTH "ASSEMBLING" SCROLL-IN ──
// Each section with class="reveal" fades in; its children marked
// class="stagger-child" (with an --i index set inline) follow one
// after another with a small delay, so the section looks like it
// draws/assembles itself rather than just popping into view.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
      // If this is the schedule section, its items animate into their
      // final position — rebuild the connecting line once they settle
      // so it lines up with where the markers actually end up.
      if (entry.target.classList.contains('schedule') && typeof buildTimelinePath === 'function'){
        setTimeout(buildTimelinePath, 1100);
      }
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── SCHEDULE TIMELINE ──
// Builds a smooth curve through the real position of each flower marker
// (so it always lines up, whatever the text lengths are), then draws
// the line in progressively as the user scrolls past the section —
// rather than all at once.
const timelineEl = document.querySelector('.timeline');
const timelineSvg = document.getElementById('timelineSvg');
const timelinePath = document.getElementById('timelinePath');
let pathLength = 0;

function buildTimelinePath(){
  if (!timelineEl) return;
  const box = timelineEl.getBoundingClientRect();
  const w = box.width;
  const h = box.height;
  timelineSvg.setAttribute('viewBox', `0 0 ${w} ${h}`);

  const markers = Array.from(timelineEl.querySelectorAll('.dot-flower')).map(el => {
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top };
  });
  if (markers.length < 2) return;

  // Smooth curve: between each pair of points, control points sit at the
  // midpoint height, which naturally produces a gentle S between columns.
  let d = `M ${markers[0].x} ${markers[0].y}`;
  for (let i = 1; i < markers.length; i++){
    const p0 = markers[i - 1];
    const p1 = markers[i];
    const midY = (p0.y + p1.y) / 2;
    d += ` C ${p0.x} ${midY}, ${p1.x} ${midY}, ${p1.x} ${p1.y}`;
  }
  timelinePath.setAttribute('d', d);
  pathLength = timelinePath.getTotalLength();
  timelinePath.style.strokeDasharray = pathLength;
  updateTimelineProgress();
}

function updateTimelineProgress(){
  if (!timelineEl || !pathLength) return;
  const rect = timelineEl.getBoundingClientRect();
  const vh = window.innerHeight;
  // Starts drawing as the block enters the lower part of the screen,
  // and finishes after roughly 65% of its own height has scrolled by —
  // so it completes comfortably instead of needing to scroll all the
  // way past the section.
  const triggerLine = vh * 0.88;
  let progress = (triggerLine - rect.top) / (rect.height * 0.65);
  progress = Math.max(0, Math.min(1, progress));
  timelinePath.style.strokeDashoffset = pathLength * (1 - progress);
}

let timelineTicking = false;
function onTimelineScroll(){
  if (timelineTicking) return;
  timelineTicking = true;
  requestAnimationFrame(() => {
    updateTimelineProgress();
    timelineTicking = false;
  });
}

if (timelineEl && timelinePath){
  window.addEventListener('load', buildTimelinePath);
  window.addEventListener('resize', buildTimelinePath);
  window.addEventListener('scroll', onTimelineScroll, { passive: true });
  // In case fonts/images shift layout slightly after load
  setTimeout(buildTimelinePath, 400);
}

// ── COUNTDOWN SETTINGS ──
// Change the date/time below to the real wedding date and time.
// Format: new Date(YEAR, MONTH_INDEX, DAY, HOUR, MINUTE)
// Note: MONTH_INDEX is 0-based, so October = 9, not 10.
const WEDDING_DATE = new Date(2026, 9, 31, 16, 0);

function updateCountdown(){
  const now = new Date();
  let diff = WEDDING_DATE - now;
  if (diff < 0) diff = 0;

  const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins  = Math.floor((diff / (1000 * 60)) % 60);
  const secs  = Math.floor((diff / 1000) % 60);

  const pad = n => String(n).padStart(2, '0');
  document.getElementById('cd-days').textContent  = pad(days);
  document.getElementById('cd-hours').textContent = pad(hours);
  document.getElementById('cd-mins').textContent  = pad(mins);
  document.getElementById('cd-secs').textContent  = pad(secs);
}

updateCountdown();
setInterval(updateCountdown, 1000);
