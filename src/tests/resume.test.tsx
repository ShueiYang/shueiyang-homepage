import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import HomeHeader from "@/components/resume/HomeHeader";
import Curriculum from "@/components/resume/Curriculum";
import Langues from "@/components/resume/Langues";
import WebPresence from "@/components/resume/WebPresence";

describe("Test components in resume", () => {
  test("Homeheader", async () => {
    render(<HomeHeader />);

    expect(
      screen.getByRole("heading", {
        name: /h e l l o , j e s u i s k i m un développeur passionné par l'apprentissage et la création dans le domaine du web\./i,
      }),
    ).toBeInTheDocument();
  });

  test("Curriculum", async () => {
    const { container } = render(<Curriculum />);
    expect(container).toMatchSnapshot();
  });

  test("Webpresence", async () => {
    render(<WebPresence />);

    expect(screen.getAllByRole("link", { name: /@shueiyang/i })).toHaveLength(
      3,
    );
    expect(screen.getAllByRole("button", { name: /@yang/i })).toHaveLength(3);
    expect(
      screen.getByRole("link", {
        name: /@yangxuzhu/i,
      }),
    ).toBeInTheDocument();
  });

  test("Langues", async () => {
    render(<Langues />);

    expect(
      screen.getByRole("heading", {
        name: /langues/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText(/chinois :/i)).toBeInTheDocument();
    expect(screen.getByText(/mandarin langue maternelle/i)).toBeInTheDocument();
    expect(screen.getByText(/anglais :/i)).toBeInTheDocument();
    expect(screen.getByText(/courant/i)).toBeInTheDocument();
  });
});
