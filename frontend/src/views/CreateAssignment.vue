<script setup lang="ts">
import { createAssignment } from '@/api/api'
import Quill from 'quill'

import { onMounted, reactive, watch } from 'vue'
import { useForm, useToast } from 'vuestic-ui'

import { Base64 } from 'js-base64'

onMounted(() => {
  const quill = new Quill('#editor', {
    theme: 'snow',
    placeholder: 'Write something awesome...'
  })

  quill.on('text-change', () => (form.fullDescription = quill.root.innerHTML))
})

const { isValid } = useForm('formRef')

const getDateStringFromDate = (date: Date) => date.toISOString().split('T')[0]
const getCurrentDateString = () => getDateStringFromDate(new Date())
const getDateNDaysFromNow = (n: number) =>
  getDateStringFromDate(new Date(new Date().setDate(new Date().getDate() + n)))

const cleanFormParams = {
  code: '',
  issuer: '',
  title: '',
  description: '',
  fullDescription: '',
  assignedAt: getCurrentDateString(),
  dueTo: getDateNDaysFromNow(7),
  mandatory: false
}

const form = reactive({ ...cleanFormParams })

watch(
  () => form.fullDescription,
  () => {
    if (!form.fullDescription) {
      const quill = new Quill('#editor')
      quill.root.innerHTML = form.fullDescription
    }
  }
)

function getQuillContentAsBase64() {
  const quill = new Quill('#editor')
  return Base64.encode(quill.root.innerHTML)
}

function createNewAssignment() {
  createAssignment(form.code, {
    title: form.title,
    issuer: form.issuer,
    description: form.description,
    full_description: getQuillContentAsBase64(),
    assigned_at: form.assignedAt,
    due_to: form.dueTo,
    mandatory: form.mandatory
  })
    .then(() => {
      useToast().init({
        title: 'Assignment created',
        message: 'The assignment was created successfully'
      })
      Object.assign(form, cleanFormParams)
    })
    .catch((error) => {
      useToast().init({
        title: 'Error creating assignment',
        message: error.message
      })
    })
}
</script>

<template>
  <VaForm ref="formRef">
    <div class="flex flex-col gap-6 mb-4">
      <VaValue v-slot="isPasswordVisible" :default-value="false">
        <VaInput
          v-model="form.code"
          id="editorCode"
          :type="isPasswordVisible.value ? 'text' : 'password'"
          label="Password with toggle"
          placeholder="Secret Code"
          @click-append-inner="isPasswordVisible.value = !isPasswordVisible.value"
          :rules="[
            (v) => !!v || 'Code is required',
            (v) => (v && v.length >= 8) || 'Code must be at least 8 characters'
          ]"
        >
          <template #appendInner>
            <VaIcon
              :name="isPasswordVisible.value ? 'visibility_off' : 'visibility'"
              size="small"
              color="primary"
            />
          </template>
        </VaInput>
      </VaValue>
      <VaInput
        v-model="form.issuer"
        id="issuer"
        label="Issuer"
        placeholder="Issuer"
        :rules="[(v) => !!v || 'Issuer is required']"
      />
      <VaInput
        v-model="form.title"
        id="title"
        label="Title"
        placeholder="Name"
        :rules="[(v) => !!v || 'Title is required']"
      />
      <VaInput
        v-model="form.description"
        id="description"
        label="Description"
        placeholder="Description"
        :rules="[(v) => !!v || 'Description is required']"
      />
      <div class="flex flex-col gap-2">
        <p class="va-title va-text-primary">Long Description</p>
        <div>
          <div id="toolbar" />
          <div id="editor" />
        </div>
      </div>
      <VaInput v-model="form.assignedAt" label="Assigned At" type="date" />
      <VaInput v-model="form.dueTo" label="Due To" type="date" />
      <VaCheckbox v-model="form.mandatory" label="Is mandatory" />
      <VaButton class="flex-1" :disabled="!isValid" :onclick="createNewAssignment">Create</VaButton>
    </div>
  </VaForm>
</template>
