<script lang="js" setup>
import { onMounted, ref, watch } from "vue";
import { EventType, Layout, Rive } from "@rive-app/canvas";
import { useGameStore } from "@/stores/game";
import { storeToRefs } from "pinia";

const game = useGameStore();
const { currAttempt, showScore } = storeToRefs(game);

const canvas = ref([]);
let inputs = null;

// Watch for events coming from Rive
// Move this to it's own module on refactor

// OR rebuild component as a slotted and pass
// event data and inputs to child?

// OR build a generic component that takes in a
// callback that takes the rive event data and passes it
// to a dedicated script for each animation / functionality

function onRiveEvent(event) {
  const eventData = event.data;

  console.log(eventData.name);

  if (eventData.name === "resetEvent") {
    game.resetGame();
  } else if (eventData.name === "nextEvent") {
    // const attemptTrigger = inputs.find((i) => i.name === 'attempt')
    // // attemptTrigger.value = currAttempt.value
    // attemptTrigger.value = game.currAttempt
    game.userVictory = false;
    game.startNewGame();
    game.showScore = false;
  }
}

onMounted(() => {
  const r = new Rive({
    src: `rive/scoreboard.riv`,
    canvas: canvas.value,
    autoplay: true,
    stateMachines: "default",

    layout: new Layout({}),
    onLoad: () => {
      r.resizeDrawingSurfaceToCanvas();
      const i = r.stateMachineInputs("default");
      inputs = i;

      const scoreTrigger = inputs.find((i) => i.name === "score");
      const attemptTrigger = inputs.find((i) => i.name === "attempt");
      const displayTrigger = inputs.find((i) => i.name === "display");

      scoreTrigger.value = game.currScore;
      attemptTrigger.value = game.currAttempt;
      displayTrigger.value = false;
    },
  });

  r.on(EventType.RiveEvent, onRiveEvent);
});

watch(
  () => showScore.value,
  (newVal) => {
    const scoreTrigger = inputs.find((i) => i.name === "score");
    const attemptTrigger = inputs.find((i) => i.name === "attempt");
    const displayTrigger = inputs.find((i) => i.name === "display");
    if (newVal) {
      attemptTrigger.value = game.currAttempt;
      scoreTrigger.value = game.currScore;
      displayTrigger.value = true;
    } else {
      displayTrigger.value = false;
    }
  }
);

game.$onAction(({ name }) => {
  if (name === "resetGame") {
    const attemptTrigger = inputs.find((i) => i.name === "attempt");
    const displayTrigger = inputs.find((i) => i.name === "display");

    attemptTrigger.value = 0;
    displayTrigger.value = false;
  }
});
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
