import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { LearnLog } from "../LearnLog";

describe("学習記録アプリのテスト", () => {

  test("タイトルが表示されている", async () => {
    render(<LearnLog />);

    await waitForElementToBeRemoved(() => screen.getByText("ロード中．．．"));
    
    expect(await screen.findByRole("heading", {name: "学習記録一覧"})).toBeInTheDocument();
  });

  test("学習内容と時間を入力して登録ボタンを押すと新たに記録が追加することが出来る", async () => {
    render(<LearnLog />);

    await waitForElementToBeRemoved(() => screen.getByText("ロード中．．．"));

    const title = await screen.getByLabelText("学習内容"); 
    const time = await screen.getByLabelText("学習時間");
    const addButton = await screen.getByRole("button", {name: "登録"});

    fireEvent.change(title, { target: { value: "テスト"}});
    fireEvent.change(time, { target: { value: "10"}});
    fireEvent.click(addButton);

    const list = screen.getByRole("list");
    expect(within(list).getAllByText("テスト", { exact: false }).length).toBeGreaterThan(0);
    expect(within(list).getAllByText("10", { exact: false }).length).toBeGreaterThan(0);
  });

  test("削除ボタンを押すと学習記録が削除される", async () => {
    render(<LearnLog />);

    await waitForElementToBeRemoved(() => screen.getByText("ロード中．．．"));

    const initialItems = screen.getAllByRole("listitem");
    const initialCount = initialItems.length;
    const deleteButton = screen.getAllByRole("button", {name: "削除"});

    fireEvent.click(deleteButton[initialCount - 1]);
    
    await waitFor(() => {
      const updateList = screen.getAllByRole("listitem");
      expect(updateList.length).toBe(initialCount - 1);
    });
  });

  test("入力をしないで登録を押すとエラーが表示される", async () => {
    render(<LearnLog />);

    await waitForElementToBeRemoved(() => screen.getByText("ロード中．．．"));

    const title = await screen.getByLabelText("学習内容"); 
    const time = await screen.getByLabelText("学習時間");
    const addButton = await screen.getByRole("button", {name: "登録"});

    fireEvent.change(title, { target: { value: ""}});
    fireEvent.change(time, { target: { value: ""}});
    fireEvent.click(addButton);

    expect(screen.getByText("入力されていない項目があります")).toBeInTheDocument();
  });
});
