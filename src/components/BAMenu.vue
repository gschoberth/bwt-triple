<script setup>
import { defineEmits } from "vue";
import { storeToRefs } from "pinia";
import { useGameStore } from "@/stores/game";
import { useTrackerStore } from "@/stores/tracker";
import { onClickOutside } from "@vueuse/core";
import { useTemplateRef } from "vue";

const { resetAfterNoInteraction } = storeToRefs(useTrackerStore());
const { gameType, maxActionDelay } = storeToRefs(useGameStore());

const emit = defineEmits(["ba-close"]);
const target = useTemplateRef("target");

const handleClick = () => {
  emit("ba-close");
};

onClickOutside(target, () => handleClick);
</script>

<template>
  <div class="overlay"></div>
  <div class="ba-wrapper" ref="target">
    <div class="input-wrapper">
      <label for="game-type">Choose game type:</label>
      <select name="game-type" v-model="gameType">
        <option value="soccer" selected>Soccer</option>
        <option value="football">Football</option>
        <option value="baseball" disabled>Baseball</option>
        <option value="hockey" disabled>Hockey</option>
      </select>
    </div>
    <div class="input-wrapper">
      <label for="timeout-delay">Reset Timeout Delay (seconds): </label>
      <input
        name="timeout-delay"
        type="number"
        v-model="resetAfterNoInteraction"
      />
    </div>
    <div class="input-wrapper">
      <label for="user-delay">Range Max Before Player Action (seconds):</label>
      <input type="number" v-model="maxActionDelay" name="user-delay" />
    </div>
    <div class="btn-close">
      <button @click="handleClick">Close</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ba-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
  padding: 32px 16px;
  background-color: darkslategray;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 24px;

  &:after {
    content: "";
  }
}

.input-wrapper {
  display: flex;
  justify-content: space-between;
  gap: 16px;

  label {
    font-weight: bold;
  }
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  // transform: translate(-50%, -50%);
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
}

.btn-close {
  margin-top: 32px;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  button {
    padding: 8px 12px;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 18px;
  }
}
</style>
