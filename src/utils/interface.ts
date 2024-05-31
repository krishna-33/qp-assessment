interface Item {
  id: number;
  quantity: number;
}
interface ResponseData {
  status: number;
  message: string;
  data?: any;
}

export { Item, ResponseData };
