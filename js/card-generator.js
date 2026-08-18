/**
 * SOUVENIR CARD GENERATOR (HTML5 CANVAS) - LUXURY VECTOR AESTHETIC DESIGN
 * Pure Vector Graphics (No Avatar Photo) • Ribbon Bow • 100% Valid PNG File Exporter
 */

class SouvenirCardGenerator {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this._blobUrl = null; // Pre-computed Blob URL sau khi render
  }

  init() {
    this.canvas = document.getElementById('souvenirCanvas');
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d');
    }

    const openBtn = document.getElementById('openSouvenirModalBtn');
    const closeBtn = document.getElementById('closeSouvenirModalBtn');
    const downloadBtn = document.getElementById('downloadCardBtn');
    const modal = document.getElementById('souvenirModal');

    const openModal = async () => {
      modal.classList.add('open');
      document.body.classList.add('modal-lock');
      await this.renderCard();
    };

    const closeModal = () => {
      modal.classList.remove('open');
      document.body.classList.remove('modal-lock');
    };

    if (openBtn && modal) {
      openBtn.addEventListener('click', openModal);
    }

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', closeModal);
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
      });
    }

    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => this.downloadCard());
    }
  }

  async renderCard() {
    if (!this.canvas) return;

    // 9:16 — chuẩn TikTok Nhật Ký & Facebook Story (1080 × 1920 px)
    // Safe zones: Top ~200px | Bottom ~420px | Right ~220px (TikTok action buttons)
    const width = 1080;
    const height = 1920;
    this.canvas.width = width;
    this.canvas.height = height;

    // Đợi tất cả font load xong để canvas render đúng chữ
    try { await document.fonts.ready; } catch (e) { }

    const ctx = this.ctx;
    ctx.clearRect(0, 0, width, height);

    // 1. Background Kraft Paper Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#fffaf0');
    bgGrad.addColorStop(0.3, '#fbf3e2');
    bgGrad.addColorStop(0.7, '#f1e2bf');
    bgGrad.addColorStop(1, '#dcc39a');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Soft Ambient Radial Light (higher center for taller canvas)
    const radialGlow = ctx.createRadialGradient(width / 2, 700, 80, width / 2, 700, 700);
    radialGlow.addColorStop(0, 'rgba(255, 250, 240, 0.9)');
    radialGlow.addColorStop(1, 'rgba(255, 250, 240, 0)');
    ctx.fillStyle = radialGlow;
    ctx.fillRect(0, 0, width, height);

    // 3. Subtle Paper Grain Dot Pattern
    ctx.fillStyle = 'rgba(58, 43, 28, 0.045)';
    for (let x = 30; x < width; x += 44) {
      for (let y = 30; y < height; y += 44) {
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 4. Deckled-look Outer & Inner Border Frames
    ctx.strokeStyle = 'rgba(58, 43, 28, 0.3)';
    ctx.lineWidth = 3;
    ctx.setLineDash([2, 10]);
    ctx.beginPath();
    ctx.roundRect(36, 36, width - 72, height - 72, 20);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.strokeStyle = 'rgba(255, 250, 240, 0.85)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(52, 52, width - 104, height - 104, 14);
    ctx.stroke();

    // 5. Decorative Corner Elements (scaled for 1080px)
    const corners = [
      [78, 78], [width - 78, 78],
      [78, height - 78], [width - 78, height - 78]
    ];
    corners.forEach(([ccx, ccy]) => {
      ctx.fillStyle = '#d81e46';
      ctx.beginPath();
      ctx.arc(ccx, ccy, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(216, 30, 70, 0.25)';
      ctx.beginPath();
      ctx.arc(ccx, ccy, 13, 0, Math.PI * 2);
      ctx.fill();
    });

    // ── SAFE ZONE: content Y 220→1500 (TikTok top ~220px, bottom safe ~1480px) ──

    // 6. Ribbon Bow — dịch lên cao hơn để tận dụng không gian
    this.drawRibbonBow(ctx, width / 2, 270, 80);

    // 7. Top Header Tag
    ctx.textAlign = 'center';
    ctx.fillStyle = '#d81e46';
    ctx.font = 'bold 20px "Space Grotesk", "Be Vietnam Pro", monospace';
    ctx.letterSpacing = '3px';
    ctx.fillText('FROM PUN TO HAI  •  09.09.2002', width / 2, 408);
    ctx.letterSpacing = '0px';

    // 8. Main Title (handwriting-first hierarchy)
    ctx.fillStyle = '#d81e46';
    ctx.font = '700 44px "Mali", "Be Vietnam Pro", cursive';
    ctx.fillText('Happy Birthday', width / 2, 478);

    ctx.fillStyle = '#3a2b1c';
    ctx.font = 'bold 66px "Baloo 2", "Be Vietnam Pro", sans-serif';
    ctx.fillText('Nguyễn Ngọc Bảo Thuy', width / 2, 570);

    // 9. Pill Badge (Date & Zodiac)
    ctx.fillStyle = '#fffaf0';
    ctx.beginPath();
    ctx.roundRect(width / 2 - 195, 606, 390, 54, 8);
    ctx.fill();
    ctx.strokeStyle = 'rgba(58, 43, 28, 0.35)';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 5]);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#d81e46';
    ctx.font = 'bold 21px "Space Grotesk", "Be Vietnam Pro", monospace';
    ctx.fillText('09 . 09 . 2002  |  VIRGO', width / 2, 640);

    // 10. Frosted Glass Quote Card
    // cardY=692, cardH=750 → card bottom=1442 (trong TikTok safe zone ~1440)
    // Last text line idx9: 692+145+9×50=1277 | Divider: 1442-88=1354 | Gap=77px ✓
    const cardX = 80;
    const cardY = 692;
    const cardW = width - 160;
    const cardH = 750;

    // Card shadow
    ctx.shadowColor = 'rgba(58, 43, 28, 0.18)';
    ctx.shadowBlur = 34;
    ctx.shadowOffsetY = 14;

    // Card background
    ctx.fillStyle = 'rgba(251, 243, 226, 0.98)';
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, 14);
    ctx.fill();

    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // Card border
    ctx.strokeStyle = 'rgba(58, 43, 28, 0.28)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Card Top Pill Tag
    ctx.fillStyle = '#fff2da';
    ctx.beginPath();
    ctx.roundRect(width / 2 - 224, cardY + 34, 448, 50, 8);
    ctx.fill();
    ctx.strokeStyle = 'rgba(216, 30, 70, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#d81e46';
    ctx.font = 'bold 21px "Be Vietnam Pro", sans-serif';
    ctx.fillText('CHÚC MỪNG HAI TUỔI 24 RỰC RỠ', width / 2, cardY + 66);

    // Decorative Sparkle Stars
    this.drawStar(ctx, width / 2 - 252, cardY + 60, 11, '#b4770f');
    this.drawStar(ctx, width / 2 + 252, cardY + 60, 11, '#b4770f');

    // Heartfelt Wishes
    // line spacing 50px × 10 lines: last idx9 = cardY+145+9×50 = 692+145+450 = 1287
    // Divider: cardY+cardH-88 = 1354  →  gap = 67px ✓  No overlap!
    ctx.fillStyle = '#3a2b1c';
    ctx.font = 'bold 28px "Mali", "Be Vietnam Pro", cursive';
    const lines = [
      'Chúc Hai bước sang tuổi 24',
      'luôn luôn xinh đẹp, rạng rỡ, ngập tràn',
      'niềm vui và gặt hái thật nhiều thành công!',
      '',
      'Chúc con đường của Hai luôn rộng mở,',
      'may mắn, công việc streamer bùng nổ và',
      'nhận được thật nhiều yêu thương.',
      '',
      'Chúc Hai tuổi mới rực rỡ, bình an',
      'và luôn tỏa sáng! ✨'
    ];

    lines.forEach((line, idx) => {
      ctx.fillText(line, width / 2, cardY + 145 + idx * 50);
    });

    // Decorative Mini Divider
    ctx.strokeStyle = 'rgba(58, 43, 28, 0.3)';
    ctx.lineWidth = 2;
    ctx.setLineDash([2, 6]);
    ctx.beginPath();
    ctx.moveTo(width / 2 - 160, cardY + cardH - 88);
    ctx.lineTo(width / 2 + 160, cardY + cardH - 88);
    ctx.stroke();
    ctx.setLineDash([]);

    // Mini Heart in divider center
    ctx.fillStyle = '#d81e46';
    ctx.beginPath();
    ctx.arc(width / 2, cardY + cardH - 88, 5, 0, Math.PI * 2);
    ctx.fill();

    // Signature inside card
    ctx.fillStyle = '#6b5439';
    ctx.font = '600 20px "Be Vietnam Pro", sans-serif';
    ctx.fillText('From Pun with all best wishes ♥', width / 2, cardY + cardH - 38);

    // 11. Footer (Y ~1538 — dưới safe zone TikTok nhưng trong safe zone FB Story)
    ctx.fillStyle = '#6b5439';
    ctx.font = '600 17px "Space Grotesk", sans-serif';
    ctx.letterSpacing = '1.5px';
    ctx.fillText('MEMORIES & BLESSINGS  •  09/09/2002 - 2026', width / 2, cardY + cardH + 60);
    ctx.letterSpacing = '0px';

    // Pre-compute Blob URL — không cần user gesture ở bước này
    // Khi user bấm download, Blob URL đã sẵn sàng → download thẳng, không bị chặn
    if (this._blobUrl) {
      URL.revokeObjectURL(this._blobUrl);
      this._blobUrl = null;
    }
    await new Promise(resolve => {
      this.canvas.toBlob(blob => {
        if (blob) this._blobUrl = URL.createObjectURL(blob);
        resolve();
      }, 'image/png');
    });
  }

  drawRibbonBow(ctx, cx, cy, size) {
    ctx.save();
    ctx.translate(cx, cy);

    // Left Wing
    ctx.beginPath();
    ctx.fillStyle = '#d81e46';
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-size * 0.4, -size * 0.7, -size * 1.1, -size * 0.5, -size * 0.9, 0);
    ctx.bezierCurveTo(-size * 1.1, size * 0.5, -size * 0.4, size * 0.7, 0, 0);
    ctx.fill();

    // Right Wing
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(size * 0.4, -size * 0.7, size * 1.1, -size * 0.5, size * 0.9, 0);
    ctx.bezierCurveTo(size * 1.1, size * 0.5, size * 0.4, size * 0.7, 0, 0);
    ctx.fill();

    // Left Tail
    ctx.beginPath();
    ctx.fillStyle = '#be123c';
    ctx.moveTo(-size * 0.2, size * 0.2);
    ctx.lineTo(-size * 0.6, size * 0.9);
    ctx.lineTo(-size * 0.35, size * 0.85);
    ctx.lineTo(-size * 0.1, size * 0.3);
    ctx.closePath();
    ctx.fill();

    // Right Tail
    ctx.beginPath();
    ctx.moveTo(size * 0.2, size * 0.2);
    ctx.lineTo(size * 0.6, size * 0.9);
    ctx.lineTo(size * 0.35, size * 0.85);
    ctx.lineTo(size * 0.1, size * 0.3);
    ctx.closePath();
    ctx.fill();

    // Central Knot
    ctx.beginPath();
    ctx.fillStyle = '#ff4d79';
    ctx.arc(0, 0, size * 0.24, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }

  drawStar(ctx, cx, cy, size, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * size, cy + Math.sin(angle) * size);
      ctx.lineTo(cx + Math.cos(angle + Math.PI / 4) * (size * 0.3), cy + Math.sin(angle + Math.PI / 4) * (size * 0.3));
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  async downloadCard() {
    if (!this.canvas) return;

    const FILENAME = 'HappyBirthday-NhimNhor-09092002.png';

    // Lấy blob từ canvas (render đã xong trước đó)
    const blob = await new Promise(resolve =>
      this.canvas.toBlob(resolve, 'image/png')
    );
    if (!blob) return;

    // Tải thẳng về Downloads: tạo Blob URL và click <a download>
    // Chrome 66+ giữ user gesture qua async/await → download với tên file đúng
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = FILENAME;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 2000);

    if (window.particleEngine) window.particleEngine.triggerHeartExplosion();
  }
}

window.cardGenerator = new SouvenirCardGenerator();
