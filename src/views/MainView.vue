<script setup lang="js">
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { useGameStore } from '@/stores/game'

const game = useGameStore()

const showToast = ref(false)
const toastMessage = ref('Toast Message')
const startGameTimeout = ref(null)

onBeforeUnmount(() => {
  clearTimeout(startGameTimeout)
})

onMounted(() => {})

function isGameState(state) {
  return game.gameState === state
}

// Move min max settings to a game settings store

function startNewGame() {
  game.gameStarted = true
  game.gameState = 1
  const w = Math.floor(Math.random() * (5 - 1 + 1)) + 1

  startGameTimeout.value = setTimeout(() => {
    game.gameState = 2
    game.initialTime = Date.now()
  }, w * 1000)
}

function evalKick() {
  game.gameState = 3

  game.kickTime = Date.now()
  game.calculateKick()

  toastMessage.value = game.userVictory ? 'GoAL!' : 'SAVED!'
  showToast.value = true

  setTimeout(() => {
    resetGame()
  }, 10 * 1000)
}

function resetGame() {
  showToast.value = false
  game.resetGame()
}
</script>

<template>
  <div class="container">
    <div class="game-toast" v-if="showToast">{{ toastMessage }}</div>
    <div class="ui-wrapper">
      <button class="btn" v-if="!game.gameStarted" @click="startNewGame">Start</button>
      <button class="btn" v-else-if="isGameState(2)" @click="evalKick">Kick</button>
      <button class="btn" v-else-if="isGameState(3)" @click="resetGame">Replay</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100dvw;
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.game-toast {
  margin: 128px 0;
  font-size: 96px;
  color: orangered;
  text-transform: capitalize;
}

.btn {
  background-color: lightgreen;
  font-size: 64px;
  font-weight: bold;
  padding: 24px 32px;
  border-radius: 8px;
}
</style>
