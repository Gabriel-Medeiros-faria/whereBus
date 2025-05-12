import { render, screen } from "@testing-library/react";
import Header from "../components/Header";
import '@testing-library/jest-dom';

describe("Header", () => {
  it("renderiza o nome corretamente", () => {
    render(<Header />);
    expect(screen.getByText("Gabriel Medeiros Faria")).toBeInTheDocument();
  });

  it("exibe a versão corretamente", () => {
    render(<Header />);
    expect(screen.getByText("v1.0.0")).toBeInTheDocument();
  });
});
