export interface LanguageStat {
  name: string;
  bytes: number;
  percent: number;
}

const STATIC_LANGUAGES: LanguageStat[] = [
  { name: 'TypeScript', bytes: 180000, percent: 42 },
  { name: 'JavaScript', bytes: 95000,  percent: 22 },
  { name: 'CSS',        bytes: 60000,  percent: 14 },
  { name: 'HTML',       bytes: 45000,  percent: 10 },
  { name: 'Python',     bytes: 32000,  percent:  7 },
  { name: 'Java',       bytes: 22000,  percent:  5 },
];

export function useGithubLanguages() {
  return {
    languages: STATIC_LANGUAGES,
    loading: false,
    error: false,
  };
}