import React from "react";
import ArrowDown from "@/assets/Icons/ArrowDown";
import AmericaFlag from "@/assets/Icons/AmericaFlag";
import AnnouncementIcon from "@/assets/Icons/AnnouncementIcon";
import BangladeshFlag from "@/assets/Icons/BangladeshFlag";
import ChinaFlag from "@/assets/Icons/ChinaFlag";
import GroupIcon from "@/assets/Icons/GroupIcon";
import NetworkIcon from "@/assets/Icons/NetworkIcon";
import SettingIcon from "@/assets/Icons/SettingIcon";
import ShoppingBag from "@/assets/Icons/ShoppingBag";
import ShoppingCart from "@/assets/Icons/ShoppingCart";
import UserIcon from "@/assets/Icons/UserIcon";
import YearlyIcon from "@/assets/Icons/YearlyIcon";
import AustraliaFlag from "@/assets/Icons/AustraliaFlag";
import WhatsappIcon from "@/assets/Icons/WhatsappIcon";

export type name = { name: string };

interface IconMap {
  [key: string]: JSX.Element;
}

const Icon: React.FC<{
  name: name["name"];
  className?: string;
  onClick?: () => void;
  color?: string;
}> = ({ name, className, onClick, color }) => {
  const iconMap: IconMap = {
    rightArrow: <ArrowDown className={className} />,
    americaFlag: <AmericaFlag className={className} />,
    announcemetIcon: <AnnouncementIcon className={className} />,
    bangladeshFlag: <BangladeshFlag className={className} />,
    chinaFlag: <ChinaFlag className={className} />,
    groupIcon: <GroupIcon className={className} />,
    networkIcon: <NetworkIcon className={className} />,
    australiaFlag: <AustraliaFlag className={className} />,
    settingIcon: <SettingIcon className={className} />,
    shoppingBag: <ShoppingBag className={className} />,
    shoppingCart: <ShoppingCart className={className} />,
    userIcon: <UserIcon className={className} />,
    yearlyIcon: <YearlyIcon className={className} />,
    whatsAppIcon: <WhatsappIcon className={className} />,
  };

  const icon = iconMap[name] || null;

  if (!icon) return null;

  return React.cloneElement(icon, { className, onClick });
};

export default Icon;
