import { game } from "..";

export class Camera {
  public x: number;
  public y: number;
  public w: number;
  public h: number;
  private scaledW: number;
  private scaledH: number;

  constructor(x: number, y: number, w: number, h: number) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.scaledW = 0;
    this.scaledH = 0;

    game.signals.onResize.add((w, h) => { this.onResize(w, h) });
  }

  public convertX(x: number) {
    return x / this.scaledW * this.w;
  }

  public convertY(y: number) {
    return y / this.scaledH * this.h;
  }

  private onResize(w: number, h: number) {
    // TODO: Handle for different device pixel ratios

    let target = this.w / this.h;
    let current = w / h;

    if (current > target) w = h * (16 / 9);
    else h = w * (9 / 16);

    this.scaledW = w;
    this.scaledH = h;

    game.canvas.width = this.w;
    game.canvas.height = this.h;
    game.canvas.style.width = this.scaledW + "px";
    game.canvas.style.height = this.scaledH + "px";
  }
}