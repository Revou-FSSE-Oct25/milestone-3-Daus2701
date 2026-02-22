import { auth } from "@/lib/auth";

export default async function AdminPage() {
  const session = await auth();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Admin</h1>
      <p className="mt-2 text-gray-600">
        Signed in as: {session?.user?.email}
      </p>
      <p className="mt-1 text-gray-600">Role: {(session as any)?.role}</p>
    </main>
  );
}