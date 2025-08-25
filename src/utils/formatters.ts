export function phoneMask(value: string): string {
    const cleaned = value.replace(/\D/g, "").slice(0, 12); // Limita a 12 dígitos

    if (cleaned.length <= 4) {
        return cleaned; // sem máscara ainda
    }

    if (cleaned.length <= 8) {
        // Ex: 32323232
        return cleaned.replace(/(\d{4})(\d{0,4})/, "$1-$2").trim();
    }

    if (cleaned.length === 9) {
        // Ex: 931730001
        return cleaned.replace(/(\d{5})(\d{0,4})/, "$1-$2").trim();
    }

    if (cleaned.length === 10) {
        // Ex: 3432323232
        return cleaned.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").trim();
    }

    if (cleaned.length === 11) {
        // Ex: 34993173001
        return cleaned.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").trim();
    }

    if (cleaned.length === 12) {
        // Ex: 034993173001
        return cleaned.replace(/(\d{3})(\d{5})(\d{0,4})/, "($1) $2-$3").trim();
    }

    return value;
}
