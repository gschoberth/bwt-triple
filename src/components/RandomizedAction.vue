<script setup lang="js">
import { ref, onMounted, nextTick, useTemplateRef } from 'vue'
import { storeToRefs } from 'pinia'
import { useGameStore } from '@/stores/game'
import ButtonComponent from './ButtonComponent.vue'

const game = useGameStore()
const { actionContent } = storeToRefs(game)
const spawnArea = ref(null)
const actionRef = useTemplateRef('actionRef')

function setRandomPosition() {
  const containerWidth = spawnArea.value.clientWidth
  const containerHeight = spawnArea.value.clientHeight

  const btnWidth = actionRef.value.btnRef.offsetWidth
  const btnHeight = actionRef.value.btnRef.offsetHeight

  const maxX = containerWidth - btnWidth
  const maxY = containerHeight - btnHeight

  nextTick(() => {})

  actionRef.value.btnRef.style.top = `${Math.floor(Math.random() * maxX)}px`
  actionRef.value.btnRef.style.left = `${Math.floor(Math.random() * maxY)}px`
}

onMounted(() => {
  // actionRef.value.btnRef.style.bottom = '10%'
  // setRandomPosition()
})
</script>

<template>
  <div ref="spawnArea" class="spawn-container">
    <ButtonComponent
      ref="actionRef"
      :callback="game.calculateGoal"
      :content="actionContent"
    ></ButtonComponent>
  </div>
</template>

<style lang="scss" scoped>
.spawn-container {
  position: fixed;
  // background-color: orange;
  width: 100%;
  height: 50%;
  bottom: 0;
  left: 0;
  z-index: 999;
}
</style>
