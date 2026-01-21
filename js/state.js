// js/state.js

// Estado geral da aplicação
export let tabsState = {
  tabs: {},
  activeTab: null,
  ocrCache: {}
};

let tabCount = 0;

// Salva no localStorage
export function saveState() {
  // Opcional (mas recomendado): mudar a chave pra não conflitar com o projeto antigo
  // Se você já tem dados salvos e quer manter, deixe "cardExtractData".
  localStorage.setItem("qaExtractData", JSON.stringify(tabsState));
}

// Carrega do localStorage e ajusta tabCount
export function loadState() {
  // Opcional (mas recomendado): tenta primeiro a chave nova; se não existir, tenta a antiga
  const saved =
    localStorage.getItem("qaExtractData") ||
    localStorage.getItem("cardExtractData");

  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === "object") {
        tabsState = parsed;
      }
    } catch (e) {
      console.error("Erro ao ler state do localStorage:", e);
    }
  }

  if (!tabsState.tabs) tabsState.tabs = {};
  if (!tabsState.ocrCache) tabsState.ocrCache = {};

  const ids = Object.keys(tabsState.tabs)
    .map(id => parseInt(id.replace("tab_", ""), 10))
    .filter(n => !isNaN(n));

  tabCount = ids.length > 0 ? Math.max(...ids) : 0;
}

// Gera um novo id de aba (tab_1, tab_2, ...)
export function getNextTabId() {
  tabCount += 1;
  return "tab_" + tabCount;
}
