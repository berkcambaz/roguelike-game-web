import { game } from "..";
import { Physics } from "../core/physics";
import { Vec2 } from "../core/vec2";
import { Enemy } from "./enemy";
import { Player } from "./player";

export class World {
  public player!: Player;
  public enemies: Enemy[] = [];

  public spawnCooldown = 0;

  public start() {
    this.player = new Player(new Vec2(0, 0), new Vec2(64, 64));
  }

  public tick() {
    this.player.tick();

    for (let i = 0; i < this.enemies.length; ++i) {
      this.enemies[i].tick();
    }

    this.spawnCooldown--;
    if (this.spawnCooldown <= 0 && this.enemies.length < 15) {
      this.spawnCooldown = 15;

      const enemy = new Enemy(
        new Vec2(640 + 640 * Math.cos(Math.random() * 2 * Math.PI), 360 + 360 * Math.cos(Math.random() * 2 * Math.PI)),
        new Vec2(64, 64)
      )

      let colliding = false;
      for (let i = 0; i < this.enemies.length; ++i) {
        if (enemy === this.enemies[i]) continue;
        colliding = Physics.box_box(
          enemy.components.transform.pos,
          enemy.components.collider.size,
          this.enemies[i].components.transform.pos,
          this.enemies[i].components.collider.size,
        );
        if (colliding) break;
      }

      if (!colliding) {
        this.enemies.push(enemy);
      }
    }
  }

  public render() {
    this.player.render();

    for (let i = 0; i < this.enemies.length; ++i) {
      this.enemies[i].render();
    }
  }
}