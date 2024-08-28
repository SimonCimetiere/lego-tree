<script lang="ts">
import parseCSV from "./parseService.js";
export default {
  data() {
    return {
      sets: [],
      parts: [],
      inventories: [],
      showSetInventory: {}
    }
  },
  methods: {
    parseSets() {
      parseCSV('dataset/sets.csv').then(d => {
        this.sets = d
        this.sets.forEach(set => {
          this.showSetInventory[set.set_id] = 'none'
        });
      })
    },
    parseParts() {
      parseCSV('dataset/parts.csv').then(d => {
        this.parts = d
        console.log(d)
      })
    },
    parseInventories() {
      parseCSV('dataset/Inventory.csv').then(d => {
        this.inventories = d
        console.log(d)
      })
    },
    getInventories(setId){
      return this.inventories.filter( i => i.set_id === setId)
    },
    getParts(partId){
      return this.parts.filter( p => p.part_num === partId)
    },
    toggleShowInventory(set_id) {
      console.log(this.showSetInventory[set_id])
      this.showSetInventory[set_id] === 'none'? this.showSetInventory[set_id] = 'block' : this.showSetInventory[set_id] = 'none' 
    }
  },
  mounted() {
    this.parseSets()
    this.parseParts()
    this.parseInventories()
  }
}

</script>
<template>
  <div>
    <div v-for="set in sets">
      <div>
        <span v-on:click="toggleShowInventory(set.set_id)">{{ set._name }}</span>
        <div :style="{display: this.showSetInventory[set.set_id]}" class="treeStyle" v-for="inventory in this.getInventories(set.set_id)">
          <span :style="{color: inventory.color}">{{inventory._name}}</span>
          <div class="treeStyle" v-for="part in this.getParts(inventory.part_num)">
            <span>{{ part._name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.treeStyle {
  border-left: 1px solid white;
  margin-left: 20px;
  padding-left: 10px;
}
</style>
