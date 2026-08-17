/**
 * PARTICLE & FALLING HEARTS / FLOWERS ENGINE (09/09/2002)
 * 100% Pure Vector Canvas Paths • ZERO Structural Emojis
 * Romantic falling sakura petals, 5-petal flowers, and gentle pastel hearts
 */

class ParticleEngine {
  constructor() {
    this.starCanvas = null;
    this.starCtx = null;
    this.stars = [];

    this.fallingCanvas = null;
    this.fallingCtx = null;
    this.fallingItems = [];

    this.effectCanvas = null;
    this.effectCtx = null;
    this.particles = [];

    this.colors = ['#ff2a5f', '#ff7597', '#ffb6c1', '#ffccd5', '#ffb703', '#ffffff', '#fecdd3', '#fb7185'];
  }

  init() {
    // 1. Star Dust Canvas (Ambient background)
    this.starCanvas = document.getElementById('starCanvas');
    if (this.starCanvas) {
      this.starCtx = this.starCanvas.getContext('2d');
      this.resizeStarCanvas();
      this.createStars();
      this.animateStars();
      window.addEventListener('resize', () => this.resizeStarCanvas());
    }

    // 2. Fullscreen Falling Hearts & Flowers Canvas (Continuous romantic rain)
    this.fallingCanvas = document.createElement('canvas');
    this.fallingCanvas.id = 'fallingCanvas';
    this.fallingCanvas.style.position = 'fixed';
    this.fallingCanvas.style.inset = '0';
    this.fallingCanvas.style.width = '100%';
    this.fallingCanvas.style.height = '100%';
    this.fallingCanvas.style.pointerEvents = 'none';
    this.fallingCanvas.style.zIndex = '3';
    document.body.appendChild(this.fallingCanvas);
    this.fallingCtx = this.fallingCanvas.getContext('2d');
    this.resizeFallingCanvas();
    this.createFallingItems();
    this.animateFalling();
    window.addEventListener('resize', () => {
      this.resizeFallingCanvas();
      this.createFallingItems();
    });

    // 3. Fullscreen Burst Effects Canvas (Celebrations & Fireworks)
    this.effectCanvas = document.createElement('canvas');
    this.effectCanvas.id = 'effectsCanvas';
    this.effectCanvas.style.position = 'fixed';
    this.effectCanvas.style.inset = '0';
    this.effectCanvas.style.width = '100%';
    this.effectCanvas.style.height = '100%';
    this.effectCanvas.style.pointerEvents = 'none';
    this.effectCanvas.style.zIndex = '999';
    document.body.appendChild(this.effectCanvas);
    this.effectCtx = this.effectCanvas.getContext('2d');
    this.resizeEffectCanvas();
    window.addEventListener('resize', () => this.resizeEffectCanvas());

    this.animateEffects();
  }

  resizeStarCanvas() {
    if (!this.starCanvas) return;
    this.starCanvas.width = window.innerWidth;
    this.starCanvas.height = window.innerHeight;
  }

  resizeFallingCanvas() {
    if (!this.fallingCanvas) return;
    this.fallingCanvas.width = window.innerWidth;
    this.fallingCanvas.height = window.innerHeight;
  }

  resizeEffectCanvas() {
    if (!this.effectCanvas) return;
    this.effectCanvas.width = window.innerWidth;
    this.effectCanvas.height = window.innerHeight;
  }

