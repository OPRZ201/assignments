<script setup lang="ts">
import type { Assignment } from '@/api/openapi.d.ts'
import { Assignment as LocalAssignment } from '@/assets/assignment'
import { useTaskStore } from '@/stores/task'
import Quill from 'quill'
import { ref, watch } from 'vue'

import { Base64 } from 'js-base64'

function getAssignmentProperties(obj: Assignment) {
  const keys: (keyof Assignment)[] = ['issuer', 'description', 'assigned_at', 'due_to']
  return keys.map((key) => {
    return { key: key.replace('_', ' '), value: obj[key] }
  })
}

const isTaskCompleted = ref(false)

function completeTask(assignmentId: string) {
  useTaskStore().completeTask(assignmentId)
  isTaskCompleted.value = true
}
function removeCompletedTask(assignmentId: string) {
  useTaskStore().removeCompletedTask(assignmentId)
  isTaskCompleted.value = false
}

const props = defineProps<{
  assignment: Assignment | null
}>()
const loaded = ref(false)
const quillLoaded = ref(false)

watch(
  () => props.assignment,
  (newAssignment) => {
    if (newAssignment) {
      isTaskCompleted.value = useTaskStore().isTaskCompleted(newAssignment.assignment_id)
      loaded.value = true
    }
  }
)

function initializeQuill() {
  let viewerContainer = document.getElementById('viewer')
  if (viewerContainer === null) {
    setTimeout(initializeQuill, 100)
    return
  }
  const quill = new Quill(viewerContainer, {
    theme: 'bubble',
    readOnly: true
  })
  quill.root.innerHTML = Base64.decode(props.assignment?.full_description || '')
  quillLoaded.value = true
}

watch(
  () => loaded.value,
  (loaded) => {
    if (loaded) {
      initializeQuill()
    }
  }
)
</script>

<template>
  <div :aria-busy="assignment === null">
    <VaSkeletonGroup
      v-if="assignment === null"
      animation="wave"
      :delay="0"
      class="flex flex-col gap-4"
    >
      <VaSkeleton tag="h1" variant="text" class="va-h1" />
      <VaSkeleton variant="text" class="va-text" :lines="4" />
      <VaSkeleton variant="squared" height="100vh" />
    </VaSkeletonGroup>
    <VaCard v-else stripe :stripe-color="LocalAssignment.getColorFromIssuer(assignment.issuer)">
      <VaCardContent class="flex flex-col gap-4" items-center>
        <h1 class="va-h1">
          {{ assignment.title }}
        </h1>
        <VaDivider />
        <div class="item" v-for="value in getAssignmentProperties(assignment)" :key="value.key">
          <span class="v-title va-text-capitalize va-h6"> {{ value.key }}: </span>
          <span>{{ value.value }}</span>
        </div>
        <VaCardActions align="stretch" vertical>
          <VaButton
            v-if="!isTaskCompleted"
            color="success"
            :onclick="() => completeTask(assignment?.assignment_id || '')"
          >
            Mark as Completed</VaButton
          >
          <VaButton
            v-else
            color="danger"
            :onclick="() => removeCompletedTask(assignment?.assignment_id || '')"
          >
            Mark as Incomplete</VaButton
          >
        </VaCardActions>
        <VaCard class="flex flex-column gap-2">
          <h4 class="va-h4 text-center">Full Description</h4>
          <div id="viewer"></div>
        </VaCard>
      </VaCardContent>
    </VaCard>
  </div>
</template>

<style scoped></style>
