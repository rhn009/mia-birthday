// Web Audio API Synthesizer for Birthday Lullaby & Purring Sound Effects

class AudioSynth {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playBirthdayMelody() {
    this.initCtx();
    if (!this.ctx) return;
    if (this.isPlaying) return;

    this.isPlaying = true;
    const now = this.ctx.currentTime;

    const melody = [
      { note: 261.63, duration: 0.35 },
      { note: 261.63, duration: 0.35 },
      { note: 293.66, duration: 0.7 },
      { note: 261.63, duration: 0.7 },
      { note: 349.23, duration: 0.7 },
      { note: 329.63, duration: 1.2 },

      { note: 261.63, duration: 0.35 },
      { note: 261.63, duration: 0.35 },
      { note: 293.66, duration: 0.7 },
      { note: 261.63, duration: 0.7 },
      { note: 392.00, duration: 0.7 },
      { note: 349.23, duration: 1.2 },

      { note: 261.63, duration: 0.35 },
      { note: 261.63, duration: 0.35 },
      { note: 523.25, duration: 0.7 },
      { note: 440.00, duration: 0.7 },
      { note: 349.23, duration: 0.7 },
      { note: 329.63, duration: 0.7 },
      { note: 293.66, duration: 1.2 },

      { note: 466.16, duration: 0.35 },
      { note: 466.16, duration: 0.35 },
      { note: 440.00, duration: 0.7 },
      { note: 349.23, duration: 0.7 },
      { note: 392.00, duration: 0.7 },
      { note: 349.23, duration: 1.4 },
    ];

    let startTime = now + 0.1;

    melody.forEach((item) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(item.note, startTime);

      gain.gain.setValueAtTime(0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + item.duration - 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + item.duration);

      startTime += item.duration;
    });

    setTimeout(() => {
      this.isPlaying = false;
    }, (startTime - now) * 1000);
  }

  playPurrSound() {
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(60, now);
    osc.frequency.linearRampToValueAtTime(75, now + 0.3);
    osc.frequency.linearRampToValueAtTime(55, now + 0.6);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.6);
  }
}

export const audioSynth = new AudioSynth();
