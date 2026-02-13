import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CartProvider, useCart } from "../CartContext";

function TestComp() {
  const { addItem, totalItems, totalPrice, clear } = useCart();
  return (
    <div>
      <div>items:{totalItems}</div>
      <div>total:{totalPrice}</div>
      <button
        onClick={() => addItem({ id: 1, title: "A", price: 10, image: "" }, 2)}
      >
        add
      </button>
      <button onClick={clear}>clear</button>
    </div>
  );
}

describe("CartContext", () => {
  it("adds items and calculates totals", () => {
    render(
      <CartProvider>
        <TestComp />
      </CartProvider>
    );

    fireEvent.click(screen.getByText("add"));

    expect(screen.getByText("items:2")).toBeInTheDocument();
    expect(screen.getByText("total:20")).toBeInTheDocument();

    fireEvent.click(screen.getByText("clear"));
    expect(screen.getByText("items:0")).toBeInTheDocument();
  });
});
