import { game } from "..";
import { INPUT_KEY } from "../core/input";
import { Transform } from "./components/transform";
import { Vec2 } from "../core/vec2";
import { Health } from "./components/health";
import { Collider } from "./components/collider";
import { Physics } from "../core/physics";

interface Components {
  transform: Transform;
  health: Health;
  collider: Collider;
}

export class Player {
  public components: Components;

  public speed: number;
  public health: number;
  public cooldown: number;

  constructor(pos: Vec2, size: Vec2) {
    this.components = {
      transform: new Transform(pos, size),
      health: new Health(3, 3),
      collider: new Collider(size)
    }

    this.speed = 7.5;
    this.health = 0;
    this.cooldown = 0;
  }

  public tick() {
    const transform = this.components.transform;

    transform.tick();
    this.cooldown--;

    let velocity = Vec2.zero();

    if (game.input.getKey(INPUT_KEY.UP)) velocity.y += -this.speed;
    if (game.input.getKey(INPUT_KEY.DOWN)) velocity.y += this.speed;
    if (game.input.getKey(INPUT_KEY.LEFT)) velocity.x += -this.speed;
    if (game.input.getKey(INPUT_KEY.RIGHT)) velocity.x += this.speed;

    if (game.input.getKey(INPUT_KEY.ATTACK) && this.cooldown < 0) {
      this.cooldown = 15;

      for (let i = 0; i < game.world.enemies.length; ++i) {
        const enemy = game.world.enemies[i];
        const colliding = Physics.box_circle(
          enemy.components.transform.pos,
          enemy.components.collider.size,
          new Vec2(game.input.mouse.x, game.input.mouse.y),
          10
        );
        if (colliding) enemy.components.health.current -= 0.5;
      }
    }

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