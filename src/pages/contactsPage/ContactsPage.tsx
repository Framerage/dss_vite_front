import React from "react";

import VkIcon from "assets/icons/vk.svg";
import WhatsappIcon from "assets/icons/whatsapp.svg";
import TelegramIcon from "assets/icons/telegram.svg";
import classes from "./contacts.module.css";

const sharedContacts = [
  {name: "Telegram", link: "http://t.me/ragedrage", img: TelegramIcon},
  {
    name: "Whatsapp",
    link: "https://api.whatsapp.com/send?phone=79876395283",
    img: WhatsappIcon,
  },
  {
    name: "Vkontakte",
    link: "https://vk.com/id118856849",
    img: VkIcon,
  },
];
const jobEmail = "officialigonin@mail.ru";
const telNumber = "+79876395283";
const ContactsPage: React.FC = () => {
  return (
    <div className={classes.contactsContainer}>
      <div className={classes.contentItem}>
        Мы находимся в г. Ульяновск, р-н - Дальнее Засвияжье, самоделим на
        дому:)
      </div>
      <div className={classes.contentItem}>
        Телефон для связи:<a href={`tel:${telNumber}`}>{telNumber}</a>, либо
        соц. сети
        {sharedContacts.map(link => (
          <a
            key={link.name}
            href={link.link}
            title={link.name}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={link.img} width={35} height={35} alt="shareLink" />
          </a>
        ))}
      </div>
      <div className={classes.contentItem}>
        Рабочая почта: <a href={`mailto:${jobEmail}`}>{jobEmail}</a>
        &nbsp;(P.S.:клик работает только при подключенной почте на вашем
        устройстве)
      </div>
    </div>
  );
};
export default ContactsPage;
