import { Camera } from "../core/camera";
import { Resources } from "../core/resources";
import { Signal } from "../core/signal";

interface GameSignals {
  onResize: Signal<[w: number, h: number]>;
}

export class Game {
  public camera!: Camera;
  public resources!: Resources;

  public signals: GameSignals;

  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;

  public readonly tps = 1000 / 30;
  private currentTime = 0;
  private accumulator = 0;

  constructor() {
    this.signals = {
      onResize: new Signal()
    };

    // Initialize canvas and ctx
    this.canvas = document.createElement("canvas");
    const ctx = this.canvas.getContext("2d");
    if (!ctx) throw Error("HTML Canvas is not supported in the browser.");
    this.ctx = ctx;
    document.body.appendChild(this.canvas);

    this.addEventListeners();
  }

  public run() {
    // Initialize game core
    this.camera = new Camera(0, 0, 1280, 720);
    this.resources = new Resources();

    // Call resize event before starting the game
    this.signals.onResize.dispatch(window.innerWidth, window.innerHeight);

    // Async initializations
    Promise.resolve()
      .then(() => this.resources.loadSprites())
      .then(() => { this.loop(0) })
  }

  private loop(newTime: number) {
    window.requestAnimationFrame((time) => { this.loop(time) });

    let frameTime = newTime - this.currentTime;
    if (frameTime > this.tps) frameTime = this.tps;
    this.currentTime = newTime;
    this.accumulator += frameTime;

    while (this.accumulator >= this.tps) {
      this.tick();
      this.accumulator -= this.tps;
    }

    this.render(this.accumulator / this.tps);
  }

  private tick() {

  }

  private render(dt: number) {
    this.ctx.clearRect(0, 0, this.camera.w, this.camera.h);
  }

  private addEventListeners() {
    window.addEventListener("resize", () => {
      this.signals.onResize.dispatch(window.innerWidth, window.innerHeight);
    });
  }
}