<template>
  <div :class="['grouped-select', variantClass]" @click.stop>
    <button type="button" class="grouped-select__trigger" @click="open">
      <span v-if="!selectedOptions.length" class="grouped-select__placeholder">
        {{ placeholder }}
      </span>

      <div v-else class="grouped-select__tags">
        <span
          v-for="option in selectedOptions.slice(0, 2)"
          :key="option.value"
          class="grouped-select__tag"
        >
          {{ option.label }}
        </span>

        <span v-if="selectedOptions.length > 2" class="grouped-select__more">
          +{{ selectedOptions.length - 2 }}
        </span>
      </div>

      <span class="grouped-select__arrow">
        {{ isOpen ? "⌃" : "⌄" }}
      </span>
    </button>

    <div v-if="isOpen" class="grouped-select__dropdown">
      <div class="grouped-select__list">
        <div v-for="group in filteredGroups" :key="group.label" class="grouped-select__group">
          <div class="grouped-select__group-header">
            <button
              type="button"
              class="grouped-select__collapse"
              @click="toggleGroupOpen(group.label)"
            >
              {{ isGroupOpen(group.label) ? "⌄" : "›" }}
            </button>

            <label class="grouped-select__checkbox">
              <input
                type="checkbox"
                :checked="isGroupChecked(group)"
                @change="toggleGroup(group)"
              />

              <span class="checkbox-ui"></span>

              <span class="grouped-select__group-label">
                {{ group.label }}
              </span>
            </label>
          </div>

          <div v-if="isGroupOpen(group.label)" class="grouped-select__options">
            <label
              v-for="option in group.options"
              :key="option.value"
              class="grouped-select__option"
            >
              <input
                type="checkbox"
                :checked="selected.has(option.value)"
                @change="toggleOption(option.value)"
              />

              <span class="checkbox-ui"></span>

              <span>{{ option.label }}</span>
            </label>
          </div>
        </div>

        <div v-if="!filteredGroups.length" class="grouped-select__empty">Nothing found</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },

  options: {
    type: Array,
    default: () => []
  },

  checkedOptions: {
    type: Array,
    default: () => []
  },

  placeholder: {
    type: String,
    default: "Select..."
  },

  variant: {
    type: String,
    default: "light"
  }
});

const emit = defineEmits(["update:modelValue"]);

const variantClass = computed(() => (props.variant === "dark" ? "grouped-select--dark" : ""));

const isOpen = ref(false);

const openedGroups = ref({});

const normalizedGroups = computed(() => {
  if (!props.options.length) {
    return [];
  }

  if (props.options[0] && Array.isArray(props.options[0].options)) {
    return props.options.map((group) => ({
      label: group.label,
      options: group.options.map(normalizeOption)
    }));
  }

  const hasTagGender = props.options.some(
    (opt) => opt && typeof opt === "object" && "tagGender" in opt
  );

  if (hasTagGender) {
    const labelForGender = (gender) => {
      switch (gender) {
        case "WOMEN":
          return "Для неї";
        case "MEN":
          return "Для нього";
        case "COUPLE":
          return "Для пари";
        case "UNDEFINED":
          return "Інше";
        default:
          return String(gender ?? "Інше");
      }
    };

    const order = ["WOMEN", "MEN", "COUPLE", "UNDEFINED"];

    const grouped = props.options.reduce((acc, opt) => {
      const gender = opt?.tagGender ?? "UNDEFINED";
      acc[gender] = acc[gender] || [];
      acc[gender].push(normalizeOption(opt));
      return acc;
    }, {});

    return Object.entries(grouped)
      .sort(([a], [b]) => {
        const ai = order.indexOf(a);
        const bi = order.indexOf(b);
        return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
      })
      .map(([gender, options]) => ({
        label: labelForGender(gender),
        options
      }));
  }

  return [
    {
      label: "Tags",
      options: props.options.map(normalizeOption)
    }
  ];
});

function normalizeOption(option) {
  return {
    value: option.value ?? option.id ?? option.tagId,

    label:
      option.label ??
      option.tagName ??
      option.name ??
      String(option.value ?? option.id ?? option.tagId)
  };
}

const selected = computed(() => {
  const values = props.modelValue.length > 0 ? props.modelValue : props.checkedOptions;

  return new Set(values);
});

function toggleOption(value) {
  const next = new Set(selected.value);

  if (next.has(value)) {
    next.delete(value);
  } else {
    next.add(value);
  }

  emit("update:modelValue", [...next]);
}

function toggleGroup(group) {
  const values = group.options.map((option) => option.value);
  const allSelected = values.every((value) => selected.value.has(value));
  const next = new Set(selected.value);

  if (allSelected) {
    values.forEach((value) => next.delete(value));
  } else {
    values.forEach((value) => next.add(value));
  }

  emit("update:modelValue", [...next]);
}

