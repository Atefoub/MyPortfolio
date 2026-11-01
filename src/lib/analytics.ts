/**
 * Code du site GoatCounter, sans le domaine.
 * « antoine » pour https://antoine.goatcounter.com.
 * Chaîne vide : aucun script n'est chargé.
 */
export const GOATCOUNTER_CODE = 'atefoub';

const CAMPAIGN_KEY = 'utm_campaign';
const SOURCE_KEY = 'utm_source';

interface CountVars {
  path?: string;
  title?: string;
  event?: boolean;
}

declare global {
  interface Window {
    goatcounter?: {
      count?: (vars?: CountVars) => void;
      path?: (countedPath: string) => string;
      no_onload?: boolean;
    };
  }
}

const pending: Array<() => void> = [];

function storageGet(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function storageSet(key: string, value: string): void {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    // Navigation privée : les pages suivantes ne seront pas reliées à la campagne.
  }
}

function clip(value: string): string {
  return value.trim().slice(0, 80);
}

/** Mémorise utm_campaign et utm_source présents dans l'URL. */
export function rememberCampaign(): void {
  const params = new URLSearchParams(window.location.search);
  const campaign = params.get(CAMPAIGN_KEY);
  const source = params.get(SOURCE_KEY);
  if (campaign) storageSet(CAMPAIGN_KEY, clip(campaign));
  if (source) storageSet(SOURCE_KEY, clip(source));
}

/**
 * Remet la campagne dans l'URL. GoatCounter lit utm_* dans la query
 * réelle de la page, et les liens du routeur ne la conservent pas.
 */
function restoreCampaignQuery(): void {
  const campaign = storageGet(CAMPAIGN_KEY);
  if (!campaign) return;

  const params = new URLSearchParams(window.location.search);
  const source = storageGet(SOURCE_KEY);
  const sameCampaign = params.get(CAMPAIGN_KEY) === campaign;
  const sameSource = !source || params.get(SOURCE_KEY) === source;
  if (sameCampaign && sameSource) return;

  params.set(CAMPAIGN_KEY, campaign);
  if (source) params.set(SOURCE_KEY, source);
  const next = `${window.location.pathname}?${params.toString()}${window.location.hash}`;
  window.history.replaceState(window.history.state, '', next);
}

function send(vars: CountVars): void {
  if (!GOATCOUNTER_CODE.trim()) return;

  const run = () => {
    restoreCampaignQuery();
    window.goatcounter?.count?.(vars);
  };

  if (window.goatcounter?.count) {
    run();
    return;
  }
  pending.push(run);
}

function flush(): void {
  if (!window.goatcounter?.count) return;
  pending.splice(0).forEach((run) => run());
}

/** Charge count.js une seule fois. Sans code, ne fait rien. */
export function installGoatCounter(): void {
  const code = GOATCOUNTER_CODE.trim();
  if (!code || document.querySelector('script[data-goatcounter]')) return;

  window.goatcounter = {
    no_onload: true,
    path: (countedPath) => countedPath.split('?')[0] || '/',
  };

  const script = document.createElement('script');
  script.dataset.goatcounter = `https://${code}.goatcounter.com/count`;
  script.async = true;
  script.src = 'https://gc.zgo.at/count.js';
  script.onload = () => flush();
  document.head.appendChild(script);
}

/** Vue d'une route. Le chemin est celui du navigateur, sans la query. */
export function trackPage(): void {
  send({ path: window.location.pathname || '/' });
}

/** Projet affiché dans le carrousel. Le nom ne doit pas commencer par « / ». */
export function trackProject(id: number, title: string): void {
  send({
    path: `projet-${id}`,
    title,
    event: true,
  });
}
