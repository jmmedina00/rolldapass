export interface PassManagerInfo {
  name: string;
  image: string;
  url: string;
}

export interface PromotionSection {
  label: string;
  items: PassManagerInfo[];
}

export interface Promotion {
  [key: string]: PromotionSection;
}

export const passManagers: Promotion = {
  commercial: {
    label: "Commercial services",
    items: [
      {
        name: "Dashlane",
        image: "assets/dashlane.svg",
        url: "https://www.dashlane.com/",
      },
      {
        name: "LastPass",
        image: "assets/lastpass.svg",
        url: "https://www.lastpass.com/",
      },
      {
        name: "Keeper",
        image: "assets/keeper.svg",
        url: "https://www.keepersecurity.com/",
      },
      {
        name: "1Password",
        image: "assets/1password.svg",
        url: "https://1password.com/",
      },
      {
        name: "NordPass",
        image: "assets/nordpass.svg",
        url: "https://nordpass.com/",
      },
      {
        name: "Blur",
        image: "assets/blur.png",
        url: "https://www.abine.com/",
      },
    ],
  },
  foss: {
    label: "Open-source",
    items: [
      {
        name: "Bitwarden",
        image: "assets/bitwarden.svg",
        url: "https://bitwarden.com/",
      },
      {
        name: "KeePass",
        image: "assets/keepass.svg",
        url: "https://keepass.info/",
      },
      {
        name: "KeePassXC",
        image: "assets/keepassxc.svg",
        url: "https://keepassxc.org/",
      },
      {
        name: "KeeWeb",
        image: "assets/keeweb.png",
        url: "https://keeweb.info/",
      },
      {
        name: "pass",
        image: "assets/pass.svg",
        url: "https://www.passwordstore.org/",
      },
    ],
  },
};
