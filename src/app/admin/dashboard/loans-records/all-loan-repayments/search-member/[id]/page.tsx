import { PageHeader } from "@/components/shared/header/page-header2";

export default async function SingleSchedule({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = await params;
  return (
    <div>
      <PageHeader title="Create Loan Repayment for Schedule" />
    </div>
  );
}
