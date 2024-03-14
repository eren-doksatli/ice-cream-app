import { fireEvent, render, screen } from "@testing-library/react";
import Form from ".";
import userEvent from "@testing-library/user-event";

test("Koşulların onaylanmasına göre buton aktifliği", async () => {
  render(<Form />);

  const user = userEvent.setup();

  const orderBtn = screen.getByRole("button");
  const checkBox = screen.getByRole("checkbox");

  expect(checkBox).not.toBeChecked();

  expect(orderBtn).toBeDisabled();

  await user.click(checkBox);

  expect(orderBtn).toBeEnabled();

  await user.click(checkBox);

  expect(orderBtn).toBeDisabled();
});

test("onay butonu hover olunca bildirim ekrana gelir", async () => {
  render(<Form />);

  const user = userEvent.setup();
  const checkbox = screen.getByRole("checkbox");
  const button = screen.getByRole("button");
  const popup = screen.getByText(/size gerçekten/i);

  await user.click(checkbox);

  fireEvent.mouseEnter(button);

  expect(popup).toBeVisible();

  fireEvent.mouseLeave(button);

  expect(popup).not.toBeVisible();
});
