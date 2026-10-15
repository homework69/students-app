<script setup>
import { computed } from 'vue'
import StudentManager from '../components/StudentManager.vue'

const props = defineProps({ time: { type: String, required: true } })
const pageTitle = computed(() => `Занятия в ${props.time}`)
const pageDescription = computed(() => `Список учеников, записанных на ${props.time}.`)
</script>

<template>
  <StudentManager :time="time" :page-title="pageTitle" :page-description="pageDescription" />
</template>
