<script setup>
import StudentRow from './StudentRow.vue'

defineProps({
  students: { type: Array, default: () => [] },
  sortDirection: { type: String, default: 'desc' },
  showTime: { type: Boolean, default: true },
})
defineEmits(['edit', 'delete', 'sort'])
</script>

<template>
  <div class="table-wrap">
    <table class="students-table">
      <thead>
        <tr>
          <th>Ученик</th>
          <th>Описание</th>
          <th>
            <button class="sort-button" type="button" @click="$emit('sort')">
              Рейтинг <span>{{ sortDirection === 'desc' ? '↓' : '↑' }}</span>
            </button>
          </th>
          <th v-if="showTime">Время</th>
          <th class="actions-heading">Действия</th>
        </tr>
      </thead>
      <tbody>
        <StudentRow
          v-for="student in students"
          :key="student.id"
          :student="student"
          @edit="$emit('edit', $event)"
          @delete="$emit('delete', $event)"
        />
      </tbody>
    </table>
    <div v-if="!students.length" class="empty-state">
      <span class="empty-icon">♧</span>
      <strong>Пока здесь никого нет</strong>
      <p>Добавьте ученика, и он появится в этом списке.</p>
    </div>
  </div>
</template>
