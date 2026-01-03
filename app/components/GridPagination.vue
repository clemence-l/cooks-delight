<script setup lang="ts">
defineProps<{
  currentPage: number;
  totalPages: number;
  displayedPages: number[];
}>();

defineEmits<{
  (e: "pageChange", page: number): void;
}>();
</script>

<template>
  <div class="pagination">
    <button
      class="pagination__button"
      :disabled="currentPage === 1"
      @click="$emit('pageChange', currentPage - 1)"
    >
      &#9664;
    </button>

    <span
      v-for="n in displayedPages"
      :key="`page-${n}`"
      class="pagination__item"
      :class="{ 'pagination__item -active': n === currentPage }"
      @click="$emit('pageChange', n)"
    >
      {{ n }}
    </span>

    <button
      class="pagination__button"
      :disabled="currentPage === totalPages"
      @click="$emit('pageChange', currentPage + 1)"
    >
      &#9654;
    </button>
  </div>
</template>

<style lang="scss">
.pagination {
  display: flex;
  flex-direction: row;
  gap: rem(8);
  margin: rem(20) 0;
  user-select: none;

  &__item {
    min-width: rem(40);
    height: rem(40);
    display: flex;
    align-items: center;
    justify-content: center;

    background: var(--lighter);
    border: rem(1) solid var(--dark-24);
    border-radius: rem(8);

    font-size: rem(16);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &.-active {
      background: var(--orange);
      border-color: var(--orange);
      color: var(--light);
      font-weight: 700;
      cursor: default;
      transform: none;
    }
    &:not(&--active):hover {
      border-color: var(--orange);
      color: var(--orange);
    }
  }

  &__button {
    @extend .pagination__item;

    min-width: rem(40);
    padding: 0;
    font-size: rem(14);
    font-weight: 400;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background: var(--light);
      border-color: var(--dark-8);
      color: var(--dark);
      box-shadow: none;
      transform: none;
    }
  }
}
</style>
