<template>
  <div v-if="isOpen" class="questionnaire-overlay" @click.self="closeQuestionnaire">
    <div class="questionnaire-modal">
      <button aria-label="Закрити" class="close-btn" @click="closeQuestionnaire">
        <CloseIcon />
      </button>

      <!-- Gender Selection Screen -->
      <div v-if="currentStep === 'gender'" class="step-content">
        <h2 class="step-title">Оберіть, для кого шукаємо девайс</h2>
        <div class="gender-options">
          <AccentBtn
            v-for="option in genderOptions"
            :key="option.id"
            class="questionnaire-btn"
            @click="selectGender(option.id)"
          >
            {{ option.label }}
          </AccentBtn>
        </div>
      </div>

      <!-- Question Steps -->
      <div v-else-if="currentStep !== 'complete'" class="step-content">
        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%` }"
          />
        </div>

        <div class="step-header">
          <button v-if="currentQuestionIndex > 0" class="back-btn" @click="goBack">
            <BackIcon />
          </button>
          <span class="step-indicator"
            >{{ currentQuestionIndex + 1 }}/{{ currentQuestions.length }}</span
          >
        </div>

        <h3 class="question-title">{{ currentQuestion.text }}</h3>

        <div class="answers">
          <label
            v-for="answer in currentQuestion.answers"
            :key="answer.id"
            class="answer-label"
            :class="{
              selected: isAnswerSelected(answer.id),
              'multiple-select': currentQuestion.multipleSelect
            }"
          >
            <input
              :checked="
                currentQuestion.multipleSelect
                  ? (answers[currentQuestion.id] || []).includes(answer.id)
                  : answers[currentQuestion.id] === answer.id
              "
              :type="currentQuestion.multipleSelect ? 'checkbox' : 'radio'"
              :name="`question-${currentQuestionIndex}`"
              :value="answer.id"
              @change="handleAnswerChange($event, answer.id)"
            />
            <span class="answer-text">{{ answer.text }}</span>
          </label>
        </div>

        <AccentBtn class="questionnaire-btn" :disabled="!hasValidAnswer" @click="nextQuestion">
          {{ currentQuestionIndex === currentQuestions.length - 1 ? "Завершити" : "Далі" }}
        </AccentBtn>
      </div>

      <!-- Complete Screen -->
      <div v-else class="step-content complete-screen">
        <div class="success-icon">
          <SuccessIcon />
        </div>
        <h2 class="complete-title">Дякуємо за відповіді!</h2>
        <p class="complete-text">Ми підготували для вас персональні рекомендації</p>
        <AccentBtn class="questionnaire-btn" @click="goToProducts"
          >Переглянути рекомендації</AccentBtn
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import CloseIcon from "@/assets/icons/close-icon.svg";
import BackIcon from "@/assets/icons/angle-left.svg";
import SuccessIcon from "@/assets/icons/success.svg";
import AccentBtn from "~/components/shared/AccentBtn.vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["close"]);

const currentStep = ref("gender");
const selectedGender = ref("");
const currentQuestionIndex = ref(0);
const answers = ref({});

const genderOptions = [
  { id: "women", label: "Для неї" },
  { id: "men", label: "Для нього" },
  { id: "couples", label: "Для пар" }
];

const questionsData = {
  women: [
    {
      id: "experience",
      text: "Чи досліджували раніше своє тіло за допомогою секс іграшок?",
      answers: [
        { id: "first_toy_women", text: "Ніяк не можу наважитись" },
        { id: "inactive_user_women", text: "Не активний користувач" },
        { id: "profi_level_women", text: "Постійно експерементую" }
      ]
    },
    {
      id: "control",
      text: "Як бажаєш керувати?",
      answers: [
        { id: "toy_women", text: "Кнопкою на девайсі" },
        { id: "app_women", text: "Через смартфон" },
        { id: "remote_control_women", text: "Пультом" }
      ]
    },
    {
      id: "intensity",
      text: "З якою інтенсивністю любиш отримувати задоволення?",
      answers: [
        { id: "light_mode_women", text: "Легка" },
        { id: "medium_power_women", text: "Середня" },
        { id: "high_intensity_women", text: "Максимальний драйв" }
      ]
    },
    {
      id: "focus",
      text: "Де твій фокус задоволення?",
      answers: [
        { id: "clitors_women", text: "Клітор" },
        { id: "anal_women", text: "Анал" },
        { id: "vagina_women", text: "Піхва" }
      ],
      multipleSelect: true,
      maxSelect: 3
    },
    {
      id: "format",
      text: "Який формат задоволення обираєш?",
      answers: [
        { id: "vacuum_women", text: "Вакуумний" },
        { id: "vibro_women", text: "Вібруючий" },
        { id: "motion_women", text: "Рухомий" }
      ],
      multipleSelect: true,
      maxSelect: 2
    }
  ],
  men: [
    {
      id: "experience_men",
      text: "Чи досліджував раніше своє тіло за допомогою секс іграшок?",
      answers: [
        { id: "first_toy_men", text: "Ніяк не можу наважитись" },
        { id: "inactive_user_men", text: "Не активний користувач" },
        { id: "profi_level_men", text: "Постійно експерементую" }
      ]
    },
    {
      id: "control_men",
      text: "Як бажаєш керувати?",
      answers: [
        { id: "toy_men", text: "Кнопкою на девайсі" },
        { id: "app_men", text: "Через смартфон" },
        { id: "remote_control_men", text: "Пультом" }
      ]
    },
    {
      id: "intensity_men",
      text: "З якою інтенсивністю любиш отримувати задоволення?",
      answers: [
        { id: "light_mode_men", text: "Легка" },
        { id: "medium_power_men", text: "Середня" },
        { id: "high_intensity_men", text: "Максимальний драйв" }
      ]
    },
    {
      id: "focus_men",
      text: "Де твій фокус задоволення?",
      answers: [
        { id: "dick_men", text: "Пеніс" },
        { id: "penis_head_men", text: "Голівка" },
        { id: "balls_men", text: "Мошонка" },
        { id: "anal_men", text: "Анал" }
      ],
      multipleSelect: true,
      maxSelect: 2
    },
    {
      id: "preference_men",
      text: "Що обираєш?",
      answers: [
        { id: "masturbator_men", text: "Мастурбацію" },
        { id: "continuation_men", text: "Подовження процесу" },
        { id: "vibro_men", text: "Вібрацію" }
      ],
      multipleSelect: true,
      maxSelect: 2
    }
  ],
  couples: [
    {
      id: "experience_couples",
      text: "Чи доповнюєте ви своє життя секс іграшками?",
      answers: [
        { id: "profi_level_couple", text: "Так, любимо різноманіття" },
        { id: "inactive_user_couple", text: "Використовуємо за настроем" },
        { id: "first_toy_couple", text: "Тільки починаємо знайомство" }
      ]
    },
    {
      id: "focus_couples",
      text: "Хто у фокусі стимуляції?",
      answers: [
        { id: "he_couple", text: "Він" },
        { id: "she_couple", text: "Вона" },
        { id: "them_couple", text: "Обидва" }
      ]
    },
    {
      id: "intensity_couples",
      text: "З якою інтенсивністю любите отримувати задоволення?",
      answers: [
        { id: "light_mode_couple", text: "Легка" },
        { id: "medium_power_couple", text: "Середня" },
        { id: "high_intensity_couple", text: "Максимальний драйв" }
      ]
    },
    {
      id: "format_couples",
      text: "Формат задоволення?",
      answers: [
        { id: "toys_couple", text: "Іграшки" },
        { id: "petting_couple", text: "Пестощі" },
        { id: "bdsm_couple", text: "БДСМ елементи" }
      ],
      multipleSelect: true,
      maxSelect: 2
    },
    {
      id: "usage_couples",
      text: "Де плануєте користуватись?",
      answers: [
        { id: "home_couple", text: "Вдома разом" },
        { id: "distance_couple", text: "На відстані" },
        { id: "walk_couple", text: "На прогулянці з партнером" }
      ]
    },
    {
      id: "type_couples",
      text: "Який тип девайсу вас цікавить?",
      answers: [
        { id: "vibrating_couples", text: "Вібруючий" },
        { id: "remote_couples", text: "З керуванням на відстані" },
        { id: "dual_couples", text: "Подвійної стимуляції" }
      ]
    }
  ]
};

const currentQuestions = computed(() => {
  return questionsData[selectedGender.value] || [];
});

const currentQuestion = computed(() => {
  return currentQuestions.value[currentQuestionIndex.value] || {};
});

const isAnswerSelected = (answerId) => {
  const questionId = currentQuestion.value.id;
  const answer = answers.value[questionId];

  if (currentQuestion.value.multipleSelect) {
    return Array.isArray(answer) && answer.includes(answerId);
  }

  return answer === answerId;
};

const hasValidAnswer = computed(() => {
  const questionId = currentQuestion.value.id;
  const answer = answers.value[questionId];

  if (!answer) return false;

  if (currentQuestion.value.multipleSelect) {
    return Array.isArray(answer) && answer.length > 0;
  }

  return true;
});

const initializeQuestionAnswers = () => {
  currentQuestions.value.forEach((question) => {
    if (question.multipleSelect && !answers.value[question.id]) {
      answers.value[question.id] = [];
    }
  });
};

const selectGender = (genderId) => {
  selectedGender.value = genderId;
  currentStep.value = "questions";
  currentQuestionIndex.value = 0;
  answers.value = {};
  initializeQuestionAnswers();
};

const handleAnswerChange = (event, answerId) => {
  const questionId = currentQuestion.value.id;

  if (currentQuestion.value.multipleSelect) {
    // Ensure answer is an array for multiple-select questions
    if (!Array.isArray(answers.value[questionId])) {
      answers.value[questionId] = [];
    }

    if (event.target.checked) {
      // Add answer if checked
      answers.value[questionId] = [...answers.value[questionId], answerId];
    } else {
      // Remove answer if unchecked
      answers.value[questionId] = answers.value[questionId].filter((id) => id !== answerId);
    }

    // Enforce max selection limit
    if (
      currentQuestion.value.maxSelect &&
      answers.value[questionId].length > currentQuestion.value.maxSelect
    ) {
      // Keep only the last selected answers up to maxSelect
      answers.value[questionId] = answers.value[questionId].slice(-currentQuestion.value.maxSelect);
    }
  } else {
    // For radio buttons, set single value
    answers.value[questionId] = answerId;
  }
};

const nextQuestion = () => {
  if (currentQuestionIndex.value < currentQuestions.value.length - 1) {
    currentQuestionIndex.value++;
  } else {
    currentStep.value = "complete";
  }
};

const goBack = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
  } else {
    currentStep.value = "gender";
  }
};

const closeQuestionnaire = () => {
  emit("close");
};

const goToProducts = () => {
  // Build query string with selected answers
  const allAnswers = Object.values(answers.value).flat();
  const tags = allAnswers.join(",");

  // Navigate to products with tags
  navigateTo(`/products?page=1&tags=${tags}`);
  closeQuestionnaire();
};

// Reset state when modal closes
watch(
  () => props.isOpen,
  (newVal) => {
    if (!newVal) {
      currentStep.value = "gender";
      selectedGender.value = "";
      currentQuestionIndex.value = 0;
      answers.value = {};
    }
  }
);
</script>

<style lang="scss" scoped>
.questionnaire-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.questionnaire-modal {
  background: var(--background-color);
  padding: 40px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;

  @media screen and (max-width: 768px) {
    padding: 30px 20px;
    margin: 20px;
  }
}

.close-btn {
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  cursor: pointer;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 20px;
    height: 20px;
    stroke: var(--text-color);
  }
}

.step-content {
  text-align: center;
}

.step-title {
  font-size: 1.875rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: var(--text-color);

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
}

.gender-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  margin-bottom: 2rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--accent-color);
  transition: width 0.3s ease;
}

.step-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.questionnaire-btn {
  width: 100%;
}

.back-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;

  svg {
    width: 24px;
    height: 24px;
    stroke: var(--text-color);
  }
}

.step-indicator {
  color: var(--text-color);
  font-size: 0.875rem;
  opacity: 0.7;
}

.question-title {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 2rem;
  color: var(--text-color);
  line-height: 1.4;

  @media screen and (max-width: 768px) {
    font-size: 1.25rem;
  }
}

.answers {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  text-align: left;
}

.answer-label {
  display: flex;
  align-items: center;
  padding: 1.25rem;
  border: 2px solid var(--border-color);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--accent-color);
  }

  &.selected {
    border-color: var(--accent-color);
    background: rgba(255, 255, 255, 0.05);
  }

  &.multiple-select {
    input[type="checkbox"] {
      width: 20px;
      height: 20px;
      margin-right: 12px;
      accent-color: var(--accent-color);
    }
  }

  input[type="radio"] {
    width: 20px;
    height: 20px;
    margin-right: 12px;
    accent-color: var(--accent-color);
  }
}

.answer-text {
  color: var(--text-color);
  font-size: 1rem;
  line-height: 1.5;
}
.complete-screen {
  .success-icon {
    margin-bottom: 2rem;

    svg {
      width: 64px;
      height: 64px;
      color: var(--accent-color);
    }
  }

  .complete-title {
    font-size: 1.875rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--text-color);
  }

  .complete-text {
    font-size: 1.125rem;
    color: var(--text-color);
    opacity: 0.8;
    margin-bottom: 2rem;
  }
}
</style>
