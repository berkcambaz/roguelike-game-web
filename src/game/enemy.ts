import { game } from "..";
import { INPUT_KEY } from "../core/input";
import { Maths } from "../core/maths";
import { Transform } from "./components/transform";
import { Vec2 } from "../core/vec2";
import { Health } from "./components/health";
import { Collider } from "./components/collider";

interface Components {
  transform: Transform;
  health: Health;
  collider: Collider;
}

export class Enemy {
  public components: Components;

  public speed: number;

  constructor(pos: Vec2, size: Vec2) {
    this.components = {
      transform: new Transform(pos, size),
      health: new Health(3, 3),
      collider: new Collider(size)
    }

    this.speed = 2.5;
  }

  public tick() {
    const transform = this.components.transform;

    transform.tick();
    if (this.components.health.current <= 0)
      game.world.enemies.splice(game.world.enemies.indexOf(this), 1);

    transform.pos = Maths.towards(transform.pos, game.world.player.components.transform.pos, this.speed);
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