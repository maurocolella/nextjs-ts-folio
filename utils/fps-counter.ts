class FPSCounterSingleton {
  times: Array<number> = [];

  fps: number = 0;

  enabled?: boolean = false;

  play = () => {
    this.enabled = true;
    this.run();
  }

  run = () => {
    if (this.enabled) {
      window.requestAnimationFrame(() => {
        const now = performance.now();
        while (this.times.length > 0 && this.times[0] <= now - 1000) {
          this.times.shift();
        }
        this.times.push(now);
        this.fps = this.times.length;
        this.run();
      });
    }
  }

  pause = () => {
    this.enabled = false;
  }

  getFps() {
    return this.fps;
  }
}

const FPSCounter = new FPSCounterSingleton();

export { FPSCounter };
