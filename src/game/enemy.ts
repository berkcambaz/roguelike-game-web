import { game } from "..";
import { INPUT_KEY } from "../core/input";
import { Maths } from "../core/maths";
import { Transform } from "../core/transform";
import { Vec2 } from "../core/vec2";
import { Health } from "./health";

interface Components {
  transform: Transform;
  health: Health;
}

export class Enemy {
  public components: Components;

  public speed: number;
  public health: number;

  constructor(pos: Vec2, size: Vec2) {
    this.components = {
      transform: new Transform(pos, size),
      health: new Health(3, 3)
    }

    this.speed = 7.5;
    this.health = 1;
  }

  public tick() {
    const transform = this.components.transform;

    transform.tick();

    let velocity = Vec2.zero();

    transform.pos = Vec2.add(transform.pos, velocity);
  }

  public render() {
    const transform = this.components.transform;
    const health = this.components.health;

    game.ctx.drawImage(
      game.resources.SPRITES.BAT,
      transform.getX(),
      transform.getY(),
      transform.size.x,
      transform.size.y
    );

    health.display(transform);
  }
}