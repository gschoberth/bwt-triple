<script lang="js" setup>
import { onMounted, ref, defineProps } from 'vue'
import { Layout, Rive } from '@rive-app/canvas'

const props = defineProps(['path'])
const canvas = ref([])

onMounted(() => {
  const r = new Rive({
    src: `rive/${props.path}.riv`,
    canvas: canvas.value,
    autoplay: true,
    stateMachines: 'default',

    layout: new Layout({}),
    onLoad: () => {
      r.resizeDrawingSurfaceToCanvas()
    },
  })
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
