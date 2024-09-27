<script setup lang="ts">
import { getAssignment } from '@/api/api'
import type { Assignment } from '@/api/openapi'
import AssignmentDetails from '@/components/AssignmentDetails.vue'
import { onMounted, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const assignmentId = ref(route.params.id as string)

const assignment: Ref<Assignment | null> = ref(null)

onMounted(() => {
  getAssignment(assignmentId.value).then(
    (value) => {
      assignment.value = value
    },
    (error) => {
      console.error(error)
    }
  )
})
</script>

<template>
  <VaInnerLoading :loading="assignment === null">
    <AssignmentDetails :assignment="assignment" />
  </VaInnerLoading>
</template>
