<script setup lang="js">
import { onMounted, computed, watch, nextTick, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useGameStore } from '@/stores/game'
// import RandomizedAction from '@/components/RandomizedAction.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'

import Title from '@/components/TitleRive.vue'
import Scoreboard from '@/components/ScoreboardRive.vue'
import Scene from '@/components/SceneRive.vue'

const scenes = {
  soccer: 'soccer_field_v3',
  football: 'football',
}

const game = useGameStore()
const { showAction, showScore, showIntro, actionContent, gameType } = storeToRefs(game)

const showScene = ref(true)

watch(
  () => gameType.value,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      showScene.value = false
      nextTick(() => {
        showScene.value = true
      })
    }
  },
)

const currScene = computed(() => {
  return scenes[gameType.value]
})

onMounted(() => {
  actionContent.value = 'Kick'
})
</script>

<template>
  <div class="intro-wrapper" v-if="showIntro">
    {{ useRandomized }}
    <div class="overlay"></div>
    <div class="title-wrapper">
      <div class="title-banner">
        <Title :path="'title'"> </Title>
      </div>
    </div>
  </div>

  <ButtonComponent
    class="btn-center"
    :isCentered="true"
    :callback="game.startNewGame"
    :content="'START'"
    v-if="showIntro"
  ></ButtonComponent>

  <!-- <RandomizedAction v-if="showAction && useRandomizedAction"></RandomizedAction> -->
  <ButtonComponent
    class="btn-center"
    :isCentered="true"
    :callback="game.calculateGoal"
    :content="actionContent"
    v-else-if="showAction"
  ></ButtonComponent>
  <div class="action-text" v-if="showAction">GO!</div>
  <div class="visuals-wrapper" v-if="showScene">
    <Scene :path="currScene"></Scene>
  </div>
  <div class="outcome-wrapper">
    <Scoreboard></Scoreboard>
  </div>
  <!-- <RandomizedAction></RandomizedAction> -->
</template>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
  background-color: gray;
  opacity: 0.5;
}

.title-wrapper {
  position: fixed;
  inset: 0 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;

  .title-banner {
    display: flex;
    justify-content: center;
    align-items: center;
    // background-color: white;
    height: 500px;
    width: 100%;

    position: relative;

    // padding: 32px 64px;
  }
}

.visuals-wrapper {
  position: fixed;
  inset: 0 0 0 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.outcome-wrapper {
  position: fixed;
  width: 500px;
  height: 200px;
  z-index: 1000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.action-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  font-size: 96px;
  font-weight: bold;
  color: yellow;
}

// .outcome-wrapper {
//   position: fixed;
//   inset: 0 0 0 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 2;

//   .outcome {
//     font-size: 128px;
//     color: white;
//     font-weight: bold;
//   }
// }
</style>
