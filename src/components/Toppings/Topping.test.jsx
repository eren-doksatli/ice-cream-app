import { render, screen } from "@testing-library/react";
import Toppings from ".";
import userEvent from "@testing-library/user-event";

test("api'dan gelen soslar için ekrana kartlar basılıyor mu?", async () => {
  render(<Toppings />);

  const images = await screen.findAllByAltText("sos-resim");

  expect(images.length).toBeGreaterThanOrEqual(1);
});

test("sosları ekleme çıkarma işlemi topam fiyatı etkiler", async () => {
  render(<Toppings />);
  const user = userEvent.setup();

  const total = screen.getByRole("heading", {
    name: /soslar ücreti/i,
  });

  expect(total).toHaveTextContent(0);

  const toppings = await screen.findAllByRole("checkbox");

  await user.click(toppings[0]);

  expect(total).toHaveTextContent(3);

  await user.click(toppings[2]);

  expect(total).toHaveTextContent(6);

  await user.click(toppings[0]);

  expect(total).toHaveTextContent(3);

  await user.click(toppings[2]);

  expect(total).toHaveTextContent(0);
});
