import { Vec2 } from "./vec2"

export class Physics {
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