const filteredGroups = computed(() => {
  return normalizedGroups.value
    .map((group) => ({
      ...group,

      options: group.options.filter((option) => option.label.toLowerCase())
    }))
    .filter((group) => group.options.length);
});

const selectedOptions = computed(() => {
  return normalizedGroups.value
    .flatMap((group) => group.options)
    .filter((option) => selected.value.has(option.value));
});

function open() {
  isOpen.value = true;
}

function isGroupChecked(group) {
  if (!group.options.length) {
    return false;
  }

  return group.options.every((option) => selected.value.has(option.value));
}

function toggleGroupOpen(label) {
  openedGroups.value[label] = !isGroupOpen(label);
}

function isGroupOpen(label) {
  return openedGroups.value[label] !== false;
}

function handleClickOutside(event) {
  const target = event.target;

  if (target && typeof target.closest === "function" && !target.closest(".grouped-select")) {
    isOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.grouped-select {
  position: relative;
  width: 100%;
}

.grouped-select__trigger {
  width: 100%;
  min-height: 42px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  text-align: left;
}

.grouped-select__placeholder {
  color: #999;
}

.grouped-select__tags {
  display: flex;
  align-items: center;
  gap: 5px;
  flex: 1;
  overflow: hidden;
}

.grouped-select__tag {
  padding: 3px 7px;
  border-radius: 5px;
  background: #f1f1f1;
  font-size: 13px;
  white-space: nowrap;
}

.grouped-select__more {
  font-size: 13px;
  color: #777;
}

.grouped-select__arrow {
  margin-left: auto;
  font-size: 18px;
}

.grouped-select__dropdown {
  position: absolute;
  z-index: 20;
  top: calc(100% + 5px);
  left: 0;
  width: 100%;
  min-width: 280px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  max-height: 300px;
  overflow-y: auto;
}

.grouped-select__group {
  border-bottom: 1px solid #f1f1f1;
}

.grouped-select__group-header {
  display: flex;
  align-items: center;
  min-height: 40px;
  padding: 0 10px;
  background: #fafafa;
}

.grouped-select__collapse {
  width: 25px;
  border: 0;
  background: transparent;
  cursor: pointer;
  font-size: 17px;
}

.grouped-select__checkbox,
.grouped-select__option {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.grouped-select__option {
  padding: 8px 15px 8px 43px;
}

.grouped-select__option:hover,
.grouped-select__group-header:hover {
  background: #f7f7f7;
}

.grouped-select input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.checkbox-ui {
  position: relative;
  width: 17px;
  height: 17px;
  flex: 0 0 17px;
  border: 1px solid #bbb;
  border-radius: 4px;
  background: #fff;
}

.grouped-select input[type="checkbox"]:checked + .checkbox-ui {
  background: #222;
  border-color: #222;
}

.grouped-select input[type="checkbox"]:checked + .checkbox-ui::after {
  content: "";
  position: absolute;
  left: 4px;
  top: 0px;
  width: 5px;
  height: 9px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.grouped-select__empty {
  padding: 20px;
  text-align: center;
  color: #999;
}

.grouped-select__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 12px;
  border-top: 1px solid #eee;
  font-size: 13px;
  color: #777;
}

.grouped-select__footer button {
  border: 0;
  background: transparent;
  cursor: pointer;
  color: #d33;
}

/* Dark variant (matches admin modal inputs) */
.grouped-select--dark .grouped-select__trigger {
  background: #000;
  color: var(--text-grey);
  border: 1px solid var(--border-color);
  border-radius: 10px;
}

.grouped-select--dark .grouped-select__placeholder {
  color: var(--grey-color, #777);
}

.grouped-select--dark .grouped-select__arrow {
  color: var(--text-grey);
}

.grouped-select--dark .grouped-select__tag {
  background: rgb(27, 27, 27);
  color: var(--text-grey);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.grouped-select--dark .grouped-select__more {
  color: var(--grey-color, #999);
}

.grouped-select--dark .grouped-select__dropdown {
  background: #000;
  border: 1px solid var(--border-color);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
}

.grouped-select--dark .grouped-select__group {
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.grouped-select--dark .grouped-select__group-header {
  background: rgb(27, 27, 27);
}

.grouped-select--dark .grouped-select__option:hover,
.grouped-select--dark .grouped-select__group-header:hover {
  background: rgba(255, 255, 255, 0.04);
}

.grouped-select--dark .checkbox-ui {
  background: #000;
  border: 1px solid var(--border-color);
}

.grouped-select--dark input[type="checkbox"]:checked + .checkbox-ui {
  background: var(--accent-color);
  border-color: var(--accent-color);
}

.grouped-select--dark .grouped-select__empty {
  color: var(--grey-color, #999);
}
</style>
