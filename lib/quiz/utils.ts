export const decodeHtml = (html: string) => {
  if (typeof window === 'undefined') return html;
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

export const shuffleArray = <T,>(array: T[]): T[] => {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const formatTime = (milliseconds: number) => {
  if (milliseconds < 1000) return `${milliseconds} ms`;
  if (milliseconds < 60 * 1000) return `${(milliseconds / 1000).toFixed(2)} seconds`;
  if (milliseconds < 60 * 60 * 1000) return `${(milliseconds / 1000 / 60).toFixed(2)} minutes`;
  return `${(milliseconds / 1000 / 60 / 60).toFixed(2)} hours`;
};
