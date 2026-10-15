<script setup>
import StarRating from './StarRating.vue'

defineProps({ student: { type: Object, required: true } })
defineEmits(['edit', 'delete'])
</script>

<template>
  <tr>
    <td>
      <div class="student-identity">
        <span class="avatar">{{ student.firstName.charAt(0).toUpperCase() }}{{ student.lastName.charAt(0).toUpperCase() }}</span>
        <span class="student-name">{{ student.firstName }} {{ student.lastName }}</span>
      </div>
    </td>
    <td class="description-cell">{{ student.description || '—' }}</td>
    <td><StarRating :model-value="student.rating" size="small" /></td>
    <td><span class="time-pill">{{ student.time }}</span></td>
    <td>
      <div class="row-actions">
        <button class="icon-button" type="button" title="Редактировать" aria-label="Редактировать" @click="$emit('edit', student)">✎</button>
        <button class="icon-button danger" type="button" title="Удалить" aria-label="Удалить" @click="$emit('delete', student)">⌫</button>
      </div>
    </td>
  </tr>
</template>
