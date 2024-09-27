import { ref } from 'vue'
import { defineStore } from 'pinia'
import { StudentCodeNotFoundError } from '@/errors/authentication';

export const useAuthenticationStore = defineStore('authentication', () => {
    const studentCode = ref('');

    localStorage.getItem('studentCode') && setCode(localStorage.getItem('studentCode') as string);

    function getCode() {
        if (studentCode.value === '') {
            throw new StudentCodeNotFoundError();
        }
        return studentCode.value;
    }
    function setCode(value: string) {
        studentCode.value = value;
        localStorage.setItem('studentCode', value);
    }

    return { studentCode, getCode, setCode }
})
