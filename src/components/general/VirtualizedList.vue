<template >
  <div ref="virtualizedList" class="virtualized-list">
      <div v-for="item in elementPool" :key="item.id" 
        class="virtualized-list-item" :style="{ transform: 'translateY(' + item.top + 'px)' }" >
          <div v-if="item.item" :is="renderer" :mod="item.item" />
          <div v-else>asdasd</div>
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
  @Prop(Object)
  dataSourceParams!: DataSource;

  @Prop(Number)
  bufferedElements!: number;
  @Prop(Number)
  elementHeight!: number;

  @Prop(Number)
  maxBatchesInMemory!: number;
  @Prop(Number)
  batchSize!: number;

  @Prop(Function)
  renderer!: Function;

  elementPool: PoolComponent[] = [];
  //batches = new Map<number, object[]>();
  batches: ItemBatch[] = [];
  maxItems: number = 100000;

  spacer = 0;

  y = 0;

  deadlock = false;

  handleScroll(evt: Event) {
    if (this.deadlock) return;
    let y = (<any>this.$refs).virtualizedList.scrollTop;
    let h = (<any>this.$refs).virtualizedList.clientHeight;
    let elementPool = this.elementPool;

    let count = 0;

    while (true) {
      count++;
      if (count > this.elementPool.length) {
        this.deadlock = true;
        console.log('DEADLOCK');
        return;
      }

      const top = elementPool[0].top;
      const bottom = elementPool[elementPool.length - 1].top + this.elementHeight;
      const last = elementPool[elementPool.length - 1];

      const offset = y - top - (bottom - y - h);

      if (bottom < y || top > y + h) {
        const center = y + h / 2;
        let newY = center - (this.elementHeight * this.elementPool.length) / 2;
        newY = newY - (newY % this.elementHeight);
        let index = newY / this.elementHeight;
        // Prevent trying to show items outside of [0, this.maxItems[
        if (index < 0) {
          index = 0;
        } else if (index + elementPool.length >= this.maxItems) {
          index = this.maxItems - elementPool.length;
        }
        for (var i = 0; i < this.elementPool.length; i++) {
          elementPool[i].top = index * this.elementHeight;
          elementPool[i].item = this.getItem(index);
          elementPool[i].index = index++;
          newY += this.elementHeight;
        }
        break;
      } else if (offset > this.elementHeight && last.index < this.maxItems - 1) {
        const element = <PoolComponent>this.elementPool.shift();
        element.top = last.top + this.elementHeight;
        element.index = last.index + 1;
        element.item = this.getItem(element.index);
        this.elementPool.push(element);
      } else if (-offset > this.elementHeight && elementPool[0].index > 0) {
        const element = <PoolComponent>this.elementPool.pop();
        element.top = elementPool[0].top - this.elementHeight;
        element.index = elementPool[0].index - 1;
        element.item = this.getItem(element.index);
        this.elementPool.unshift(element);
      } else {
        break;
      }
    }
    this.updateDataDebounced();
  }

  getItem(index: number) {
    const batchIndex = Math.floor(index / this.batchSize);
    const itemIndex = index % this.batchSize;
    const batchId = batchIndex - this.batches[0].batchIndex;
    if (this.batches[batchId]) return this.batches[batchId].items[itemIndex];
    return null;
  }

  updateDataDebounced = debounce(this.updateData, 100);

  updateData() {
    const elementPool = this.elementPool;

    const totalBatches = Math.floor(this.maxItems / this.batchSize) + 1;
    const topBatchId = Math.max(Math.floor(elementPool[0].index / this.batchSize) - 1, 0);
    const bottomBatchId = Math.min(
      Math.floor(elementPool[elementPool.length - 1].index / this.batchSize),
      totalBatches - 1
    );

    let currentTopBatch = this.batches[0].batchIndex;
    let currentBottomBatch = this.batches[this.batches.length - 1].batchIndex;
    if (topBatchId > currentBottomBatch + 1 || bottomBatchId < currentTopBatch - 1) {
      console.log('REMOVE ALL');
      this.batches.length = 0;
      currentTopBatch = -1;
      currentBottomBatch = -1;
    }
    for (let i = topBatchId - 1; i <= bottomBatchId + 1; i++) {
      if (i >= 0 && i < totalBatches && (i < currentTopBatch || i > currentBottomBatch)) {
        console.log('Getting batch ' + i);

        let batch: ItemBatch = { batchIndex: i, items: [] };
        if (i < currentTopBatch) this.batches.unshift(batch);
        else this.batches.push(batch);

        this.dataSource
          .getBatch(i * this.batchSize, (i + 1) * this.batchSize, this.dataSourceParams)
          .then(res => {
            console.log('Got batch ' + batch.batchIndex);
            batch.items = res;
            this.applyBatch(batch);
          })
          .catch(err => console.error(err));
      }
    }
    this.trimBatches();
  }

  trimBatches() {
    const elementPool = this.elementPool;
    const topBatchId = Math.max(Math.floor(elementPool[0].index / this.batchSize) - 1, 0);
    const totalBatches = Math.floor(this.maxItems / this.batchSize) + 1;
    const bottomBatchId = Math.min(
      Math.floor(elementPool[elementPool.length - 1].index / this.batchSize),
      totalBatches - 1
    );

    if (this.batches.length > this.maxBatchesInMemory) {
      const midBatch = topBatchId + Math.round((topBatchId - bottomBatchId) / 2);
      const halfBatches = Math.ceil(this.maxBatchesInMemory / 2);

      let topBatches = midBatch - this.batches[0].batchIndex + 1;
      let bottomBatches = this.batches[this.batches.length - 1].batchIndex - midBatch;

      while (this.batches.length > this.maxBatchesInMemory) {
        if (bottomBatches > topBatches) {
          this.batches.pop();
          bottomBatches--;
        } else {
          this.batches.shift();
          topBatches--;
        }
      }
      console.log('CLEANING ' + this.batches.length);
    }
  }

  applyBatch(batch: ItemBatch) {
    const topElement = this.elementPool[0];
    const lastElement = this.elementPool[this.elementPool.length - 1];

    const batchTop = batch.batchIndex * this.batchSize;
    const batchBottom = (batch.batchIndex + 1) * this.batchSize - 1;
    /*for (let i = batchTop; i < batchBottom; i++) {
      if (i >= topElement.index && i <= lastElement.index) {
        console.log('APPLY ' + i);
        this.elementPool[i].item = batch.items[i - batchTop];
      }
    }*/
    if (batchTop > lastElement.index || batchBottom < topElement.index) return;
    const diff = batchTop - topElement.index;

    for (let i = Math.max(diff, 0); i < this.elementPool.length && i < this.batchSize - diff; i++) {
      try {
        this.elementPool[i].item = batch.items[i - diff];
      } catch (err) {
        debugger;
      }
    }
    /*for (let i = diff; i < this.batchSize && i < this.elementPool.length; i++) {
      
    }*/
  }

  async initialize() {
    let height = (<any>this.$refs).virtualizedList.clientHeight;
    let idCounter = 1;
    let poolSize = this.bufferedElements;
    poolSize = Math.min(poolSize, this.maxItems);
    for (let i = 0; i < poolSize; i++) {
      this.elementPool.push({
        id: idCounter++,
        item: null,
        top: this.elementHeight * i,
        index: i,
      });
    }
    this.batches.push({ batchIndex: Number.MAX_VALUE, items: [] });
    this.updateData();
    this.spacer = this.maxItems * this.elementHeight;
  }

  mounted() {
    (<any>this.$refs.virtualizedList).addEventListener('scroll', this.handleScroll, { passive: true });

    this.initialize();
  }

  beforeDestroy() {
    // Probably not necessary
    (<any>this.$refs.virtualizedList).removeEventListener('scroll', this.handleScroll);
  }
}

interface DataSource {
  getBatch(min: number, max: number, params: object): Promise<object[]>;
  getItem(index: number): Promise<object>;
  getItemSync(index: number): object;
}

interface PoolComponent {
  id: number;
  item: object | null;
  top: number;
  index: number;
}

interface ItemBatch {
  batchIndex: number;
  items: object[];
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
