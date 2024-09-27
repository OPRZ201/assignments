export class Assignment {
    assignment_id: string = "";
    issuer: string = "";
    title: string = "";
    description: string = "";
    fullDescription: string = "";
    assignedAt: number = 0;
    dueTo: number | null = null;
    mandatory: boolean = false;

    static getColorFromIssuer(issuer: string) {
        let hash = 0;
        for (let i = 0; i < issuer.length; i++) {
            hash = issuer.charCodeAt(i) + ((hash << 5) - hash);
        }

        let r = (hash >> 16) & 0xFF;
        let g = (hash >> 8) & 0xFF;
        let b = hash & 0xFF;

        r = Math.min(192, r);
        g = Math.min(192, g);
        b = Math.min(192, b);

        const toHex = (value: number) => {
            const hex = value.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };

        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    static convertDate(date: string | number | null) {
        if (date == null) {
            return "-";
        }
        if (typeof date === "string") {
            return new Date(date).toLocaleDateString();
        }

        return new Date(date * 1000).toLocaleDateString();
    }
}
