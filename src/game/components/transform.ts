import { game } from "../..";
import { Maths } from "../../core/maths";
import { Vec2 } from "../../core/vec2";

export class Transform {
  public pos: Vec2;
  public oldPos: Vec2;
  public size: Vec2;

  constructor(pos: Vec2, size: Vec2) {
    this.pos = pos;
    this.oldPos = pos;
    this.size = size;
  }

  public tick() {
    this.oldPos = this.pos.clone();
  }

  public getX() {
    return Maths.interp(this.oldPos.x, this.pos.x, game.dt);
  }

  public getY() {
    return Maths.interp(this.oldPos.y, this.pos.y, game.dt);
  }
}