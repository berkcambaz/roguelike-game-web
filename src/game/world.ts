import { Vec2 } from "../core/vec2";
import { Enemy } from "./enemy";
import { Player } from "./player";

export class World {
  public player!: Player;
  public enemies: Enemy[] = [];

  public start() {
    this.player = new Player(new Vec2(0, 0), new Vec2(64, 64));
    this.enemies.push(new Enemy(new Vec2(100, 100), new Vec2(64, 64)));
    this.enemies.push(new Enemy(new Vec2(123, 100), new Vec2(64, 64)));
    this.enemies.push(new Enemy(new Vec2(100, 13), new Vec2(64, 64)));
    this.enemies.push(new Enemy(new Vec2(454, 100), new Vec2(64, 64)));
    this.enemies.push(new Enemy(new Vec2(777, 55), new Vec2(64, 64)));
  }

  public tick() {
    this.player.tick();

    for (let i = 0; i < this.enemies.length; ++i) {
      this.enemies[i].tick();
    }
  }

  public render() {
    this.player.render();

    for (let i = 0; i < this.enemies.length; ++i) {
      this.enemies[i].render();
    }
  }
}