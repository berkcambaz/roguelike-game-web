import { Vec2 } from "./vec2"

export class Physics {
  public static box_box(pos1: Vec2, size1: Vec2, pos2: Vec2, size2: Vec2) {
    return pos1.x < pos2.x + size2.x
      && pos1.x + size1.x > pos2.x
      && pos1.y < pos2.y + size2.y
      && pos1.y + size1.y > pos2.y;
  }

  public static box_circle(boxPos: Vec2, boxSize: Vec2, circlePos: Vec2, circleRadius: number) {
    let hw = boxSize.x / 2;
    let hh = boxSize.y / 2;
    let distX = Math.abs(circlePos.x - (boxPos.x + boxSize.x / 2));
    let distY = Math.abs(circlePos.y - (boxPos.y + boxSize.y / 2));

    if (distX > hw + circleRadius || distY > hh + circleRadius) {
      return false;
    }

    if (distX <= hw || distY <= hh) {
      return true;
    }

    let x = distX - hw;
    let y = distY - hh;
    return x * x + y * y <= circleRadius * circleRadius;
  }
}