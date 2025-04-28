<script lang="js" setup>
import { defineProps, useTemplateRef } from 'vue'

const props = defineProps(['callback', 'content', 'isCentered'])
const btnRef = useTemplateRef('btnRef')

defineExpose({
  btnRef,
})
</script>

<template>
  <button ref="btnRef" class="btn" :class="{ centered: props.isCentered }" @click="props.callback">
    {{ content }}
  </button>
</template>

<style lang="scss" scoped>
.btn {
  position: fixed;
  padding: 18px 24px;
  border-radius: 8px;
  outline: none;
  font-weight: bold;
  // max-width: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-size: 64px;
  background-color: purple;
  color: white;
}

.centered {
  left: 50%;
  bottom: 10%;
  transform: translateX(-50%);
  z-index: 999;
}
</style>
