export default async function Page({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const type = decodeURIComponent((await params).type);

  return <div>Category: {type}</div>;
}
