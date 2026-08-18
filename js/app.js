/**
 * MASTER APPLICATION CONTROLLER: BIRTHDAY 09/09/2002
 * Vector SVG clean interface • Full Vietnamese character support
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Sub-Engines
  if (window.particleEngine) window.particleEngine.init();
  if (window.cardGenerator) window.cardGenerator.init();

  // 1. Envelope Gate Opening
  initEnvelopeGate();

  // 2. Real-time Live Age Counter (from 09/09/2002)
  initLiveAgeCounter();

  // 3. Virgo Constellation Canvas
  initConstellationCanvas();

  // 4. Draggable Collage Photo (tactile paper interaction)
  initDraggablePhotos();

  // 5. Music Player
  initVinylPlayer();

  // 6. Secret Lockbox (Code: 0909)
  initSecretLockbox();

  // 7. Floating Heart Burst & Audio Widget
  initFloatingAudioAndHeart();

  // 8. Handwritten Letter Typewriter Reveal
  initLetterTypewriter();

  // 9. Sticky Fold Note (tap-to-unfold paper interaction)
  initStickyFold();

  // 10. Scrapbook Tactile Micro-Interactions (Stamps, Paper clips, Tabs)
  initScrapbookTactileInteractions();

  // 11. Secret Pull-Tab Note
  initSecretPullTab();
});

/* --------------------------------------------------------------------------
   1. ENVELOPE GATE LOGIC
   -------------------------------------------------------------------------- */
function initEnvelopeGate() {
  const envelopeOverlay = document.getElementById('envelopeOverlay');
  const waxSeal = document.getElementById('waxSeal');
  const envelopeCard = document.getElementById('envelopeCard');

  const openLetter = () => {
    if (!envelopeOverlay || envelopeOverlay.classList.contains('opened')) return;

    // Đảm bảo không bị nhảy trang xuống dưới
    window.scrollTo({ top: 0, behavior: 'instant' });

    if (window.birthdayAudio) {
      window.birthdayAudio.playSealOpen();
      window.birthdayAudio.startBGM();
    }

    envelopeOverlay.classList.add('opened');

    setTimeout(() => {
      if (window.particleEngine) {
        window.particleEngine.triggerCelebrationBurst(150);
      }
    }, 600);

    const soundBars = document.querySelector('.sound-bars');
    if (soundBars) soundBars.classList.add('playing');
  };

  if (waxSeal) waxSeal.addEventListener('click', openLetter);
  if (envelopeCard) envelopeCard.addEventListener('click', openLetter);
}

/* --------------------------------------------------------------------------
   2. REAL-TIME LIVE AGE COUNTER
   -------------------------------------------------------------------------- */
function initLiveAgeCounter() {
  const birthDate = new Date('2002-09-09T00:00:00');

  const daysEl = document.getElementById('cntDays');
  const hoursEl = document.getElementById('cntHours');
  const minsEl = document.getElementById('cntMins');
  const secsEl = document.getElementById('cntSecs');
  const totalSecondsEl = document.getElementById('cntTotalSeconds');
  const yearsEl = document.getElementById('cntYearsExact');

  function updateCounter() {
    const now = new Date();
    const diffMs = now - birthDate;

    if (diffMs < 0) return;

    const totalSecs = Math.floor(diffMs / 1000);
    const totalMins = Math.floor(totalSecs / 60);
    const totalHours = Math.floor(totalMins / 60);
    const totalDays = Math.floor(totalHours / 24);

    const curHours = totalHours % 24;
    const curMins = totalMins % 60;
    const curSecs = totalSecs % 60;

    const exactYears = (diffMs / (1000 * 60 * 60 * 24 * 365.25)).toFixed(2);

    if (daysEl) daysEl.textContent = totalDays.toLocaleString();
    if (hoursEl) hoursEl.textContent = curHours.toString().padStart(2, '0');
    if (minsEl) minsEl.textContent = curMins.toString().padStart(2, '0');
    if (secsEl) secsEl.textContent = curSecs.toString().padStart(2, '0');
    if (totalSecondsEl) totalSecondsEl.textContent = totalSecs.toLocaleString();
    if (yearsEl) yearsEl.textContent = exactYears;
  }

  updateCounter();
  setInterval(updateCounter, 1000);
}

