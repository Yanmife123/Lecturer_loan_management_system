import LoanApplicationPage from "@/components/pages/dashboard/loans/id/LoanApplicationPage";
import { PageHeader } from "@/components/shared/header/page-header2";

export default async function SingleLoanApply({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="space-y-6">
      <PageHeader title={`Loan ${id}`} />
      <LoanApplicationPage />
    </div>
  );
}
