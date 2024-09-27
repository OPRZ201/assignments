<script setup lang="ts">
import { useAuthenticationStore } from '@/stores/authentication'
import { ref } from 'vue'
import { useForm, useToast } from 'vuestic-ui'

const authenticationStore = useAuthenticationStore()
const toast = useToast()

const studentCode = ref(authenticationStore.studentCode)
const { isValid } = useForm('studentCodeForm')

function updateCode() {
  useAuthenticationStore().setCode(studentCode.value)
  toast.init({
    message: 'Code updated successfully',
    title: 'Success',
    color: 'success',
    duration: 2000
  })
}
</script>

<template>
  <VaForm ref="studentCodeForm" class="flex flex-col grow gap-2 container mx-auto">
    <VaInput
      v-model="studentCode"
      placeholder="SecretCodeX-101"
      label="Group Code (for Students)"
      :rules="[(v) => Boolean(v) || 'Code is required']"
    />
    <VaButton :disabled="!isValid" :onclick="updateCode"> Save </VaButton>
  </VaForm>
</template>