/* --------------------------------------------------------------------------
   3. VIRGO CONSTELLATION CANVAS
   -------------------------------------------------------------------------- */
function initConstellationCanvas() {
  const canvas = document.getElementById('constellationCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Background ambient micro-stars
  const bgStars = [];
  for (let i = 0; i < 45; i++) {
    bgStars.push({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.4 + 0.4,
      alpha: Math.random() * 0.7 + 0.2,
      speed: Math.random() * 0.02 + 0.005,
      dir: Math.random() > 0.5 ? 1 : -1
    });
  }

  // Accurate & Centered Virgo Constellation Coordinates
  const starsNorm = [
    { x: 0.16, y: 0.38, r: 4.5, name: 'Zavijava', subtitle: 'Beta Virginis', trait: 'Trí tuệ & Nhạy bén' },
    { x: 0.30, y: 0.30, r: 5.0, name: 'Zaniah', subtitle: 'Eta Virginis', trait: 'Dịu dàng & Đáng yêu' },
    { x: 0.48, y: 0.24, r: 6.0, name: 'Porrima', subtitle: 'Gamma Virginis', trait: 'Song tinh hòa hợp' },
    { x: 0.66, y: 0.26, r: 5.0, name: 'Auva', subtitle: 'Delta Virginis', trait: 'Tấm lòng nhân hậu' },
    { x: 0.82, y: 0.33, r: 5.5, name: 'Vindemiatrix', subtitle: 'Epsilon Virginis', trait: 'Ngôi sao bội thu' },
    { x: 0.60, y: 0.50, r: 5.5, name: 'Heze', subtitle: 'Zeta Virginis', trait: 'Kiên định & Nỗ lực' },
    { x: 0.44, y: 0.68, r: 8.5, name: 'Spica', subtitle: 'Alpha Virginis • Sao Chủ', trait: 'Tài năng, May mắn & Rực rỡ nhất', isSpica: true },
    { x: 0.26, y: 0.80, r: 4.5, name: 'Syrma', subtitle: 'Iota Virginis', trait: 'Chân thành & Ấm áp' },
    { x: 0.54, y: 0.84, r: 5.0, name: 'Rijl al Awwa', subtitle: 'Mu Virginis', trait: 'Lạc quan & Tươi sáng' },
    { x: 0.36, y: 0.88, r: 4.0, name: 'Kang', subtitle: 'Kappa Virginis', trait: 'Vững vàng tiến bước' }
  ];

  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4],
    [2, 5], [5, 6], [6, 7], [6, 8], [7, 9]
  ];

  let hoveredStar = null;
  let pulseTime = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const w = canvas.width;
    const h = canvas.height;
    pulseTime += 0.03;

    // 1. Celestial Deep Galaxy Gradient
    const bgGrad = ctx.createRadialGradient(w * 0.48, h * 0.5, 30, w * 0.5, h * 0.5, Math.max(w, h) * 0.7);
    bgGrad.addColorStop(0, '#36153d');
    bgGrad.addColorStop(0.45, '#220e28');
    bgGrad.addColorStop(1, '#0e0512');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // 2. Soft Nebula Dust Glows
    const neb1 = ctx.createRadialGradient(w * 0.44, h * 0.68, 5, w * 0.44, h * 0.68, 140);
    neb1.addColorStop(0, 'rgba(225, 29, 72, 0.28)');
    neb1.addColorStop(0.5, 'rgba(255, 107, 139, 0.1)');
    neb1.addColorStop(1, 'transparent');
    ctx.fillStyle = neb1;
    ctx.fillRect(0, 0, w, h);

    const neb2 = ctx.createRadialGradient(w * 0.5, h * 0.28, 5, w * 0.5, h * 0.28, 120);
    neb2.addColorStop(0, 'rgba(147, 51, 234, 0.2)');
    neb2.addColorStop(1, 'transparent');
    ctx.fillStyle = neb2;
    ctx.fillRect(0, 0, w, h);

    // 3. Twinkling Ambient Micro-Stars
    bgStars.forEach(s => {
      s.alpha += s.speed * s.dir;
      if (s.alpha > 0.85) { s.alpha = 0.85; s.dir = -1; }
      if (s.alpha < 0.2) { s.alpha = 0.2; s.dir = 1; }

      ctx.beginPath();
      ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 220, 235, ${s.alpha})`;
      ctx.shadowBlur = 4;
      ctx.shadowColor = '#ffb6c1';
      ctx.fill();
    });
    ctx.shadowBlur = 0;

    // 4. Ethereal Constellation Lines (Double Layer: Glow + Core)
    connections.forEach(([i, j]) => {
      const s1 = starsNorm[i];
      const s2 = starsNorm[j];
      const x1 = s1.x * w, y1 = s1.y * h;
      const x2 = s2.x * w, y2 = s2.y * h;

      // Outer soft glow line
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = 'rgba(255, 107, 139, 0.25)';
      ctx.lineWidth = 3.5;
      ctx.stroke();

      // Inner crisp starlight beam with dashed rhythm
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      const lineGrad = ctx.createLinearGradient(x1, y1, x2, y2);
      lineGrad.addColorStop(0, 'rgba(255, 182, 193, 0.7)');
      lineGrad.addColorStop(0.5, 'rgba(254, 205, 211, 0.9)');
      lineGrad.addColorStop(1, 'rgba(255, 182, 193, 0.7)');
      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = 1.6;
      ctx.setLineDash([6, 5]);
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // 5. Render Celestial Stars
    starsNorm.forEach((s, idx) => {
      const sx = s.x * w;
      const sy = s.y * h;
      const isHovered = hoveredStar === idx;
      const pulse = Math.sin(pulseTime * 2 + idx) * 0.15 + 1;
      const starRadius = (isHovered ? s.r * 1.5 : s.r) * (s.isSpica ? pulse : 1);

      if (s.isSpica) {
        // --- SPICA ALPHA STAR (Brilliant Golden-Diamond Star) ---
        // Wide golden halo
        const haloGrad = ctx.createRadialGradient(sx, sy, 2, sx, sy, 32 * pulse);
        haloGrad.addColorStop(0, 'rgba(251, 191, 36, 0.55)');
        haloGrad.addColorStop(0.4, 'rgba(225, 29, 72, 0.25)');
        haloGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(sx, sy, 32 * pulse, 0, Math.PI * 2);
        ctx.fill();

        // Pulsing energy orbit ring
        ctx.beginPath();
        ctx.arc(sx, sy, 16 * pulse, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.5)';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.setLineDash([]);

        // 4-Point Rotating Diamond Flare Cross
        drawDiamondFlare(ctx, sx, sy, 22 * pulse, 3.5, pulseTime * 0.4, '#fbbf24', '#ffffff');
        drawDiamondFlare(ctx, sx, sy, 14 * pulse, 2.5, -pulseTime * 0.4 + Math.PI / 4, '#ff6b8b', '#ffffff');

        // Bright diamond core
        ctx.beginPath();
        ctx.arc(sx, sy, starRadius * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 16;
        ctx.shadowColor = '#fbbf24';
        ctx.fill();
        ctx.shadowBlur = 0;

        // Permanent Elegant Badge for Spica
        if (!hoveredStar) {
          ctx.save();
          const badgeText = '✦ Spica (Sao Chủ)';
          ctx.font = 'bold 12px "Baloo 2", "Be Vietnam Pro", sans-serif';
          const textW = ctx.measureText(badgeText).width;
          
          // Badge background pill
          ctx.fillStyle = 'rgba(30, 10, 35, 0.75)';
          ctx.strokeStyle = 'rgba(251, 191, 36, 0.7)';
          ctx.lineWidth = 1;
          roundRect(ctx, sx - textW / 2 - 8, sy - 28, textW + 16, 20, 10);
          ctx.fill();
          ctx.stroke();

          // Badge text
          ctx.fillStyle = '#fbbf24';
          ctx.textAlign = 'center';
          ctx.fillText(badgeText, sx, sy - 14);
          ctx.restore();
        }

      } else {
        // --- OTHER VIRGO STARS ---
        // Outer soft glow
        const glowGrad = ctx.createRadialGradient(sx, sy, 1, sx, sy, isHovered ? 20 : 12);
        glowGrad.addColorStop(0, isHovered ? 'rgba(255, 107, 139, 0.8)' : 'rgba(255, 182, 193, 0.4)');
        glowGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(sx, sy, isHovered ? 20 : 12, 0, Math.PI * 2);
        ctx.fill();

        // 4-point delicate sparkle flare
        drawDiamondFlare(ctx, sx, sy, isHovered ? 14 : 9, 2, pulseTime * 0.3 + idx, '#ff8da1', '#ffffff');

        // Star core
        ctx.beginPath();
        ctx.arc(sx, sy, starRadius * 0.7, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? '#ffffff' : '#ffd1dc';
        ctx.shadowBlur = isHovered ? 12 : 6;
        ctx.shadowColor = '#ff6b8b';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });

    // 6. Interactive Cosmic Glassmorphism Tooltip on Hover / Touch
    if (hoveredStar !== null) {
      const s = starsNorm[hoveredStar];
      const sx = s.x * w;
      const sy = s.y * h;

      ctx.save();
      ctx.font = 'bold 12px "Be Vietnam Pro", sans-serif';
      const title = `★ ${s.name} (${s.subtitle})`;
      const desc = s.trait;
      const titleW = ctx.measureText(title).width;
      ctx.font = '11px "Be Vietnam Pro", sans-serif';
      const descW = ctx.measureText(desc).width;
      const cardW = Math.max(titleW, descW) + 24;
      const cardH = 46;

      let cardX = sx - cardW / 2;
      let cardY = sy - cardH - 16;
      if (cardX < 10) cardX = 10;
      if (cardX + cardW > w - 10) cardX = w - cardW - 10;
      if (cardY < 10) cardY = sy + 18;

      // Tooltip Glass Card Background
      ctx.fillStyle = 'rgba(24, 8, 30, 0.9)';
      ctx.strokeStyle = s.isSpica ? 'rgba(251, 191, 36, 0.8)' : 'rgba(255, 141, 161, 0.65)';
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 16;
      ctx.shadowColor = s.isSpica ? 'rgba(251, 191, 36, 0.4)' : 'rgba(225, 29, 72, 0.3)';
      roundRect(ctx, cardX, cardY, cardW, cardH, 10);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Text inside tooltip
      ctx.textAlign = 'center';
      ctx.font = 'bold 11.5px "Baloo 2", "Be Vietnam Pro", sans-serif';
      ctx.fillStyle = s.isSpica ? '#fbbf24' : '#ffccd5';
      ctx.fillText(title, cardX + cardW / 2, cardY + 18);

      ctx.font = '600 10.5px "Be Vietnam Pro", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(desc, cardX + cardW / 2, cardY + 34);
      ctx.restore();
    }

    requestAnimationFrame(draw);
  }

  // Helper: Draw 4-point Diamond Flare Spikes
  function drawDiamondFlare(ctx, cx, cy, len, width, angle, outerColor, coreColor) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    for (let i = 0; i < 4; i++) {
      ctx.rotate(Math.PI / 2);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-width, len * 0.25);
      ctx.lineTo(0, len);
      ctx.lineTo(width, len * 0.25);
      ctx.closePath();
      ctx.fillStyle = outerColor;
      ctx.fill();
    }

    ctx.restore();
  }

  // Helper: Rounded Rectangle
  function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  draw();

  // Mouse & Touch Interactivity
  function handlePointer(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const mx = clientX - rect.left;
    const my = clientY - rect.top;
    const w = canvas.width;
    const h = canvas.height;

    let found = null;
    starsNorm.forEach((s, idx) => {
      const sx = s.x * w;
      const sy = s.y * h;
      const dist = Math.hypot(mx - sx, my - sy);
      if (dist < 26) {
        found = idx;
      }
    });

    hoveredStar = found;
  }

  canvas.addEventListener('mousemove', (e) => handlePointer(e.clientX, e.clientY));
  canvas.addEventListener('mouseleave', () => { hoveredStar = null; });

  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
      handlePointer(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  canvas.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      handlePointer(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  canvas.addEventListener('touchend', () => {
    setTimeout(() => { hoveredStar = null; }, 1800);
  });
}

/* --------------------------------------------------------------------------
   4. DRAGGABLE COLLAGE PHOTO
   A pinned-photo tactile interaction: nudge it, it springs back into place.
   touch-action is scoped only to the draggable element so page scroll is
   never blocked.
   -------------------------------------------------------------------------- */
function initDraggablePhotos() {
  const items = document.querySelectorAll('.collage-photo[data-drag="true"]');

  items.forEach(el => {
    const baseRotation = readRotationDeg(el);
    let originX = 0;
    let originY = 0;
    let offsetX = 0;
    let offsetY = 0;
    let dragging = false;

    const applyTransform = () => {
      el.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${baseRotation}deg)`;
    };

    const startDrag = (e) => {
      dragging = true;
      originX = e.clientX - offsetX;
      originY = e.clientY - offsetY;
      el.style.transition = 'none';
      el.style.zIndex = 30;
      if (el.setPointerCapture) {
        try { el.setPointerCapture(e.pointerId); } catch (err) { /* noop */ }
      }
    };

    const moveDrag = (e) => {
      if (!dragging) return;
      offsetX = e.clientX - originX;
      offsetY = e.clientY - originY;
      // Gentle bounds so the photo can't be dragged off-canvas
      offsetX = Math.max(-70, Math.min(70, offsetX));
      offsetY = Math.max(-70, Math.min(70, offsetY));
      applyTransform();
    };

    const endDrag = () => {
      if (!dragging) return;
      dragging = false;
      el.style.transition = 'transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)';
      offsetX = 0;
      offsetY = 0;
      applyTransform();
      el.style.zIndex = '';
    };

    el.addEventListener('pointerdown', startDrag);
    el.addEventListener('pointermove', moveDrag);
    el.addEventListener('pointerup', endDrag);
    el.addEventListener('pointercancel', endDrag);
    el.addEventListener('pointerleave', () => { if (dragging) endDrag(); });
  });
}

