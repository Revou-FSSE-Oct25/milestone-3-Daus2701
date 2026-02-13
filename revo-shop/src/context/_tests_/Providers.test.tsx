import { render } from "@testing-library/react";
import Providers from "../Providers";

describe("Providers", () => {
  it("renders children", () => {
    const { getByText } = render(
      <Providers>
        <div>hello</div>
      </Providers>
    );

    expect(getByText("hello")).toBeInTheDocument();
  });
});
