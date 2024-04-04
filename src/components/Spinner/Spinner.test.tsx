import { render } from "@testing-library/react";
import { Spinner } from "./Spinner";

test("renders spinner component and spinner class inside", () => {
  const { container } = render(<Spinner />);
  expect(container.firstChild).toHaveClass("spinner-container");
  expect(container.firstChild?.firstChild).toHaveClass("spinner");
});
