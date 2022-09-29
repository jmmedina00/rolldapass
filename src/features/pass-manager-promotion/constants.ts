export interface PassManagerInfo {
  name: string;
  image: string;
  description: string;
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
        description: "Also features a VPN!",
        url: "https://www.dashlane.com/",
      },
      {
        name: "LastPass",
        image: "assets/lastpass.svg",
        description: "Now you can go passwordless!",
        url: "https://www.lastpass.com/",
      },
      {
        name: "Keeper",
        image: "assets/keeper.svg",
        description: "Features encrypted messaging.",
        url: "https://www.keepersecurity.com/",
      },
      {
        name: "1Password",
        image: "assets/1password.svg",
        description: "Ideal for families.",
        url: "https://1password.com/",
      },
      {
        name: "NordPass",
        image: "assets/nordpass.svg",
        description: "It can detect data breaches.",
        url: "https://nordpass.com/",
      },
      {
        name: "Blur",
        image: "assets/blur.svg",
        description: "Protects your privacy.",
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
        description: "Cloud service that you can self-host.",
        url: "https://bitwarden.com/",
      },
      {
        name: "KeePass",
        image: "assets/keepass.svg",
        description: "Saves your passwords in a standard local database file.",
        url: "https://keepass.info/",
      },
      {
        name: "KeePassXC",
        image: "assets/keepassxc.svg",
        description: "KeePass but works natively in any OS.",
        url: "https://keepassxc.org/",
      },
      {
        name: "KeeWeb",
        image: "assets/keeweb.svg",
        description: "KeePass on your web browser... or Electron.",
        url: "https://keeweb.info/",
      },
      {
        name: "pass",
        image: "assets/pass.svg",
        description: "Store passwords in GPG-encrypted files.",
        url: "https://www.passwordstore.org/",
      },
    ],
  },
};
