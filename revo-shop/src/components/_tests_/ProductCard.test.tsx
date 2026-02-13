import { render, screen } from "@testing-library/react";
import ProductCard from "../ProductCard";
import { CartProvider } from "@/context/CartContext";

const mockProduct = {
  id: 1,
  title: "Test Product",
  price: 100,
  images: ["https://placehold.co/300x300/png"],
};

function renderWithProviders(ui: React.ReactElement) {
  return render(<CartProvider>{ui}</CartProvider>);
}

describe("ProductCard", () => {
  it("renders product title", () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  it("renders product price", () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    expect(screen.getByText("$100")).toBeInTheDocument();
  });

  it("shows Add to cart button", () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    expect(screen.getByRole("button", { name: /add to cart/i })).toBeInTheDocument();
  });
});
