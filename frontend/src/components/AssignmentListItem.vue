<script setup lang="ts">
import { Assignment as LocalAssignment } from '@/assets/assignment'
import { useTaskStore } from '@/stores/task'
import { ref } from 'vue'
import type { Assignment } from '@/api/openapi'

const props = defineProps<{
  assignment: Assignment
}>()

const assignment = ref<Assignment>(props.assignment)
const taskStore = useTaskStore()

const isAssignmentComplete = (assignmentId: string) => {
  return taskStore.isTaskCompleted(assignmentId) ? 'opacity-50' : ''
}
</script>

<template>
  <VaListItemSection icon>
    <VaIcon name="priority_high" color="#ff0000" v-if="assignment.mandatory" />
    <VaIcon
      name="self_improvement"
      :color="LocalAssignment.getColorFromIssuer(assignment.issuer)"
      v-if="!assignment.mandatory"
    />
    <VaIcon :color="LocalAssignment.getColorFromIssuer(assignment.issuer)" name="task" />
  </VaListItemSection>
  <VaListItemSection :class="isAssignmentComplete(assignment.assignment_id)">
    <VaListItemLabel :lines="3"> {{ assignment.issuer }} - {{ assignment.title }} </VaListItemLabel>

    <VaListItemLabel caption>
      {{ assignment.description }}
    </VaListItemLabel>
  </VaListItemSection>
  <VaListItemSection>
    <VaListItemLabel>
      Due To: {{ LocalAssignment.convertDate(assignment.due_to) }}
    </VaListItemLabel>
    <VaListItemLabel caption>
      Assigned At: {{ LocalAssignment.convertDate(assignment.assigned_at) }}
    </VaListItemLabel>
  </VaListItemSection>
</template>
