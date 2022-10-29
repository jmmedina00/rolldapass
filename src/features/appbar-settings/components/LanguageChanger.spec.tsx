import { act } from "react-dom/test-utils";
import { useTranslation } from "react-i18next";
import { renderWithProviders } from "../../../utils/test-utils";
import LanguageChanger from "./LanguageChanger";

jest.mock("react-i18next");

describe("language changer option", () => {
  it("should change to the next available language", () => {
    const i18n = {
      changeLanguage: jest.fn(() => new Promise(() => {})),
      options: {
        preload: ["en", "es", "fr"],
      },
      language: "es",
    };

    (useTranslation as jest.Mock).mockReturnValue({
      t: (str: string) => str,
      i18n,
    });

    const { getByText } = renderWithProviders(<LanguageChanger />);
    const item = getByText("Language: English");

    act(() => {
      item.click();
    });

    expect(i18n.changeLanguage).toHaveBeenCalledWith("fr");
  });

  it("should go back to the first language when at the end of the list", () => {
    const i18n = {
      changeLanguage: jest.fn(() => new Promise(() => {})),
      options: {
        preload: ["en", "es", "fr"],
      },
      language: "fr",
    };

    (useTranslation as jest.Mock).mockReturnValue({
      t: (str: string) => str,
      i18n,
    });

    const { getByText } = renderWithProviders(<LanguageChanger />);
    const item = getByText("Language: English");

    act(() => {
      item.click();
    });

    expect(i18n.changeLanguage).toHaveBeenCalledWith("en");
  });

  it("should strip region code from first selected language", () => {
    const i18n = {
      changeLanguage: jest.fn(() => new Promise(() => {})),
      options: {
        preload: ["en", "es", "fr"],
      },
      language: "en-US",
    };

    (useTranslation as jest.Mock).mockReturnValue({
      t: (str: string) => str,
      i18n,
    });
    renderWithProviders(<LanguageChanger />);

    expect(i18n.changeLanguage).toHaveBeenCalledWith("en");
  });
});
