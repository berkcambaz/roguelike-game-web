import { Vec2 } from "../core/vec2";
import { Player } from "./player";

export class World {
  public player!: Player;

  public start() {
    this.player = new Player(new Vec2(0, 0));
  }

  public tick() {
    this.player.tick();
  }

  public render(dt: number) {
    this.player.render(dt);
  }
}