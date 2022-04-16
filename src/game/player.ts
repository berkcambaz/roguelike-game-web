import { game } from "..";
import { INPUT_KEY } from "../core/input";
import { Maths } from "../core/maths";
import { Vec2 } from "../core/vec2";

export class Player {
  public pos: Vec2;
  public oldPos: Vec2;
  public speed: number;

  constructor(pos: Vec2) {
    this.pos = pos;
    this.oldPos = pos;
    this.speed = 7.5;
  }

  public tick() {
    this.oldPos = this.pos.clone();

    let velocity = Vec2.zero();

    if (game.input.getKey(INPUT_KEY.UP)) velocity.y += -this.speed;
    if (game.input.getKey(INPUT_KEY.DOWN)) velocity.y += this.speed;
    if (game.input.getKey(INPUT_KEY.LEFT)) velocity.x += -this.speed;
    if (game.input.getKey(INPUT_KEY.RIGHT)) velocity.x += this.speed;

    this.pos = Vec2.add(this.pos, velocity);
  }

  public render(dt: number) {
    game.ctx.drawImage(
      game.resources.SPRITES.HUMAN,
      Maths.interp(this.oldPos.x, this.pos.x, dt),
      Maths.interp(this.oldPos.y, this.pos.y, dt),
      64,
      64
    );
  }
}