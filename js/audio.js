/**
 * AUDIO ENGINE: BIRTHDAY 09/09/2002
 * Uses Real Studio-Recorded MP3 Audio Tracks + HTML5 Audio Element & Web Audio SFX
 */

class BirthdayAudioEngine {
  constructor() {
    this.audio = new Audio('assets/audio/happy_birthday.mp3');
    this.audio.loop = true;
    this.audio.volume = 0.65;
    this.isPlaying = false;
    this.isMuted = false;

    // Track Playlist
    this.tracks = [
      {
        title: "Happy Birthday to You (Studio Instrumental)",
        artist: "Nhạc sinh nhật giai điệu chuẩn ấm áp",
        src: "assets/audio/happy_birthday.mp3"
      }
    ];
    this.currentTrackIndex = 0;

    // Web Audio Context for SFX
    this.sfxCtx = null;
  }

  init() {
    if (!this.sfxCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.sfxCtx = new AudioContext();
    }
    if (this.sfxCtx.state === 'suspended') {
      this.sfxCtx.resume();
    }
  }

  startBGM() {
    this.init();
    if (this.isMuted) return;

    this.audio.play().then(() => {
      this.isPlaying = true;
      this.updateUI(true);
    }).catch(err => {
      console.warn("Autoplay prevented:", err);
    });
  }

  pauseBGM() {
    this.audio.pause();
    this.isPlaying = false;
    this.updateUI(false);
  }

  toggleBGM() {
    this.init();
    if (this.isPlaying) {
      this.pauseBGM();
      return false;
    } else {
      this.startBGM();
      return true;
    }
  }

  playTrack(index) {
    this.currentTrackIndex = index % this.tracks.length;
    const track = this.tracks[this.currentTrackIndex];
    this.audio.src = track.src;
    this.startBGM();
  }

  updateUI(playing) {
    const soundBars = document.querySelector('.sound-bars');
    const vinylDisc = document.getElementById('vinylDisc');
    const playToggleBtn = document.getElementById('vinylPlayToggle');

    if (soundBars) {
      if (playing) soundBars.classList.add('playing');
      else soundBars.classList.remove('playing');
    }

    if (vinylDisc) {
      if (playing) vinylDisc.classList.add('spinning');
      else vinylDisc.classList.remove('spinning');
    }

    if (playToggleBtn) {
      playToggleBtn.textContent = playing ? 'Tạm dừng' : 'Tiếp tục phát';
    }
  }

  // SFX: Wax seal opening chime
  playSealOpen() {
    this.init();
    if (!this.sfxCtx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'triangle', 0.5, 0.15);
      }, idx * 90);
    });
  }

  // SFX: Unlock success chime
  playUnlockSuccess() {
    this.init();
    if (!this.sfxCtx) return;

    const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'sine', 0.6, 0.2);
      }, idx * 110);
    });
  }

  // SFX: Confetti/firework pop
  playFireworkPop() {
    this.init();
    if (!this.sfxCtx) return;

    this.playTone(880, 'triangle', 0.18, 0.18);
    setTimeout(() => this.playTone(1318.51, 'sine', 0.22, 0.14), 60);
  }

  // SFX: Tactile Paper Rustle (synthetic noise sweep for notebook page/fold)
  playPaperRustle() {
    this.init();
    if (this.isMuted || !this.sfxCtx) return;

    try {
      const bufferSize = this.sfxCtx.sampleRate * 0.14; // 140ms
      const buffer = this.sfxCtx.createBuffer(1, bufferSize, this.sfxCtx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.sfxCtx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.sfxCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, this.sfxCtx.currentTime);
      filter.Q.setValueAtTime(1.8, this.sfxCtx.currentTime);

      const gain = this.sfxCtx.createGain();
      gain.gain.setValueAtTime(0.08, this.sfxCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.sfxCtx.currentTime + 0.14);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxCtx.destination);

      whiteNoise.start();
    } catch (e) {
      // Fallback tone
      this.playTone(400, 'triangle', 0.08, 0.05);
    }
  }

  // SFX: Ink Stamp Thud (soft rubber stamp thump)
  playStampThud() {
    this.init();
    if (this.isMuted || !this.sfxCtx) return;

    this.playTone(120, 'sine', 0.12, 0.22);
    setTimeout(() => this.playTone(280, 'triangle', 0.08, 0.1), 20);
  }

  // SFX: Metallic Paperclip Click
  playPaperClipClick() {
    this.init();
    if (this.isMuted || !this.sfxCtx) return;

    this.playTone(1800, 'triangle', 0.04, 0.08);
    setTimeout(() => this.playTone(2400, 'sine', 0.03, 0.06), 15);
  }

  playTone(freq, type = 'sine', duration = 0.5, gainLevel = 0.15) {
    if (this.isMuted || !this.sfxCtx) return;

    const osc = this.sfxCtx.createOscillator();
    const gain = this.sfxCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.sfxCtx.currentTime);

    gain.gain.setValueAtTime(0, this.sfxCtx.currentTime);
    gain.gain.linearRampToValueAtTime(gainLevel, this.sfxCtx.currentTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.sfxCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.sfxCtx.destination);

    osc.start();
    osc.stop(this.sfxCtx.currentTime + duration);
  }
}

window.birthdayAudio = new BirthdayAudioEngine();