function readRotationDeg(el) {
  const transform = window.getComputedStyle(el).transform;
  if (!transform || transform === 'none') return 0;
  const match = transform.match(/matrix\(([^)]+)\)/);
  if (!match) return 0;
  const parts = match[1].split(',').map(parseFloat);
  const a = parts[0];
  const b = parts[1];
  return Math.round(Math.atan2(b, a) * (180 / Math.PI) * 100) / 100;
}

/* --------------------------------------------------------------------------
   5. MUSIC PLAYER
   -------------------------------------------------------------------------- */
function initVinylPlayer() {
  const vinylDisc = document.getElementById('vinylDisc');
  const playBtn = document.getElementById('vinylPlayToggle');

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (window.birthdayAudio) {
        const isPlaying = window.birthdayAudio.toggleBGM();
        if (isPlaying) {
          playBtn.textContent = 'Tạm dừng';
          if (vinylDisc) vinylDisc.classList.add('spinning');
        } else {
          playBtn.textContent = 'Tiếp tục phát';
          if (vinylDisc) vinylDisc.classList.remove('spinning');
        }
      }
    });
  }
}

/* --------------------------------------------------------------------------
   6. SECRET LOCKBOX QUIZ (Code: 0909)
   -------------------------------------------------------------------------- */
function initSecretLockbox() {
  const pinDigits = document.querySelectorAll('.pin-digit');
  const unlockBtn = document.getElementById('unlockBoxBtn');
  const unlockedGift = document.getElementById('unlockedGift');
  const pinDisplay = document.getElementById('pinDisplay');
  const lockboxHint = document.getElementById('lockboxHint');
  const defaultHintText = lockboxHint ? lockboxHint.textContent : '';

  pinDigits.forEach((input, index) => {
    input.addEventListener('input', () => {
      if (input.value.length >= 1) {
        input.value = input.value[0];
        if (index < pinDigits.length - 1) {
          pinDigits[index + 1].focus();
        }
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !input.value && index > 0) {
        pinDigits[index - 1].focus();
      }
    });
  });

  if (unlockBtn) {
    unlockBtn.addEventListener('click', () => {
      let code = '';
      pinDigits.forEach(d => code += d.value.trim());

      if (code === '0909' || code === '2002') {
        if (unlockedGift) unlockedGift.classList.add('show');
        if (window.birthdayAudio) window.birthdayAudio.playUnlockSuccess();
        if (window.particleEngine) window.particleEngine.triggerCelebrationBurst(120);

        unlockBtn.textContent = 'Đã Mở Khóa Thành Công!';
        unlockBtn.disabled = true;
      } else {
        if (pinDisplay) {
          pinDisplay.classList.remove('shake');
          void pinDisplay.offsetWidth; // restart animation nếu bấm liên tiếp
          pinDisplay.classList.add('shake');
          setTimeout(() => pinDisplay.classList.remove('shake'), 500);
        }
        if (lockboxHint) {
          lockboxHint.textContent = 'Ui, chưa đúng rồi! Thử lại với 4 số ngày sinh của Hai nhé (0909) 💗';
          lockboxHint.classList.add('error');
          setTimeout(() => {
            lockboxHint.textContent = defaultHintText;
            lockboxHint.classList.remove('error');
          }, 2200);
        }
        pinDigits.forEach(d => d.value = '');
        pinDigits[0].focus();
      }
    });
  }
}

