export class Vec2 {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public clone() {
    return new Vec2(this.x, this.y);
  }
}