
export const getYouTubeId = (url: string) => {
  // Regex aprimorada para suportar: watch?v=, youtu.be/, embed/, shorts/ e parâmetros extras
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  
  if (match && match[2].length === 11) {
    return match[2];
  }
  
  // Caso o usuário cole apenas o ID de 11 caracteres
  if (url.length === 11 && !url.includes('/') && !url.includes('.')) {
    return url;
  }

  return null;
};

export const formatViews = (views: number) => {
  if (views >= 1000000) return (views / 1000000).toFixed(1) + 'M';
  if (views >= 1000) return (views / 1000).toFixed(1) + 'K';
  return views.toString();
};
