import { game } from "..";

export enum INPUT_KEY {
  UP,
  DOWN,
  LEFT,
  RIGHT,
  ATTACK
}

export class Input {
  public mouse: { x: number, y: number };

  private keyToId: { [key: string]: INPUT_KEY };
  private keys: boolean[];

  constructor() {
    this.mouse = { x: 0, y: 0 };

    this.keyToId = {
      KeyW: INPUT_KEY.UP,
      KeyA: INPUT_KEY.DOWN,
      KeyS: INPUT_KEY.LEFT,
      KeyD: INPUT_KEY.RIGHT,
      Mouse1: INPUT_KEY.ATTACK,
    }

    this.keys = [];

    window.addEventListener("keydown", (ev) => { this.onKeyDown(ev) });
    window.addEventListener("keyup", (ev) => { this.onKeyUp(ev) });

    game.canvas.addEventListener("mousemove", (ev) => { this.onMouseMove(ev) });
    game.canvas.addEventListener("mousedown", (ev) => { this.onMouseDown(ev) });
    game.canvas.addEventListener("mouseup", (ev) => { this.onMouseUp(ev) });
    game.canvas.addEventListener("mouseleave", (ev) => { this.onMouseLeave(ev) });
  }

  public tick() {

  }

  public getKey(key: INPUT_KEY) {
    return !!this.keys[key];
  }

  private onKeyDown(ev: KeyboardEvent) {
    this.handleKey(ev.code, true);
  }

  private onKeyUp(ev: KeyboardEvent) {
    this.handleKey(ev.code, false);
  }

  private onMouseMove(ev: MouseEvent) {
    const bounds = game.canvas.getBoundingClientRect();
    this.mouse.x = game.camera.convertX(ev.pageX - bounds.left - scrollX);
    this.mouse.y = game.camera.convertY(ev.pageY - bounds.top - scrollY);
  }

  private onMouseDown(ev: MouseEvent) {
    this.handleKey("Mouse1", true);

    const bounds = game.canvas.getBoundingClientRect();
    this.mouse.x = game.camera.convertX(ev.pageX - bounds.left - scrollX);
    this.mouse.y = game.camera.convertY(ev.pageY - bounds.top - scrollY);
  }

  private onMouseUp(ev: MouseEvent) {
    this.handleKey("Mouse1", false);
  }

  private onMouseLeave(ev: MouseEvent) {
    this.handleKey("Mouse1", false);
  }

  private handleKey(key: string, pressed: boolean) {
    const keyId = this.keyToId[key];
    if (keyId !== undefined) this.keys[keyId] = pressed;
  }
}