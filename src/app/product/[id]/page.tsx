interface IProductDetail {
  params: Promise<{ id: string }>;
}

export default async function ProductDetail({ params }: IProductDetail) {
  const detail = decodeURIComponent((await params).id);

  return <div>Product Detail by ID: {detail}</div>;
}
