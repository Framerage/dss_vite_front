import React from "react";

import VkIcon from "assets/icons/vk.svg";
import WhatsappIcon from "assets/icons/whatsapp.svg";
import TelegramIcon from "assets/icons/telegram.svg";
import {APP_DOMEN} from "./constants";

import classes from "./appFooter.module.css";

const sharedContacts = [
  {
    name: "Telegram",
    link: "https://telegram.me/share/url?url=",
    img: TelegramIcon,
  },
  {
    name: "Whatsapp",
    link: "https://wa.me/?text=",
    img: WhatsappIcon,
  },
  {
    name: "Vkontakte",
    link: "https://vk.com/share.php?text=",
    img: VkIcon,
  },
];
const onOpenBlankWithCurPath = (link: string) => {
  window.open(link + APP_DOMEN + window.location.pathname, "_blank");
};

const AppFooter: React.FC = () => {
  return (
    <div className={classes.footerContainer}>
      <span>Share in:</span>
      {sharedContacts.map(shared => (
        <div
          key={shared.name}
          title={shared.name}
          rel="noopener noreferrer"
          onClick={() => onOpenBlankWithCurPath(shared.link)}
          className={classes.sharedLink}
        >
          <img src={shared.img} alt="footerLink" width={35} height={35} />
        </div>
      ))}
    </div>
  );
};
export default AppFooter;
