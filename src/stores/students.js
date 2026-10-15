import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

const STORAGE_KEY = 'students-app-data'

function readStudents() {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value ? JSON.parse(value) : []
  } catch {
    return []
  }
}

export const useStudentsStore = defineStore('students', () => {
  const students = ref(readStudents())
  const sortDirection = ref('desc')

  watch(
    students,
    (value) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    },
    { deep: true },
  )

  const sortedStudents = computed(() => {
    const direction = sortDirection.value === 'desc' ? -1 : 1
    return [...students.value].sort((a, b) => (a.rating - b.rating) * direction)
  })

  function addStudent(payload) {
    students.value.push({
      id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      firstName: payload.firstName.trim(),
      lastName: payload.lastName.trim(),
      description: payload.description.trim(),
      rating: Number(payload.rating),
      time: payload.time,
      createdAt: Date.now(),
    })
  }

  function updateStudent(id, payload) {
    const index = students.value.findIndex((student) => student.id === id)
    if (index === -1) return
    students.value[index] = {
      ...students.value[index],
      firstName: payload.firstName.trim(),
      lastName: payload.lastName.trim(),
      description: payload.description.trim(),
      rating: Number(payload.rating),
      time: payload.time,
    }
  }

  function deleteStudent(id) {
    students.value = students.value.filter((student) => student.id !== id)
  }

  function getByTime(time) {
    return sortedStudents.value.filter((student) => student.time === time)
  }

  function toggleSort() {
    sortDirection.value = sortDirection.value === 'desc' ? 'asc' : 'desc'
  }

  return {
    students,
    sortDirection,
    sortedStudents,
    addStudent,
    updateStudent,
    deleteStudent,
    getByTime,
    toggleSort,
  }
})
