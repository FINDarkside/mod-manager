import * as util from '@/helpers/util';
import { Mod } from '@/store/modules/mods/types';
import loremIpsum from 'lorem-ipsum';

const mods: Mod[] = [];
let count = 0;
for (let i = 0; i < 1000; i++) {
  const mod = createMod(i);
  mods.push(mod);
}

function createMod(index :number): Mod {
  const downloads = util.nextInt(0, 50000);
  return {
    id: index.toString(),
    name: 'Mod number ' + (index + 1),
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
  await util.wait(10000);
  console.time('searchMods');

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
  console.timeEnd('searchMods');

  return result;
}

export async function getModBatch(
  minIndex: number,
  maxIndex: number,
  params: {
    searchString: string;
    sortMode: SortMode;
    sortDirecton: SortDirection;
  }
): Promise<Mod[]> {
  await util.wait(700);
  /*console.time('searchMods');

  let result = mods;
  if (params.searchString) {
    result = result.filter(
      mod => mod.name.indexOf(params.searchString) !== -1 || mod.shortDescription.indexOf(params.searchString) !== -1
    );
  }
  let sortBy = '';
  if (params.sortMode === SortMode.Downloads) sortBy = 'downloads';
  else if (params.sortMode === SortMode.Likes) sortBy = 'likes';
  if (sortBy) {
    result.sort((a: any, b: any) => params.sortDirecton * (a[sortBy] > b[sortBy] ? 1 : -1));
  }*/
  const result = [];
  for(let i = minIndex; i < maxIndex; i++){
    result.push(createMod(i));
  }
  return result;
}

export async function getMod(index: number) {
  const mod = createMod(index);
  return mod;
}

export function getModSync(index: number) {
  const mod = createMod(index);
  return mod;
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
