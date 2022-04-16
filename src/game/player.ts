import { game } from "..";
import { INPUT_KEY } from "../core/input";
import { Transform } from "../core/transform";
import { Vec2 } from "../core/vec2";
import { Health } from "./health";

interface Components {
  transform: Transform;
  health: Health;
}

export class Player {
  public components: Components;

  public speed: number;
  public health: number;

  constructor(pos: Vec2, size: Vec2) {
    this.components = {
      transform: new Transform(pos, size),
      health: new Health(3, 3)
    }

    this.speed = 7.5;
    this.health = 0;
  }

  public tick() {
    const transform = this.components.transform;

    transform.tick();

    let velocity = Vec2.zero();

    if (game.input.getKey(INPUT_KEY.UP)) velocity.y += -this.speed;
    if (game.input.getKey(INPUT_KEY.DOWN)) velocity.y += this.speed;
    if (game.input.getKey(INPUT_KEY.LEFT)) velocity.x += -this.speed;
    if (game.input.getKey(INPUT_KEY.RIGHT)) velocity.x += this.speed;

    transform.pos = Vec2.add(transform.pos, velocity);
  }

  public render() {
    const transform = this.components.transform;
    const health = this.components.health;

    game.ctx.drawImage(
      game.resources.SPRITES.HUMAN,
      transform.getX(),
      transform.getY(),
      transform.size.x,
      transform.size.y
    );

    health.display(transform);
  }
}