/* --------------------------------------------------------------------------
   7. FLOATING AUDIO CONTROL
   -------------------------------------------------------------------------- */
function initFloatingAudioAndHeart() {
  const audioToggle = document.getElementById('floatingAudioControl');
  const soundBars = document.querySelector('.sound-bars');

  if (audioToggle) {
    audioToggle.addEventListener('click', () => {
      if (window.birthdayAudio) {
        const isPlaying = window.birthdayAudio.toggleBGM();
        if (isPlaying) {
          if (soundBars) soundBars.classList.add('playing');
        } else {
          if (soundBars) soundBars.classList.remove('playing');
        }
      }
    });
  }
}

/* --------------------------------------------------------------------------
   8. HANDWRITTEN LETTER — TYPEWRITER REVEAL
   Captures the letter's real text, clears it, then types it back out
   (a few characters per tick with a blinking caret) once the letter
   scrolls into view.
   -------------------------------------------------------------------------- */
function initLetterTypewriter() {
  const el = document.getElementById('typedLetterContent');
  if (!el) return;

  const fullText = el.textContent.trim();
  el.textContent = '';

  let started = false;
  let i = 0;
  const CHARS_PER_TICK = 2;
  const TICK_MS = 16;

  function typeStep() {
    i += CHARS_PER_TICK;
    if (i < fullText.length) {
      el.textContent = fullText.slice(0, i);
      const cursor = document.createElement('span');
      cursor.className = 'type-cursor';
      cursor.textContent = ' ';
      el.appendChild(cursor);
      setTimeout(typeStep, TICK_MS);
    } else {
      el.textContent = fullText;
    }
  }

  function startTyping() {
    if (started) return;
    started = true;
    typeStep();
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startTyping();
          observer.disconnect();
        }
      });
    }, { threshold: 0.25 });
    observer.observe(el);
  } else {
    startTyping();
  }
}

