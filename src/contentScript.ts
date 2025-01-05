let isRunning = false;
const id = 'dark-mode-lenses';

document.addEventListener('keydown', (event: KeyboardEvent)=> {
    if (event.code === 'KeyD' && event.shiftKey) {
        isRunning = !isRunning;
        isRunning ? renderLenses() : destroyLenses();
    }
});

function destroyLenses(): void {
    document.getElementById(id)?.remove();
}

function renderLenses(): void {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    canvas.id = id;
    canvas.style.position = 'fixed';
    (canvas.style.zIndex as unknown as number) = 10000000;
    canvas.style.pointerEvents = 'none';

    document.body.appendChild(canvas);

    ctx.fillStyle = 'rgba(0,0,0,.45)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}