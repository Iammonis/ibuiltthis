import { auth } from "@clerk/nextjs/server";
import ProductSubmitForm from "@/components/products/product-submit-form";
import { AuthGuardOverlay } from "@/components/common/auth-guard";

export default async function SubmitFormWrapper() {
  const { userId } = await auth();

  return (
    <AuthGuardOverlay userId={userId}>
      <ProductSubmitForm />
    </AuthGuardOverlay>
  );
}
