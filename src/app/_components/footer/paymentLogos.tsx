import Icon from "@/ui/icons/icon";
import { Row } from "@/ui/layouts/row";

export function PaymentLogos() {
  return (
    <Row className="gap-4 text-3xl">
      <Icon name="facebook" />
      <Icon name="instagram" />
      <Icon name="twitter" />
      <Icon name="youtube" />
    </Row>
  );
}
