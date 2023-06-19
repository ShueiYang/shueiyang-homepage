function initTheme() {
  const windowTheme = localStorage.getItem('theme') || undefined;

  if (windowTheme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}    
initTheme();