import { useRouter } from "vue-router";

export function redirectTo(path: string) {
    const router = useRouter();
    router.push(path);
}