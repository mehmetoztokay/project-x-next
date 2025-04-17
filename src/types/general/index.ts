export type Params = Promise<{ slug: string[]; locale: string }>;
export type TranslationT = (key: string, values?: any) => string | React.ReactNode;
