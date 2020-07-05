export const matchHead = (head, string) => {
  return (new RegExp(head, 'gi')).test(string);
}
export const sortString = (direction: number) => {
  return (a: string, b: string) => {
    switch (direction) {
      case 0:
        return (a) ? a.localeCompare(b) : 1;
      case 1:
        return (b) ? b.localeCompare(a) : -1;
      default:
        return 0;
    }
  };
}
export const sortByString = (key: string, direction: number) => {
  return (a: any, b: any) => {
    a = a[key] ? a[key] : " ";
    b = b[key] ? b[key] : " ";
    switch (direction) {
      case 0:
        return (a) ? a.localeCompare(b) : 1;
      case 1:
        return (b) ? b.localeCompare(a) : -1;
      default:
        return 0;
    }
  };
}