import { game } from "..";
import { Maths } from "../core/maths";
import { Transform } from "../core/transform";
import { Vec2 } from "../core/vec2";

export class HealthDisplayer {
  public display(transform: Transform, current: number, max: number) {
    const mid = new Vec2(transform.getX() + transform.size.x / 2, transform.getY() - transform.size.y / 2);
    mid.x = max % 2 === 0 ? mid.x - Math.floor(max / 2) * 12 - Math.floor(max / 2 - 1) * 12 : mid.x - Math.floor(max / 2) * 24;


    for (let i = 0; i < max; ++i) {
      game.ctx.drawImage(
        game.resources.SPRITES.HEART_FULL,
        mid.x - 16,
        mid.y,
        32,
        32
      );

      mid.x += 24
    }
  }
}