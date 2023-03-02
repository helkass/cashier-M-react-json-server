export const currencyFormater = (number) => {
   return new Intl.NumberFormat({
      style: "currency",
      currency: "IDR",
   }).format(number);
};
