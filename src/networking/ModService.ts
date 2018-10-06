import * as util from '@/helpers/util';
import { Mod } from '@/store/modules/mods/types';

function greatestMod(): Mod {
  return {
    id: 'asd',
    name: 'Relentless Night',
    shortDescription: 'The earth seems to be slowing. Days and nights are getting longer. Every long night gets colder and harsher than the last. How long will you survive?',
    smallImage: 'https://i.imgur.com/zbXe0SEg.png',
    authorId: 'ASD',
    authorName: 'ShieldHeart',
    downloads: 24050,
    likes: 2003,
  };
}

export async function getMods(): Promise<Mod[]> {
  await util.wait(1000);
  const mods: Mod[] = [];
  for (let i = 0; i < 20; i++) {
    const mod = greatestMod();
    mod.downloads = Math.round(Math.random() * 100000);
    mod.likes = Math.round(Math.random() * mod.downloads);
    mod.id = Math.round(Math.random() * 1000000).toString();
    mods.push(mod);
  }
  return mods;
}
