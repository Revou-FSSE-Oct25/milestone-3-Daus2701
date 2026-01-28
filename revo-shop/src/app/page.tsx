import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductList from "@/components/ProductList";

async function getProducts() {
  const res = await fetch("https://api.escuelajs.co/api/v1/products");
  return res.json();
}

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <Header />
      <ProductList products={products} />
      <Footer />
    </>
  );
}