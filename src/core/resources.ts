import HUMAN from "../../res/sprites/human.png";
import HEART from "../../res/sprites/heart.png";
import HEART_EMPTY from "../../res/sprites/heart_empty.png";
import HEART_HALF from "../../res/sprites/heart_half.png";
import HEART_FULL from "../../res/sprites/heart_full.png";

const sprites = {
  HUMAN,
  HEART,
  HEART_EMPTY,
  HEART_HALF,
  HEART_FULL,
}

type SPRITES = { [key in keyof typeof sprites]: HTMLImageElement };
type URL_SPRITES = { [key in keyof typeof sprites]: string };

export class Resources {
  public readonly SPRITES: SPRITES = {} as SPRITES;
  public readonly URL_SPRITES: URL_SPRITES = {} as URL_SPRITES;

  public loadSprites() {
    return new Promise((resolve, reject) => {
      const toLoad = Object.keys(sprites).length;
      let loaded = 0;

      for (const key in sprites) {
        const img = new Image();
        img.onload = () => { if (++loaded === toLoad) resolve(0); }
        img.src = sprites[key as keyof typeof sprites];
        this.SPRITES[key as keyof typeof sprites] = img;
        this.URL_SPRITES[key as keyof typeof sprites] = sprites[key as keyof typeof sprites] as string;
      }
    })
  }
}