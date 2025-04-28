import { ref } from "vue";
import { defineStore } from "pinia";

export const useGameStore = defineStore("game", () => {
  const gameType = ref("soccer");

  const maxAttempts = ref(3);
  const currAttempt = ref(0);
  const currScore = ref(0);

  const maxActionDelay = ref(5);
  const actionButtonDelay = ref(5); // The delay before the go button is active
  const maxActionTime = ref(5); // Allow the user up to five seconds before considering the goal saved

  const initialTime = ref(Date.now()); // Start time of the game after go
  const actionTime = ref(Date.now()); // Time of player hitting action button

  const kickCurveOption = ref("easeinout"); // Possible way of calculating chance of goal
  const userVictory = ref(false); // User success or failure state.

  const showIntro = ref(true);
  const showAction = ref(false);
  const showOutcome = ref(false);
  const showScore = ref(false);

  // Don't Reset
  const actionContent = ref("Kick");

  // Timeouts
  const enableActionTimeout = ref(null);

  // Game Options Don't Reset
  // Move options to own store if there are enough
  const useRandomizedAction = ref(false);

  function updateGameType(newVal) {
    gameType.value = newVal;
  }

  function startNewGame() {
    currAttempt.value += 1;
    showIntro.value = false;
    const delay =
      Math.floor(Math.random() * (maxActionDelay.value - 1 + 1)) + 1;
    console.log("Delay:", delay);
    enableActionTimeout.value = setTimeout(() => {
      showAction.value = true;
      initialTime.value = Date.now();
    }, delay * 1000);
  }

  function calculateGoal() {
    showAction.value = false;
    actionTime.value = Date.now();
    const time = Math.max(
      Math.abs(actionTime.value - initialTime.value) / 1000,
      0
    );

    const minChance = evalBezierCurve(time);

    const randomizedScoreChance = Math.random() * maxActionTime.value;
    userVictory.value = randomizedScoreChance >= minChance;
    showOutcome.value = true;

    if (userVictory.value) {
      currScore.value = Math.min(currScore.value + 1, 3);
    }

    // Debugging
    console.log("Initial:", initialTime.value, "Kick:", actionTime.value);
    console.log("Actual Time:", time);
    console.log("Minimum Chance:", minChance);
    console.log("Random Chance:", randomizedScoreChance);
    console.log("User Victory Status", userVictory.value);
    console.log("Current Score", currScore.value);
    console.log("Current Attempt", currAttempt.value);
  }

  // Move to external?
  function evalBezierCurve(t) {
    const bezier = (t, p1, p2, initial = 0, final = 1) =>
      (1 - t) ** 3 * initial +
      3 * (1 - t) ** 2 * t * p1 +
      3 * (1 - t) * t ** 2 * p2 +
      t ** 3 * final;

    const curves = {
      easeinout: [0.42, 0.58],
    };

    const points = curves[kickCurveOption.value];
    const valueAtT = bezier(t, points[0], points[1]);

    return valueAtT;
  }

  function resetGame() {
    showIntro.value = true;
    showAction.value = false;
    showOutcome.value = false;
    showScore.value = false;
    actionTime.value = Date.now();
    initialTime.value = Date.now();
    userVictory.value = false;
    currScore.value = 0;
    currAttempt.value = 0;
    clearTimeout(enableActionTimeout);
  }

  return {
    showIntro,
    showAction,
    showOutcome,
    resetGame,
    calculateGoal,
    actionButtonDelay,
    initialTime,
    actionTime,
    kickCurveOption,
    userVictory,
    startNewGame,
    useRandomizedAction,
    actionContent,
    updateGameType,
    gameType,
    maxActionDelay,
    maxAttempts,
    currAttempt,
    currScore,
    showScore,
  };
});
