<script setup>
import { computed, ref } from 'vue'
import { useStudentsStore } from '../stores/students'
import StudentForm from './StudentForm.vue'
import StudentTable from './StudentTable.vue'

const props = defineProps({
  time: { type: String, default: '' },
  pageTitle: { type: String, default: 'Все ученики' },
  pageDescription: { type: String, default: 'Управляйте учениками и их расписанием занятий.' },
})
const store = useStudentsStore()
const isFormOpen = ref(false)
const editingStudent = ref(null)
const studentToDelete = ref(null)

const visibleStudents = computed(() => {
  const students = props.time
    ? store.sortedStudents.filter((student) => student.time === props.time)
    : store.sortedStudents
  return students
})

function openAddForm() {
  editingStudent.value = null
  isFormOpen.value = true
}
function openEditForm(student) {
  editingStudent.value = { ...student }
  isFormOpen.value = true
}
function saveStudent(payload) {
  if (editingStudent.value) store.updateStudent(editingStudent.value.id, payload)
  else store.addStudent(payload)
  isFormOpen.value = false
  editingStudent.value = null
}
function confirmDelete() {
  if (studentToDelete.value) store.deleteStudent(studentToDelete.value.id)
  studentToDelete.value = null
}
</script>

<template>
  <section class="page-heading">
    <div>
      <h1 style="color:white;">{{ pageTitle }}</h1>
    </div>
    <button class="btn btn-primary add-button" type="button" @click="openAddForm">
      <span class="plus">＋</span> Добавить ученика
    </button>
  </section>

  <section class="stats-grid">
    <article class="stat-card">
      <span class="stat-icon purple">♙</span>
      <div><span class="stat-label">{{ time ? `Ученики на ${time}` : 'Всего учеников' }}</span><strong>{{ visibleStudents.length }}</strong></div>
    </article>
    <article class="stat-card">
      <span class="stat-icon yellow">★</span>
      <div><span class="stat-label">Средний рейтинг</span><strong>{{ visibleStudents.length ? (visibleStudents.reduce((sum, student) => sum + student.rating, 0) / visibleStudents.length).toFixed(1) : '—' }}<small v-if="visibleStudents.length"> / 5</small></strong></div>
    </article>
    <article class="stat-card">
      <span class="stat-icon green">◷</span>
      <div><span class="stat-label">Доступные слоты</span><strong>{{ time ? 1 : 3 }}</strong></div>
    </article>
  </section>

  <section v-if="isFormOpen" class="panel form-panel">
    <div class="panel-heading">
      <div><h2>{{ editingStudent ? 'Редактирование ученика' : 'Новый ученик' }}</h2><p>Заполните информацию ниже.</p></div>
      <button class="close-button" type="button" aria-label="Закрыть форму" @click="isFormOpen = false">×</button>
    </div>
    <StudentForm :student="editingStudent" @submit="saveStudent" @cancel="isFormOpen = false" />
  </section>

  <section class="panel">
    <div class="panel-heading list-heading">
      <div><h2>Список учеников</h2><p>{{ time ? `Занятия в ${time}` : 'Все ученики и назначенное время' }}</p></div>
      <span class="count-pill">{{ visibleStudents.length }} {{ visibleStudents.length === 1 ? 'ученик' : 'учеников' }}</span>
    </div>
    <StudentTable
      :students="visibleStudents"
      :sort-direction="store.sortDirection"
      :show-time="!time"
      @edit="openEditForm"
      @delete="studentToDelete = $event"
      @sort="store.toggleSort"
    />
  </section>

  <div v-if="studentToDelete" class="modal-backdrop" @click.self="studentToDelete = null">
    <section class="confirm-modal" role="dialog" aria-modal="true" aria-labelledby="delete-title">
      <span class="delete-symbol">!</span>
      <h2 id="delete-title">Удалить ученика?</h2>
      <p>Ученик {{ studentToDelete.firstName }} {{ studentToDelete.lastName }} будет удалён из списка. Это действие нельзя отменить.</p>
      <div class="modal-actions">
        <button class="btn btn-ghost" type="button" @click="studentToDelete = null">Отмена</button>
        <button class="btn btn-danger" type="button" @click="confirmDelete">Удалить</button>
      </div>
    </section>
  </div>
</template>
