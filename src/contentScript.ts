const id = 'dark-mode-lenses';
const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let level: number;
let mutationObserver: MutationObserver | null = null;

document.addEventListener('keydown', ({ key, altKey }: KeyboardEvent) => {
  if (digits.includes(key) && altKey) {
    level = parseInt(key);

    if (level) {
      if (!mutationObserver) {
        mutationObserver = createMutationObserver();
        mutationObserver.observe(document.body, { childList: true });
      }

      ensureCanvasReadyAndRender();
    } else {
      destroyMutationObserver();
      destroyLenses();
    }
  }
});

function createMutationObserver(): MutationObserver {
  return new MutationObserver((entries: MutationRecord[]) => {
    for (const entry of entries) {
      if (entry.type === 'childList') {
        const removedNodes = Array.from(entry.removedNodes);
        if (removedNodes.some((node) => (node as Element)?.id === id)) {
          canvas = ctx = null;
          ensureCanvasReadyAndRender();
        }
      }
    }
  });
}

function destroyMutationObserver(): void {
  mutationObserver?.disconnect();
  mutationObserver = null;
}

function ensureCanvasReadyAndRender(): void {
  if (!canvas) {
    canvas = createCanvas();
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d')!;
  }

  renderLenses(level, ctx!);
}

function createCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  canvas.id = id;
  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.zIndex = '10000000';
  canvas.style.pointerEvents = 'none';

  return canvas;
}

function destroyLenses(): void {
  canvas?.remove();
  ctx = canvas = null;
}

function renderLenses(level: number, ctx: CanvasRenderingContext2D): void {
  const { width, height } = ctx.canvas;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = `rgba(0,0,0, ${level * 0.1})`;
  ctx.fillRect(0, 0, width, height);
}
