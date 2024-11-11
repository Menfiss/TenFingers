

export const LanguagePaths : { [key: string]: () => Promise<any> } = {
    "english" : () => import("./english.json"),
    "czech" : () => import("./czech.json"),
};