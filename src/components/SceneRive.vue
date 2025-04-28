<script lang="js" setup>
import { onMounted, ref, defineProps, watch } from 'vue'
import { EventType, Layout, Rive } from '@rive-app/canvas'
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'

const game = useGameStore()
const { showOutcome, showScore, currAttempt } = storeToRefs(game)

const props = defineProps(['path'])
const canvas = ref([])

let inputs = null

function onRiveEvent(event) {
  const eventData = event.data
  if (eventData.name === 'resultDisplayed') {
    showOutcome.value = false
    showScore.value = true
  }
}

onMounted(() => {
  const r = new Rive({
    src: `rive/${props.path}.riv`,
    canvas: canvas.value,
    autoplay: true,
    stateMachines: 'default',

    layout: new Layout({}),
    onLoad: () => {
      r.resizeDrawingSurfaceToCanvas()
      const i = r.stateMachineInputs('default')
      inputs = i
    },
  })

  r.on(EventType.RiveEvent, onRiveEvent)
})

watch(
  () => currAttempt.value,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      const victoryTrigger = inputs.find((i) => i.name === 'victory')
      const kickTrigger = inputs.find((i) => i.name === 'kick')
      victoryTrigger.value = game.userVictory
      kickTrigger.value = false
    }
  },
)

watch(
  () => showOutcome.value,
  (newVal) => {
    if (newVal) {
      const victoryTrigger = inputs.find((i) => i.name === 'victory')
      const kickTrigger = inputs.find((i) => i.name === 'kick')

      victoryTrigger.value = game.userVictory
      kickTrigger.value = true
    }
  },
)

game.$onAction(({ name }) => {
  if (name === 'resetGame') {
    const victoryTrigger = inputs.find((i) => i.name === 'victory')
    const kickTrigger = inputs.find((i) => i.name === 'kick')

    victoryTrigger.value = false
    kickTrigger.value = false
  }
})
</script>

<template>
  <canvas class="rive-canvas" ref="canvas" width="250" height="250"></canvas>
</template>

<style lang="scss" scoped>
.rive-canvas {
  width: 100%;
  height: 100%;
}
</style>
