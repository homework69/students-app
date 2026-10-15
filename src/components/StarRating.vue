<script setup>
defineProps({
  modelValue: { type: Number, default: 0 },
  interactive: { type: Boolean, default: false },
  size: { type: String, default: 'normal' },
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="stars" :class="[`stars-${size}`, { interactive }]" :aria-label="`Рейтинг: ${modelValue} из 5`">
    <template v-for="star in 5" :key="star">
      <button
        v-if="interactive"
        type="button"
        class="star-button"
        :class="{ filled: star <= modelValue }"
        :aria-label="`Поставить ${star} из 5`"
        @click="$emit('update:modelValue', star)"
      >★</button>
      <span v-else class="star" :class="{ filled: star <= modelValue }">★</span>
    </template>
  </div>
</template>
