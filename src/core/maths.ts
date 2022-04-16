import { Vec2 } from "./vec2";

export class Maths {
  public static clamp(value: number, min: number, max: number) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
  }

  public static interp(a: number, b: number, amount: number) {
    return (b - a) * amount + a;
  }

  public static towards(current: Vec2, target: Vec2, amount: number) {
    const diff = { x: target.x - current.x, y: target.y - current.y };
    const magnitude = Math.sqrt(diff.x * diff.x + diff.y * diff.y);
    if (magnitude <= amount || magnitude === 0) return target.clone();
    return new Vec2(current.x + diff.x / magnitude * amount, current.y + diff.y / magnitude * amount);
  }
}