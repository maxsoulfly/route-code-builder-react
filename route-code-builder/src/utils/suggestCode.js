// src/utils/suggestCode.js
export default function suggestCode(name) {
    if (!name) return "";

    const clean = name.trim();
    const numberMatch = clean.match(/\d+/);

    if (numberMatch) {
        const letters = clean
            .replace(/[^a-zA-Z]/g, "")
            .slice(0, 2)
            .toUpperCase();
        return letters + numberMatch[0];
    }

    const words = clean.split(/\s+/);

    if (words.length === 1) {
        return words[0].slice(0, 2).toUpperCase();
    }

    if (words.length === 2) {
        return (
            words[0].slice(0, 1).toUpperCase() +
            words[1].slice(0, 1).toUpperCase()
        );
    }

    return (
        words[0].slice(0, 1).toUpperCase() +
        words[1].slice(0, 1).toUpperCase() +
        words[words.length - 1][0].toUpperCase()
    );
}
