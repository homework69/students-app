<script setup>
import { reactive, watch } from 'vue'
import StarRating from './StarRating.vue'

const props = defineProps({
  student: { type: Object, default: null },
})
const emit = defineEmits(['submit', 'cancel'])

const emptyForm = () => ({
  firstName: '',
  lastName: '',
  description: '',
  rating: 3,
  time: '17:00',
})
const form = reactive(emptyForm())

watch(
  () => props.student,
  (student) => {
    Object.assign(form, student ? {
      firstName: student.firstName,
      lastName: student.lastName,
      description: student.description,
      rating: student.rating,
      time: student.time,
    } : emptyForm())
  },
  { immediate: true },
)

function submitForm() {
  emit('submit', { ...form })
}
</script>

<template>
  <form class="student-form" @submit.prevent="submitForm">
    <div class="form-grid">
      <label class="field">
        <span>Имя <b>*</b></span>
        <input v-model="form.firstName" required maxlength="60" placeholder="Например, Анна" />
      </label>
      <label class="field">
        <span>Фамилия <b>*</b></span>
        <input v-model="form.lastName" required maxlength="60" placeholder="Например, Иванова" />
      </label>
      <label class="field field-wide">
        <span>Описание</span>
        <textarea v-model="form.description" rows="3" maxlength="500" placeholder="Краткая информация об ученике..."></textarea>
      </label>
      <div class="field">
        <span>Рейтинг</span>
        <div class="rating-input">
          <StarRating v-model:model-value="form.rating" interactive />
          <span class="rating-number">{{ form.rating }}/5</span>
        </div>
      </div>
      <label class="field">
        <span>Время занятия <b>*</b></span>
        <select v-model="form.time" required>
          <option value="17:00">17:00</option>
          <option value="18:00">18:00</option>
          <option value="20:00">20:00</option>
        </select>
      </label>
    </div>
    <div class="form-actions">
      <button class="btn btn-primary" type="submit">{{ student ? 'Сохранить изменения' : 'Добавить ученика' }}</button>
      <button v-if="student" class="btn btn-ghost" type="button" @click="$emit('cancel')">Отмена</button>
    </div>
  </form>
</template>
