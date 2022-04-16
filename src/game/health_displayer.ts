import { game } from "..";
import { Maths } from "../core/maths";
import { Transform } from "../core/transform";
import { Vec2 } from "../core/vec2";

export class HealthDisplayer {
  public display(transform: Transform, current: number, max: number) {
    const mid = new Vec2(transform.getX() + transform.size.x / 2, transform.getY() - transform.size.y / 2);
    mid.x = max % 2 === 0 ? mid.x - Math.floor(max / 2) * 12 - Math.floor(max / 2 - 1) * 12 : mid.x - Math.floor(max / 2) * 24;

    for (let i = 0; i < max; ++i) {
      let health = 0;
      current -= 1;
      if (current >= 0) health = 1;
      else if (current === -0.5) health = 0.5;
      else health = 0;

      game.ctx.drawImage(
        this.healthToSprite(health),
        mid.x - 16,
        mid.y,
        32,
        32
      );

      mid.x += 24
    }
  }

  private healthToSprite(health: number) {
    switch (health) {
      case 0: return game.resources.SPRITES.HEART_EMPTY;
      case 0.5: return game.resources.SPRITES.HEART_HALF;
      case 1: return game.resources.SPRITES.HEART_FULL;
      default: throw new Error("Health must be either 0, 0.5 or 1.");
    }
  }
}