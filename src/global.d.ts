/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    Razorpay: any;
  }
}

declare module "razorpay" {
  export default class Razorpay {
    constructor(options: any);
    orders: {
      create(params: any): Promise<any>;
    };
  }
}