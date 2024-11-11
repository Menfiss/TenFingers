

export const LanguagePaths : { [key: string]: () => Promise<any> } = {
    "english": () => import("./english.json"),
    "english_1k": () => import("./english_1k.json"),
    "english_5k": () => import("./english_5k.json"),
    "english_10k": () => import("./english_10k.json"),
    "english_25k": () => import("./english_25k.json"),
    "english_450k": () => import("./english_450k.json"),
    "czech": () => import("./czech.json"),
    "czech_1k": () => import("./czech_1k.json"),
    "czech_10k": () => import("./czech_10k.json"),
};