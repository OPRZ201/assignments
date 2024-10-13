<script setup lang="ts">
import { getAssignments } from '@/api/api'
import type { Assignment } from '@/api/openapi'
import AssignmentListItem from '@/components/AssignmentListItem.vue'
import { reactive, ref, type Ref } from 'vue'

const assignments: Ref<Assignment[]> = ref([])

import { onMounted } from 'vue'

const orderByOptions = [
  { value: 'created_at', text: 'Created At' },
  { value: 'assigned_at', text: 'Assigned At' },
  { value: 'due_to', text: 'Due To' }
]
const orderDirectionOptions = [
  { value: 'asc', text: 'Ascending (1 => 10)' },
  { value: 'desc', text: 'Descending (10 => 1)' }
]

const pageSizeOptions = [
  { value: 3, text: '3' },
  { value: 5, text: '5' },
  { value: 10, text: '10' },
  { value: 15, text: '15' },
  { value: 25, text: '25' }
]

const meta = reactive({ total: 0, limit: 10, offset: 1 })

const sorting = reactive({
  order_direction: 'desc',
  order_by: 'created_at'
})
const loading = ref(true)

function fetchAssignments() {
  loading.value = true
  getAssignments(meta.limit, meta.offset - 1, sorting.order_by, sorting.order_direction).then(
    (value) => {
      assignments.value = value.content
      Object.assign(meta, value.meta)
      meta.offset++
      loading.value = false
    }
  )
}

onMounted(() => {
  fetchAssignments()
})
</script>

<template>
  <VaInnerLoading class="h-full w-full" :loading="loading">
    <div class="flex flex-col gap-4 max-h-full">
      <VaScrollContainer class="max-h-full" vertical>
        <VaList class="min-h-96">
          <VaListItem
            v-for="assignment in assignments"
            :key="assignment.assignment_id"
            class="list__item"
            :to="`/assignment/${assignment.assignment_id}`"
          >
            <AssignmentListItem :assignment="assignment" />
          </VaListItem>
        </VaList>
      </VaScrollContainer>
      <div class="grid gap-8 grid-cols-3 w-1/2 self-center items-stretch flex-1 grow">
        <div class="flex flex-col gap-2">
          <p class="va-title va-text-primary">Page size</p>
          <VaSelect
            v-model="meta.limit"
            :options="pageSizeOptions"
            :disabled="loading"
            text-by="text"
            track-by="value"
            value-by="value"
            v-on:update:model-value="
              () => {
                meta.offset = 1
                fetchAssignments()
              }
            "
            class="max-h-10"
          />
        </div>
        <div class="flex flex-col gap-2 flex items-center">
          <VaPagination
            v-model="meta.offset"
            :total="meta.total"
            :page-size="meta.limit"
            :visible-pages="5"
            class="flex items-center justify-center gap-4"
            v-on:update:model-value="fetchAssignments"
          />
          <p class="va-title va-text-primary">Assignments total: {{ meta.total }}</p>
        </div>
        <div class="flex flex-col gap-2">
          <p class="va-title va-text-primary">Sorting options</p>
          <VaSelect
            v-model="sorting.order_by"
            :options="orderByOptions"
            text-by="text"
            track-by="value"
            value-by="value"
            class="max-h-10"
            v-on:update:model-value="fetchAssignments"
          />
          <VaSelect
            v-model="sorting.order_direction"
            :options="orderDirectionOptions"
            :disabled="loading"
            text-by="text"
            track-by="value"
            value-by="value"
            class="max-h-10"
            v-on:update:model-value="fetchAssignments"
          />
        </div>
      </div>
    </div>
  </VaInnerLoading>
</template>

<style scoped>
.list__item + .list__item {
  margin-top: 1rem;
}
</style>
