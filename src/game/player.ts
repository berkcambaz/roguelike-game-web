import { game } from "..";
import { Vec2 } from "../core/vec2";

export class Player {
  public pos: Vec2;
  public oldPos: Vec2;

  constructor(pos: Vec2) {
    this.pos = pos;
    this.oldPos = pos;
  }

  public tick() {
    this.oldPos = this.pos.clone();

    console.log(game.input.mouse.x);

  }

  public render(dt: number) {
    game.ctx.drawImage(
      game.resources.SPRITES.HUMAN,
      this.pos.x,
      this.pos.y,
      64,
      64
    );
  }
}