/* --------------------------------------------------------------------------
   9. STICKY FOLD NOTE — tap to unfold
   -------------------------------------------------------------------------- */
function initStickyFold() {
  const fold = document.getElementById('funFactFold');
  if (!fold) return;

  const toggle = () => {
    const isOpen = fold.classList.toggle('unfolded');
    fold.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (window.birthdayAudio) {
      window.birthdayAudio.playPaperRustle();
    }
  };

  fold.addEventListener('click', toggle);
  fold.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  });
}

/* --------------------------------------------------------------------------
   10. SCRAPBOOK TACTILE MICRO-INTERACTIONS
   -------------------------------------------------------------------------- */
function initScrapbookTactileInteractions() {
  // Diary Tabs paper sound
  const diaryTabs = document.querySelectorAll('.diary-tab');
  diaryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      if (window.birthdayAudio) {
        window.birthdayAudio.playPaperRustle();
      }
    });
  });

  // Postal Stamps interactive thud & mini celebration
  const postalStamps = document.querySelectorAll('.postal-stamp');
  postalStamps.forEach(stamp => {
    stamp.addEventListener('click', () => {
      if (window.birthdayAudio) {
        window.birthdayAudio.playStampThud();
      }
      stamp.style.transform = 'rotate(-4deg) scale(1.15)';
      setTimeout(() => {
        stamp.style.transform = '';
      }, 300);
      if (window.particleEngine) {
        window.particleEngine.triggerCelebrationBurst(25);
      }
    });
  });

  // Paper clips metallic click
  const paperClips = document.querySelectorAll('.paper-clip');
  paperClips.forEach(clip => {
    clip.style.pointerEvents = 'auto';
    clip.style.cursor = 'pointer';
    clip.title = 'Kẹp giấy kim loại vintage';
    clip.addEventListener('click', (e) => {
      e.stopPropagation();
      if (window.birthdayAudio) {
        window.birthdayAudio.playPaperClipClick();
      }
    });
  });
}