  // --- Background Soft Sparkles ---
  createStars() {
    this.stars = [];
    const count = Math.floor((window.innerWidth * window.innerHeight) / 12000);
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random() * this.starCanvas.width,
        y: Math.random() * this.starCanvas.height,
        radius: Math.random() * 1.6 + 0.5,
        alpha: Math.random() * 0.7 + 0.3,
        speed: Math.random() * 0.02 + 0.006,
        twinkleDir: Math.random() > 0.5 ? 1 : -1,
        isPink: Math.random() > 0.4
      });
    }
  }

  animateStars() {
    if (!this.starCtx) return;
    this.starCtx.clearRect(0, 0, this.starCanvas.width, this.starCanvas.height);

    for (let s of this.stars) {
      s.alpha += s.speed * s.twinkleDir;
      if (s.alpha > 0.95) { s.alpha = 0.95; s.twinkleDir = -1; }
      if (s.alpha < 0.25) { s.alpha = 0.25; s.twinkleDir = 1; }

      this.starCtx.beginPath();
      this.starCtx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      this.starCtx.fillStyle = s.isPink ? `rgba(255, 117, 151, ${s.alpha})` : `rgba(255, 183, 3, ${s.alpha})`;
      this.starCtx.shadowBlur = 5;
      this.starCtx.shadowColor = s.isPink ? '#ff7597' : '#ffb703';
      this.starCtx.fill();
    }

    requestAnimationFrame(() => this.animateStars());
  }

  // =========================================================================
  // CONTINUOUS FALLING HEARTS & FLOWERS (Zero Emojis • Vector Paths)
  // =========================================================================
  createFallingItems() {
    this.fallingItems = [];
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 22 : 36;

    const types = ['heart', 'petal', 'flower'];
    const heartColors = ['#ff4d79', '#ff7597', '#ff8da1', '#e11d48', '#fecdd3'];
    const petalColors = ['#ffa4ba', '#ffb6c1', '#ffd1dc', '#ffe4e9', '#f472b6'];

    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      this.fallingItems.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: type === 'flower' ? Math.random() * 8 + 12 : (type === 'heart' ? Math.random() * 7 + 10 : Math.random() * 6 + 9),
        speedY: Math.random() * 0.9 + 0.6,
        swayAngle: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.012,
        swayWidth: Math.random() * 1.5 + 0.8,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        opacity: Math.random() * 0.45 + 0.45,
        color: type === 'heart' 
          ? heartColors[Math.floor(Math.random() * heartColors.length)] 
          : petalColors[Math.floor(Math.random() * petalColors.length)],
        centerColor: '#fbbf24',
        type: type
      });
    }
  }

  animateFalling() {
    if (!this.fallingCtx) return;
    this.fallingCtx.clearRect(0, 0, this.fallingCanvas.width, this.fallingCanvas.height);

    for (let item of this.fallingItems) {
      item.y += item.speedY;
      item.swayAngle += item.swaySpeed;
      item.x += Math.sin(item.swayAngle) * item.swayWidth;
      item.rotation += item.rotSpeed;

      // Wrap around seamlessly
      if (item.y > this.fallingCanvas.height + 25) {
        item.y = -25;
        item.x = Math.random() * this.fallingCanvas.width;
      }
      if (item.x < -30) item.x = this.fallingCanvas.width + 20;
      if (item.x > this.fallingCanvas.width + 30) item.x = -20;

      this.fallingCtx.save();
      this.fallingCtx.translate(item.x, item.y);
      this.fallingCtx.rotate(item.rotation);
      this.fallingCtx.globalAlpha = item.opacity;

      if (item.type === 'heart') {
        this.drawVectorHeart(this.fallingCtx, 0, 0, item.size, item.color);
      } else if (item.type === 'flower') {
        this.drawVectorFlower(this.fallingCtx, 0, 0, item.size, item.color, item.centerColor);
      } else {
        this.drawVectorPetal(this.fallingCtx, 0, 0, item.size, item.color);
      }

      this.fallingCtx.restore();
    }

    requestAnimationFrame(() => this.animateFalling());
  }

  // --- Pure Vector Drawings (Zero Emojis) ---

  // 1. Vector Heart
  drawVectorHeart(ctx, x, y, size, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    const d = size;
    ctx.moveTo(x, y + d * 0.3);
    ctx.bezierCurveTo(x, y, x - d * 0.5, y, x - d * 0.5, y + d * 0.35);
    ctx.bezierCurveTo(x - d * 0.5, y + d * 0.7, x, y + d * 0.95, x, y + d);
    ctx.bezierCurveTo(x, y + d * 0.95, x + d * 0.5, y + d * 0.7, x + d * 0.5, y + d * 0.35);
    ctx.bezierCurveTo(x + d * 0.5, y, x, y, x, y + d * 0.3);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // 2. Vector Sakura Petal
  drawVectorPetal(ctx, x, y, size, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y - size);
    ctx.bezierCurveTo(x + size * 0.7, y - size * 0.6, x + size * 0.7, y + size * 0.6, x, y + size);
    ctx.bezierCurveTo(x - size * 0.7, y + size * 0.6, x - size * 0.7, y - size * 0.6, x, y - size);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // 3. Vector 5-Petal Flower
  drawVectorFlower(ctx, x, y, size, petalColor, centerColor) {
    ctx.save();
    const petalRadius = size * 0.42;
    const dist = size * 0.36;

    // Draw 5 rounded petals
    ctx.fillStyle = petalColor;
    for (let i = 0; i < 5; i++) {
      const angle = (i * Math.PI * 2) / 5;
      const px = x + Math.cos(angle) * dist;
      const py = y + Math.sin(angle) * dist;
      ctx.beginPath();
      ctx.arc(px, py, petalRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Flower center golden pistil
    ctx.fillStyle = centerColor;
    ctx.beginPath();
    ctx.arc(x, y, size * 0.22, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // --- Dynamic Particle Explosion Loop ---
  animateEffects() {
    this.effectCtx.clearRect(0, 0, this.effectCanvas.width, this.effectCanvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity || 0.1;
      p.rotation += p.rotSpeed || 0.05;
      p.life -= p.decay || 0.012;

      if (p.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.effectCtx.save();
      this.effectCtx.translate(p.x, p.y);
      this.effectCtx.rotate(p.rotation);
      this.effectCtx.globalAlpha = Math.max(0, p.life);

      if (p.type === 'confetti') {
        this.effectCtx.fillStyle = p.color;
        this.effectCtx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else if (p.type === 'star') {
        this.drawStar(this.effectCtx, 0, 0, 5, p.size, p.size / 2, p.color);
      } else if (p.type === 'heart') {
        this.drawVectorHeart(this.effectCtx, 0, 0, p.size, p.color);
      } else {
        this.effectCtx.beginPath();
        this.effectCtx.arc(0, 0, p.size, 0, Math.PI * 2);
        this.effectCtx.fillStyle = p.color;
        this.effectCtx.shadowBlur = 8;
        this.effectCtx.shadowColor = p.color;
        this.effectCtx.fill();
      }

      this.effectCtx.restore();
    }

    requestAnimationFrame(() => this.animateEffects());
  }

  drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius, color) {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }

  // --- Public Triggers ---

  // Fullscreen Celebration Blast (when opening envelope or unlocking secret box)
  triggerCelebrationBurst(count = 150) {
    const originX = window.innerWidth / 2;
    const originY = window.innerHeight * 0.6;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 4;
      const color = this.colors[Math.floor(Math.random() * this.colors.length)];
      const isStar = Math.random() > 0.5;

      this.particles.push({
        x: originX + (Math.random() * 80 - 40),
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 6,
        size: Math.random() * 8 + 6,
        color: color,
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.2,
        life: 1.0,
        decay: Math.random() * 0.008 + 0.006,
        gravity: 0.18,
        type: isStar ? 'star' : 'confetti'
      });
    }

    if (window.birthdayAudio) {
      window.birthdayAudio.playFireworkPop();
    }
  }
}

window.particleEngine = new ParticleEngine();
