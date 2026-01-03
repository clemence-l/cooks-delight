<script setup lang="ts">
defineProps<{
    modelValue: string | number;
  label?: string
  type: 'text' | 'email' | 'password' | 'textarea'
  placeholder?: string
}>()


defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();
</script>

<template>
  <div class="input">
    <label v-if="label">{{ label }}</label>
    <template v-if="type === 'textarea'">
      <textarea
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </template>
    <template v-else>
      <input
        :type="type || 'text'"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      >
    </template>
  </div>
</template>

<style lang="scss">
.input {
  display: flex;
  flex-direction: column;
  text-align: left;

  label {
    font-size: rem(14);
  }

  input,
  textarea {
    padding: rem(10) rem(14);
    background: var(--lighter);
    border-radius: rem(12);
    border: rem(1) solid var(--dark-24);
    @include paragraph-2();
    transition: border 0.2s ease;
    width: 100%;

    &:focus {
      outline: none;
      border-color: var(--orange);
    }
  }
}
</style>

