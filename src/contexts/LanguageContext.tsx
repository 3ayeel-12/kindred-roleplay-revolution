
// This file is kept for backward compatibility
// Import from the refactored structure and re-export
import { LanguageProvider, useLanguage } from "./language";
import type { Language, Theme, LanguageContextType } from "./language";

// Re-export everything
export { LanguageProvider, useLanguage };
export type { Language, Theme, LanguageContextType };
