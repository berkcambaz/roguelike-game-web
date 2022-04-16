import { Vec2 } from "../core/vec2";
import { Player } from "./player";

export class World {
  public player!: Player;

  public start() {
    this.player = new Player(new Vec2(0, 0), new Vec2(64, 64));
  }

  public tick() {
    this.player.tick();
  }

  public render() {
    this.player.render();
  }
}