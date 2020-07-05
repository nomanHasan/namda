export const copyText = (text: string) => {
  const temp = document.createElement('textarea');
  temp.value = text;
  document.body.appendChild(temp);
  const selected =
    Number(document?.getSelection?.()?.rangeCount) > 0
      ? document?.getSelection?.()?.getRangeAt(0)
      : false;
  temp.select();
  document.execCommand('copy');
  document.body.removeChild(temp);

  if (selected) {
    document?.getSelection?.()?.removeAllRanges();
    document?.getSelection?.()?.addRange(selected);
  }
}