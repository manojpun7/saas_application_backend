import axios from "axios";

interface KhaltiPaymentData {
  return_url: string;
  website_url: string;
  amount: number;
  purchase_order_id: string;
  purchase_order_name: string;
}

const khaltiPayment = async (data: KhaltiPaymentData) => {
  const response = await axios.post(
    "https://dev.khalti.com/api/v2/epayment/initiate/",
    {
      return_url: data.return_url,
      website_url: data.website_url,
      amount: data.amount * 100,
      purchase_order_id: data.purchase_order_id,
      purchase_order_name: data.purchase_order_name,
    },
    {
      headers: {
        Authorization: "Key f191f31f41614a39b8ef12b99cc2f00d",
      },
    }
  );
  return response
};

export { khaltiPayment };
