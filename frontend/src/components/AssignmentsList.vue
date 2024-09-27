<script setup lang="ts">
import { getAssignments } from '@/api/api'
import type { Assignment } from '@/api/openapi'
import { Assignment as LocalAssignment } from '@/assets/assignment'
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
            v-for="(assignment, index) in assignments"
            :key="index"
            class="list__item"
            :to="`/assignment/${assignment.assignment_id}`"
          >
            <VaListItemSection icon>
              <VaIcon name="priority_high" color="#ff0000" v-if="assignment.mandatory" />
              <VaIcon
                name="self_improvement"
                :color="LocalAssignment.getColorFromIssuer(assignment.issuer)"
                v-if="!assignment.mandatory"
              />
              <VaIcon :color="LocalAssignment.getColorFromIssuer(assignment.issuer)" name="task" />
            </VaListItemSection>
            <VaListItemSection>
              <VaListItemLabel :lines="3">
                {{ assignment.issuer }} - {{ assignment.title }}
              </VaListItemLabel>

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
          </VaListItem>
        </VaList>
      </VaScrollContainer>
      <div class="grid gap-8 grid-cols-3 w-1/2 self-center items-stretch flex-1 grow">
        <VaPopover message="Page size">
          <VaCounter
            ref="counter"
            v-model="meta.limit"
            :disabled="loading"
            v-on:update:model-value="
              () => {
                meta.offset = 1
                fetchAssignments()
              }
            "
            min="1"
            max="25"
          />
        </VaPopover>
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
            v-on:update:model-value="fetchAssignments"
          />
          <VaSelect
            v-model="sorting.order_direction"
            :options="orderDirectionOptions"
            text-by="text"
            track-by="value"
            value-by="value"
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
