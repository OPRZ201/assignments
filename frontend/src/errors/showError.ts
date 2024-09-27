import { useToast } from 'vuestic-ui';

export function showError(title: string = "Error", message: string, durationMS: number = 5000) {
    const toast = useToast();

    toast.init(
        {
            message: message,
            title: title,
            duration: durationMS,
            color: "danger",
        }
    )
}