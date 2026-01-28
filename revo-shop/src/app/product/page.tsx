import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductDetails from "@/components/ProductDetails";

async function getProduct(id: string) {
  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, { cache: "no-store" });
  return res.json();
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  return (
    <>
      <Header />
      <ProductDetails product={product} />
      <Footer />
    </>
  );
}