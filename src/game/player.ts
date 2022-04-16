import { game } from "..";
import { INPUT_KEY } from "../core/input";
import { Maths } from "../core/maths";
import { Transform } from "../core/transform";
import { Vec2 } from "../core/vec2";
import { HealthDisplayer } from "./health_displayer";

export class Player {
  public transform: Transform;
  public healthDisplayer: HealthDisplayer;

  public speed: number;
  public health: number;

  constructor(pos: Vec2, size: Vec2) {
    this.transform = new Transform(pos, size);
    this.healthDisplayer = new HealthDisplayer();

    this.speed = 7.5;
    this.health = 3;
  }

  public tick() {
    this.transform.tick();

    let velocity = Vec2.zero();

    if (game.input.getKey(INPUT_KEY.UP)) velocity.y += -this.speed;
    if (game.input.getKey(INPUT_KEY.DOWN)) velocity.y += this.speed;
    if (game.input.getKey(INPUT_KEY.LEFT)) velocity.x += -this.speed;
    if (game.input.getKey(INPUT_KEY.RIGHT)) velocity.x += this.speed;

    this.transform.pos = Vec2.add(this.transform.pos, velocity);
  }

  public render() {
    game.ctx.drawImage(
      game.resources.SPRITES.HUMAN,
      this.transform.getX(),
      this.transform.getY(),
      this.transform.size.x,
      this.transform.size.y
    );

    this.healthDisplayer.display(this.transform, this.health, 3);
  }
}