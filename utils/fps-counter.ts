class _FPSCounter {
  times: number[] = []

  fps: number = 0

  handle?: number

  play = () => {
    this.handle = window.requestAnimationFrame(() => {
      const now = performance.now();
      while (this.times.length > 0 && this.times[0] <= now - 1000) {
        this.times.shift();
      }
      this.times.push(now);
      this.fps = this.times.length;
      this.play();
    });
  }

  pause = () => {
    window.cancelAnimationFrame(this.handle as number)
  }

  getFps() {
    return this.fps
  }
}

const FPSCounter = new _FPSCounter()

export { FPSCounter }