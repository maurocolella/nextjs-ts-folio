import SimplexNoise from 'simplex-noise';
import { TAU, cos, fadeInOut, lerp, rand, randRange, sin } from './effect-utils';

const particleCount = 700;
const particlePropCount = 9;
const particlePropsLength = particleCount * particlePropCount;
const rangeY = 100;
const baseTTL = 50;
const rangeTTL = 150;
const baseSpeed = 0.1;
const rangeSpeed = 2;
const baseRadius = 1;
const rangeRadius = 4;
const baseHue = 10;
const rangeHue = 20;
const noiseSteps = 8;
const xOff = 0.00125;
const yOff = 0.00125;
const zOff = 0.0005;
const backgroundColor = 'hsla(220,50%,5%,1)';

let container: HTMLElement;
let canvas: {
  a: HTMLCanvasElement
  b: HTMLCanvasElement
};
let ctx: {
  a: CanvasRenderingContext2D | null
  b: CanvasRenderingContext2D | null
};
let center: Array<number>;
let tick: number;
let simplex: { noise3D: (arg0: number, arg1: number, arg2: number) => number; };
let particleProps: Float32Array;
let enabled = true;

function initParticles() {
  tick = 0;
  simplex = new SimplexNoise();
  particleProps = new Float32Array(particlePropsLength);

  let i;

  for (i = 0; i < particlePropsLength; i += particlePropCount) {
    initParticle(i);
  }
}

function initParticle(i: number | undefined) {
  // tslint:disable-next-line: one-variable-per-declaration
  let x, y, vx, vy, life, ttl, speed, radius, hue;

  x = rand(canvas.a.width);
  y = center[1] + randRange(rangeY);
  vx = 0;
  vy = 0;
  life = 0;
  ttl = baseTTL + rand(rangeTTL);
  speed = baseSpeed + rand(rangeSpeed);
  radius = baseRadius + rand(rangeRadius);
  hue = baseHue + rand(rangeHue);

  particleProps.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
}

function drawParticles() {
  let i;

  for (i = 0; i < particlePropsLength; i += particlePropCount) {
    updateParticle(i);
  }
}

function updateParticle(i: number) {
  const i2 = 1 + i;
  const i3 = 2 + i;
  const i4 = 3 + i;
  const i5 = 4 + i;
  const i6 = 5 + i;
  const i7 = 6 + i;
  const i8 = 7 + i;
  const i9 = 8 + i;
  // tslint:disable-next-line: one-variable-per-declaration
  let n, x, y, vx, vy, life, ttl, speed, x2, y2, radius, hue;

  x = particleProps[i];
  y = particleProps[i2];
  n = simplex.noise3D(x * xOff, y * yOff, tick * zOff) * noiseSteps * TAU;
  vx = lerp(particleProps[i3], cos(n), 0.5);
  vy = lerp(particleProps[i4], sin(n), 0.5);
  life = particleProps[i5];
  ttl = particleProps[i6];
  speed = particleProps[i7];
  x2 = x + vx * speed;
  y2 = y + vy * speed;
  radius = particleProps[i8];
  hue = particleProps[i9];

  drawParticle(x, y, x2, y2, life, ttl, radius, hue);

  life++;

  particleProps[i] = x2;
  particleProps[i2] = y2;
  particleProps[i3] = vx;
  particleProps[i4] = vy;
  particleProps[i5] = life;

  (checkBounds(x, y) || life > ttl) && initParticle(i);
}

function drawParticle(x: number, y: number, x2: number, y2: number, life: number, ttl: number, radius: number, hue: number) {
  ctx.a!.save();
  ctx.a!.lineCap = 'round';
  ctx.a!.lineWidth = radius;
  ctx.a!.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
  ctx.a!.beginPath();
  ctx.a!.moveTo(x, y);
  ctx.a!.lineTo(x2, y2);
  ctx.a!.stroke();
  ctx.a!.closePath();
  ctx.a!.restore();
}

function checkBounds(x: number, y: number) {
  return(
    x > canvas.a.width ||
    x < 0 ||
    y > canvas.a.height ||
    y < 0
  );
}

function createCanvas() {
  canvas = {
    'a': document.createElement('canvas'),
    'b': document.createElement('canvas')
  };
  canvas.b.style.height = '100%';
  canvas.b.style.left   = '0px';
  canvas.b.style.top    = '0px';
  canvas.b.style.width  = '100%';
  container!.appendChild(canvas.b);
  ctx = {
    'a': canvas.a.getContext('2d'),
    'b': canvas.b.getContext('2d')
  };
  ctx.b!.fillStyle = backgroundColor;
  center = [];
}

function resize() {
  const { innerWidth, innerHeight } = window;

  canvas.a.width = innerWidth;
  canvas.a.height = innerHeight;

  ctx.a!.drawImage(canvas.b, 0, 0);

  canvas.b.width = innerWidth;
  canvas.b.height = innerHeight;

  ctx.b!.drawImage(canvas.a, 0, 0);

  center[0] = 0.5 * canvas.a.width;
  center[1] = 0.5 * canvas.a.height;
}

function renderGlow() {
  ctx.b!.save();
  ctx.b!.filter = 'blur(8px) brightness(200%)';
  ctx.b!.globalCompositeOperation = 'lighter';
  ctx.b!.drawImage(canvas.a, 0, 0);
  ctx.b!.restore();

  ctx.b!.save();
  ctx.b!.filter = 'blur(4px) brightness(200%)';
  ctx.b!.globalCompositeOperation = 'lighter';
  ctx.b!.drawImage(canvas.a, 0, 0);
  ctx.b!.restore();
}

function renderToScreen() {
  ctx.b!.save();
  ctx.b!.globalCompositeOperation = 'lighter';
  ctx.b!.drawImage(canvas.a, 0, 0);
  ctx.b!.restore();
}

function draw() {
  tick++;

  ctx.a!.clearRect(0, 0, canvas.a.width, canvas.a.height);

  ctx.b!.fillRect(0, 0, canvas.a.width, canvas.a.height);

  drawParticles();
  renderGlow();
  renderToScreen();

  if (enabled) window.requestAnimationFrame(draw);
}

export class SwirlEffect {
  constructor(el: HTMLDivElement) {
    container = el;
    createCanvas();
    resize();
    initParticles();
    draw();
    window.addEventListener('resize', resize);
  }

  destroy() {
    window.removeEventListener('resize', resize);
    enabled = false;
    container.removeChild(canvas.b);
    // delete canvas.a;
  }
}
