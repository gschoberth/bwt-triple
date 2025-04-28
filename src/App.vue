<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useGameStore } from './stores/game'
import { useTrackerStore } from './stores/tracker'
import GameView from './views/GameView.vue'
import BAMenu from './components/BAMenu.vue'

const tracker = useTrackerStore()
const game = useGameStore()

const showBA = ref(false)

function toggleBAMenu() {
  showBA.value = !showBA.value
}

onMounted(() => {
  // tracker.updateLastInteraction()
})

onBeforeUnmount(() => {
  game.resetGame()
})
</script>

<template>
  <div class="ba-btn" @dblclick="toggleBAMenu"></div>
  <BAMenu @ba-close="toggleBAMenu" v-if="showBA"></BAMenu>
  <div @click="tracker.updateLastInteraction">
    <GameView></GameView>
  </div>
</template>

<style lang="scss">
html,
body {
  background-color: black;
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}
</style>

<style scoped>
.ba-btn {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 150px;
  height: 150px;
  background-color: orange;
  /* visibility: hidden; */
  opacity: 0;
  outline: none;
  border: none;
  z-index: 10000;
}
</style>
