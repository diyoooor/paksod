import {
  IconBrandFacebook,
  IconBrandLine,
  IconPhone,
} from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

interface ISocial {
  icon: React.ReactNode;
  name: string;
  link: string;
}

const socials: ISocial[] = [
  {
    icon: <IconBrandFacebook stroke={1} />,
    name: "นุ้ย ผักสด",
    link: "https://www.facebook.com/profile.php?id=61558650133542",
  },
  {
    icon: <IconBrandLine stroke={1} />,
    name: "นุ้ย ผักสด",
    link: "https://www.line.me/",
  },
  {
    icon: <IconPhone stroke={1} />,
    name: "เบอร์โทร",
    link: "tel:080-000-0000",
  },
];
const Footer = () => {
  return (
    <footer className="p-4 bg-green-dark text-green-light">
      <div className="text-center text-xl mb-2">ช่องทางการติดต่อ</div>
      <hr className="border-green-light" />
      <div className="flex justify-around mt-4">
        {socials.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-center gap-2"
          >
            <div className="w-10 h-10 flex justify-center items-center rounded-lg border border-green-light">
              {item.icon}
            </div>
            <span className="text-sm">{item.name}</span>
          </Link>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
