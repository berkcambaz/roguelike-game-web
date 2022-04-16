import { game } from "../..";
import { Transform } from "./transform";
import { Vec2 } from "../../core/vec2";

export class Health {
  public current: number;
  public max: number;

  constructor(current: number, max: number) {
    this.current = current;
    this.max = max;
  }

  public display(transform: Transform) {
    const mid = new Vec2(transform.getX() + transform.size.x / 2, transform.getY() - transform.size.y / 2);
    mid.x = this.max % 2 === 0 ? mid.x - Math.floor(this.max / 2) * 12 - Math.floor(this.max / 2 - 1) * 12 : mid.x - Math.floor(this.max / 2) * 24;
    let health = this.current;

    for (let i = 0; i < this.max; ++i) {
      let sprite: HTMLImageElement;

      health -= 1;
      if (health >= 0) sprite = game.resources.SPRITES.HEART_FULL;
      else if (health === -0.5) sprite = game.resources.SPRITES.HEART_HALF;
      else sprite = game.resources.SPRITES.HEART_EMPTY;

      game.ctx.drawImage(
        sprite,
        mid.x - 16,
        mid.y,
        32,
        32
      );

      mid.x += 24
    }
  }
}