/* --------------------------------------------------------------------------
   11. REAL PHYSICAL DRAGGABLE PULL-TAB INTERACTION
   Supports true touch & mouse drag-down gesture with real-time paper reveal
   -------------------------------------------------------------------------- */
function initSecretPullTab() {
  const pullWrapper = document.getElementById('secretPullTab');
  const handle = document.getElementById('pullTabHandle');
  const handleText = document.getElementById('pullHandleText');
  const contentBox = pullWrapper ? pullWrapper.querySelector('.pull-tab-content-box') : null;
  if (!pullWrapper || !handle || !contentBox) return;

  let isDragging = false;
  let startY = 0;
  let currentY = 0;
  let dragDistance = 0;
  let isOpen = false;
  const DRAG_THRESHOLD = 40; // pixels to trigger open
  const MAX_EXPAND_HEIGHT = 190;

  const setOpenState = (open) => {
    isOpen = open;
    pullWrapper.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

    // Reset inline styles so CSS transitions handle smooth closing/opening
    contentBox.style.maxHeight = '';
    contentBox.style.opacity = '';
    contentBox.style.transition = '';

    if (isOpen) {
      pullWrapper.classList.add('pulled');
      if (handleText) handleText.textContent = '↟ ĐẨY LÊN ĐỂ ĐÓNG ↟';
      if (window.birthdayAudio) window.birthdayAudio.playPaperRustle();
      if (window.particleEngine) window.particleEngine.triggerCelebrationBurst(35);
    } else {
      pullWrapper.classList.remove('pulled');
      if (handleText) handleText.textContent = '✥ NẮM & KÉO XUỐNG ↡';
      if (window.birthdayAudio) window.birthdayAudio.playPaperRustle();
    }
  };

  const onPointerDown = (e) => {
    isDragging = true;
    startY = e.clientY;
    currentY = e.clientY;
    dragDistance = 0;
    handle.classList.add('dragging');
    contentBox.style.transition = 'none';

    if (handle.setPointerCapture) {
      try { handle.setPointerCapture(e.pointerId); } catch (err) { /* noop */ }
    }
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    currentY = e.clientY;
    const dy = currentY - startY;
    dragDistance = Math.abs(dy);

    if (!isOpen) {
      // Dragging downwards to pull out the secret letter
      if (dy > 0) {
        const height = Math.min(MAX_EXPAND_HEIGHT, dy * 1.25);
        contentBox.style.maxHeight = `${height}px`;
        contentBox.style.opacity = `${Math.min(1, height / 45)}`;
      }
    } else {
      // Dragging upwards to push back
      if (dy < 0) {
        const remaining = Math.max(0, MAX_EXPAND_HEIGHT + dy * 1.25);
        contentBox.style.maxHeight = `${remaining}px`;
        contentBox.style.opacity = `${Math.max(0, remaining / MAX_EXPAND_HEIGHT)}`;
      }
    }
  };

  const onPointerUp = (e) => {
    if (!isDragging) return;
    isDragging = false;
    handle.classList.remove('dragging');
    const dy = currentY - startY;

    if (dragDistance < 8) {
      // Quick tap / click toggle
      setOpenState(!isOpen);
    } else {
      // Gesture drag release evaluation
      if (!isOpen) {
        if (dy >= DRAG_THRESHOLD) {
          setOpenState(true);
        } else {
          setOpenState(false);
        }
      } else {
        if (dy <= -DRAG_THRESHOLD) {
          setOpenState(false);
        } else {
          setOpenState(true);
        }
      }
    }
  };

  handle.addEventListener('pointerdown', onPointerDown);
  handle.addEventListener('pointermove', onPointerMove);
  handle.addEventListener('pointerup', onPointerUp);
  handle.addEventListener('pointercancel', onPointerUp);

  // Keyboard accessibility
  handle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpenState(!isOpen);
    }
  });
}
