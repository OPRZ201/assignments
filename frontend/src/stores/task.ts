import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', () => {
    const completedTasks: Ref<string[]> = ref([])

    localStorage.getItem('completedTasks') && (completedTasks.value = JSON.parse(localStorage.getItem('completedTasks')!))

    function saveCompletedTasks() {
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks.value))
    }

    function completeTask(taskId: string) {
        if (isTaskCompleted(taskId)) {
            return
        }
        completedTasks.value.push(taskId);
        saveCompletedTasks()
    }
    function removeCompletedTask(taskId: string) {
        if (!isTaskCompleted(taskId)) {
            return
        }
        completedTasks.value = completedTasks.value.filter((id) => id !== taskId)
        saveCompletedTasks()
    }

    function isTaskCompleted(taskId: string) {
        return completedTasks.value.includes(taskId)
    }

    return { completedTasks, completeTask, removeCompletedTask, isTaskCompleted }

})
