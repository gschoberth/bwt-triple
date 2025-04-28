import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useGameStore } from './game'

export const useTrackerStore = defineStore('tracker', () => {
  const resetAfterNoInteraction = ref(20)
  const lastInteractionTime = ref(0)

  const resetTimeout = ref(null)

  function updateLastInteraction() {
    const game = useGameStore()

    lastInteractionTime.value = Date.now()
    clearTimeout(resetTimeout.value)

    resetTimeout.value = setTimeout(() => {
      game.resetGame()
    }, resetAfterNoInteraction.value * 1000)
  }

  return { updateLastInteraction, resetAfterNoInteraction, lastInteractionTime }
})
