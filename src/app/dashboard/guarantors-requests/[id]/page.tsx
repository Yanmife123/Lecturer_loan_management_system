import { GuarantorRequestDetails } from "@/components/pages/dashboard/guarantors-request/id/SingleRequestComponent";
export default async function SingleGuarantorRequest({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      <GuarantorRequestDetails />
    </div>
  );
}
