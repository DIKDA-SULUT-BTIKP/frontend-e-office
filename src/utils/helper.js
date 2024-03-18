export const returnStatus = (status) => {
  switch (status) {
    case "1":
      return "Menunggu";
    case "3":
      return "Ditolak";
    default:
      return "Diterima";
  }
};
