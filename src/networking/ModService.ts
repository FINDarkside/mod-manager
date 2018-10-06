import * as util from '@/helpers/util';
import { Mod } from '@/store/modules/mods/types';
import loremIpsum from 'lorem-ipsum';

const mods: Mod[] = [];

for (let i = 0; i < 200; i++) {
  const mod = createMod();
  mod.downloads = Math.round(Math.random() * 100000);
  mod.likes = Math.round(Math.random() * mod.downloads);
  mod.id = Math.round(Math.random() * 1000000).toString();
  mods.push(mod);
}

function createMod(): Mod {
  const downloads = util.nextInt(0, 50000);
  return {
    id: 'asd',
    name: loremIpsum({ count: util.nextInt(1, 5), units: 'words' }),
    shortDescription: loremIpsum({ count: util.nextInt(10, 40), units: 'words' }),
    smallImage: 'https://i.imgur.com/zbXe0SEg.png',
    authorId: 'ASD',
    authorName: loremIpsum({ count: util.nextInt(1, 2), units: 'words' }),
    downloads: downloads,
    likes: util.nextInt(0, downloads),
  };
}

export async function getMods(): Promise<Mod[]> {
  await util.wait(1000);

  return mods;
}

export async function searchMods(
  searchString: string,
  sortMode: SortMode,
  sortDirecton: SortDirection
): Promise<Mod[]> {
  await util.wait(1000);
  console.log('Sort by ' + sortMode);
  let result = mods;
  if (searchString) {
    result = result.filter(
      mod => mod.name.indexOf(searchString) !== -1 || mod.shortDescription.indexOf(searchString) !== -1
    );
  }
  let sortBy = '';
  if (sortMode === SortMode.Downloads) sortBy = 'downloads';
  else if (sortMode === SortMode.Likes) sortBy = 'likes';
  if (sortBy) {
    result.sort((a: any, b: any) => sortDirecton * (a[sortBy] > b[sortBy] ? 1 : -1));
  }

  return result;
}

export enum SortDirection {
  Ascending = 1,
  Descending = -1,
}

export enum SortMode {
  LastModified = 'lastModified',
  Likes = 'likes',
  Downloads = 'downloads',
}
