/**
 * Scroll position tracking and reload state helper.
 * Strictly tracks the exact numeric pixel scroll position (scrollY).
 */

const STORAGE_KEY = 'neominds_saved_scroll_y';

export function isPageReload() {
  if (typeof window === 'undefined' || typeof performance === 'undefined') return false;
  try {
    const navEntries = performance.getEntriesByType ? performance.getEntriesByType('navigation') : [];
    if (navEntries.length > 0) {
      return navEntries[0].type === 'reload';
    }
    return performance.navigation ? performance.navigation.type === 1 : false;
  } catch (e) {
    return false;
  }
}

export function getSavedScrollY() {
  if (typeof window === 'undefined') return 0;
  try {
    // If not an actual page reload (e.g. direct URL entry, clicked bookmark/link), reset stale storage
    if (!isPageReload()) {
      sessionStorage.removeItem(STORAGE_KEY);
      return Math.round(window.scrollY || window.pageYOffset || 0);
    }
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw !== null && raw !== '') {
      const parsed = Number(raw);
      if (Number.isFinite(parsed) && parsed >= 0) {
        return parsed;
      }
    }
    return Math.round(window.scrollY || window.pageYOffset || 0);
  } catch (e) {
    return 0;
  }
}

export function saveCurrentScrollY() {
  if (typeof window === 'undefined') return;
  try {
    const y = Math.round(window.scrollY || window.pageYOffset || document.documentElement?.scrollTop || 0);
    sessionStorage.setItem(STORAGE_KEY, String(y));
  } catch (e) {}
}

export function checkIsReloadBelowHero() {
  if (typeof window === 'undefined') return false;
  try {
    const isReload = isPageReload();
    const hash = window.location.hash;
    const isTargetedSubSection = Boolean(hash && hash !== '#home' && hash !== '#hero' && hash !== '#');

    // Direct navigation (not a reload): only bypass hero if user specifically loaded a sub-section hash (e.g. #projects)
    if (!isReload) {
      if (isTargetedSubSection) return true;
      sessionStorage.removeItem(STORAGE_KEY);
      return false;
    }

    // It is an actual reload:
    if (isTargetedSubSection) return true;

    const saved = getSavedScrollY();
    // A threshold of 80px safely differentiates the top/hero from lower sections
    return saved > 80;
  } catch (e) {
    return false;
  }
}
