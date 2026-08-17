/**
 * INTERACTIVE BIRTHDAY CAKE CONTROLLER
 * Controls candle extinguishing, smoke animation, sound effects, and celebration burst
 */

class BirthdayCakeController {
  constructor() {
    this.isBlown = false;
  }

  init() {
    const flames = document.querySelectorAll('.flame');
    flames.forEach(flame => {
      flame.addEventListener('click', () => this.blowCandle());
      flame.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.blowCandle();
      }, { passive: false });
    });

    const blowBtn = document.getElementById('blowCandleBtn');
    if (blowBtn) {
      blowBtn.addEventListener('click', () => this.blowCandle());
    }
  }

  blowCandle() {
    if (this.isBlown) return;
    this.isBlown = true;

    // 1. Extinguish all flames
    const flames = document.querySelectorAll('.flame');
    flames.forEach(flame => {
      flame.classList.add('extinguished');
    });

    // 2. Trigger smoke
    const smokes = document.querySelectorAll('.smoke');
    smokes.forEach(smoke => {
      smoke.classList.add('active');
    });

    // 3. Audio & SFX
    if (window.birthdayAudio) {
      window.birthdayAudio.playBlowSound();
      setTimeout(() => {
        window.birthdayAudio.playSealOpen();
      }, 500);
    }

    // 4. Trigger Celebration Fireworks Explosion
    if (window.particleEngine) {
      setTimeout(() => {
        window.particleEngine.triggerCelebrationBurst(160);
      }, 400);
      setTimeout(() => {
        window.particleEngine.triggerCelebrationBurst(120);
      }, 1000);
    }

    // 5. Reveal Wish Box
    const wishInput = document.getElementById('userWishInput');
    const wishText = wishInput && wishInput.value.trim() ? wishInput.value.trim() : "Chúc bạn tuổi mới luôn mạnh khỏe, bình an, hạnh phúc và thành công trên con đường đã chọn!";
    
    const wishDisplay = document.getElementById('wishDisplayContent');
    if (wishDisplay) {
      wishDisplay.textContent = `"${wishText}"`;
    }

    const wishCard = document.getElementById('wishRevealedCard');
    if (wishCard) {
      wishCard.classList.add('show');
    }

    const blowBtn = document.getElementById('blowCandleBtn');
    if (blowBtn) {
      blowBtn.textContent = 'Đã Thổi Nến Thành Công!';
      blowBtn.classList.remove('btn-primary');
      blowBtn.classList.add('btn-gold');
      blowBtn.disabled = true;
    }
  }
}

window.cakeController = new BirthdayCakeController();
