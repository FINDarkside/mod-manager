<template >
  <div ref="virtualizedList" class="virtualized-list">
    <div v-for="item in itemPool" v-if="item.item" :key="item.id" :is="renderer" 
        :mod="item.item" class="virtualized-list-item" :style="{ transform: 'translateY(' + item.top + 'px)' }" >  
    </div>
    <div :style="{ height: spacer + 'px' }"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { EventEmitter } from 'events';
import debounce from '@/helpers/debounce';

@Component
export default class VirtualizedList extends Vue {
  @Prop(Object)
  dataSource!: DataSource;

  @Prop(Number)
  bufferItems!: number;
  @Prop(Number)
  itemHeight!: number;

  @Prop(Function)
  renderer!: Function;

  itemPool: PoolComponent[] = [];
  maxItems: number = 1000000;

  spacer = 0;

  y = 0;

  deadlock = false;

  async handleScroll(evt: Event) {
    if (this.deadlock) return;
    let y = (<any>this.$refs).virtualizedList.scrollTop;
    let h = (<any>this.$refs).virtualizedList.clientHeight;
    let itemPool = this.itemPool;

    let count = 0;

    while (true) {
      count++;
      if (count > this.itemPool.length) {
        this.deadlock = true;
        console.log('DEADLOCK');
        return;
      }

      let top = itemPool[0].top;
      let bottom = itemPool[itemPool.length - 1].top + this.itemHeight;
      let last = itemPool[itemPool.length - 1];

      const offset = y - top - (bottom - y - h);

      if (bottom < y || top > y + h) {
        // TODO: Prevent going over index
        let center = y + h / 2;
        let newY = center - (center % this.itemHeight);
        let index = newY / this.itemHeight;
        for (var i = 0; i < this.itemPool.length; i++) {
          itemPool[i].top = newY;
          itemPool[i].index = index++;
          itemPool[i].item = this.dataSource.getItemSync(index);
          newY += this.itemHeight;
        }
      } else if (offset > this.itemHeight && last.index < this.maxItems - 1) {
        const item = <PoolComponent>this.itemPool.shift();
        item.top = last.top + this.itemHeight;
        item.index = last.index + 1;
        item.item = this.dataSource.getItemSync(item.index);
        this.itemPool.push(item);
      } else if (-offset > this.itemHeight && itemPool[0].index > 0) {
        const item = <PoolComponent>this.itemPool.pop();
        item.top = itemPool[0].top - this.itemHeight;
        item.index = itemPool[0].index - 1;
        item.item = this.dataSource.getItemSync(item.index);
        this.itemPool.unshift(item);
      } else {
        break;
      }
    }
  }

  getItemForIndexDebounced = debounce(this.getItemForIndex, 100);

  async getItemForIndex(index: number, poolIndex: number) {
    const item = await this.dataSource.getItem(index);
    if (this.itemPool[poolIndex].index !== index) console.log('FAIL');
    this.itemPool[poolIndex].item = item;
  }

  async initialize() {
    let height = (<any>this.$refs).virtualizedList.clientHeight;
    let idCounter = 0;
    let poolSize = Math.ceil(height / this.itemHeight) + this.bufferItems;
    poolSize = Math.min(poolSize, this.maxItems);
    for (let i = 0; i < poolSize; i++) {
      this.itemPool.push({
        id: idCounter++,
        item: await this.dataSource.getItem(i),
        top: this.itemHeight * i,
        index: i,
      });
    }
    this.spacer = this.maxItems * this.itemHeight;
  }

  mounted() {
    (<any>this.$refs.virtualizedList).addEventListener('scroll', this.handleScroll, { passive: true });

    this.initialize();
  }
}

interface DataSource {
  getitemPoolBetween(min: number, max: number): Promise<object[]>;
  getItem(index: number): Promise<object>;
  getItemSync(index: number): object;
}

interface PoolComponent {
  id: number;
  item: object | null;
  top: number;
  index: number;
}
</script>

<style lang="stylus">
.virtualized-list {
  position: relative;
}

.virtualized-list-item {
  position: absolute !important;
  transition: transform 0s !important;
  width: 100%;
}
</style>
