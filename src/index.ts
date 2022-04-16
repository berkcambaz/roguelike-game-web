import { Game } from "./game/game";
import "./index.scss";

export const game = new Game();

window.addEventListener("load", () => { game.run() });