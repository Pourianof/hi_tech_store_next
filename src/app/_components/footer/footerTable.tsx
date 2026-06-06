import { PaymentLogos } from "./paymentLogos";
import { SubscriptionInput } from "./subscriptionInput";

export function FooterTable() {
  return (
    <table className="w-full table-auto border-separate border-spacing-2 border-spacing-x-5">
      <thead>
        <tr className="text-left text-neutral-200">
          <th>Company</th>
          <th>Info</th>
          <th>Contact us</th>
          <th>Sign up for News and updates</th>
        </tr>
      </thead>
      <tbody className="text-sm">
        <tr>
          <td>about us</td>
          <td>How it works</td>
          <td>
            <address>123 Main Street, Anytown,USA</address>
          </td>
          <td rowSpan={2}>
            <SubscriptionInput />
          </td>
        </tr>
        <tr>
          <td>about blog</td>
          <td>our promises</td>
          <td>+1 (555) 123-4567</td>
        </tr>
        <tr>
          <td>about returns</td>
          <td>FAQ</td>
          <td>TechHeimSupport@gmail.com</td>
          <td>
            <PaymentLogos />
          </td>
        </tr>
        <tr>
          <td>about other status</td>
        </tr>
      </tbody>
    </table>
  );
}
