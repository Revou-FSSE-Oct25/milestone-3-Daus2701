import { render, screen } from "@testing-library/react";
import Providers from "@/context/Providers";

describe("Providers", () => {
  it("renders children", () => {
    render(
      <Providers>
        <div>hello</div>
      </Providers>
    );

    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});