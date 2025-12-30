<template>
  <div class="pagination">
    <button
      v-for="page in visiblePages"
      :key="page"
      :class="['pagination-btn', { active: page === currentPage }]"
      @click="goToPage(page)"
    >
      {{ page }}
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  visibleRange: {
    type: Number,
    default: 3
  }
});

const emit = defineEmits(["page-change"]);

const visiblePages = computed(() => {
  const pages = [];
  const start = Math.max(1, props.currentPage - props.visibleRange);
  const end = Math.min(props.totalPages, props.currentPage + props.visibleRange);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

const goToPage = (page) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit("page-change", page);
  }
};
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  align-items: center;
  gap: 4px;
}

.pagination-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border: none;
  background: transparent;
  color: var(--text-color);
  cursor: pointer;
  transition: color 0.2s ease;
  font-size: 14px;
  font-weight: 400;
  border-radius: 4px;

  &:hover {
    color: var(--accent-color);
  }

  &.active {
    color: var(--accent-color);
    font-weight: 500;
  }
}
</style>
