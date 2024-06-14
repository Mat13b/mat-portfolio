import Link from "next/link";

import { FaGithub, FaLinkedinIn, FaYoutube, FaTwitter } from "react-icons/fa";

const socials = [
  { icon: <FaGithub />, path: "https://github.com/Mat13b" },
  { icon: <FaLinkedinIn />, path: "https://www.instagram.com/mathieume740/" },
  { icon: <FaYoutube />, path: "https://www.youtube.com/channel/UCt8iMd1uT5sqNVWRXLFMafA" },
  { icon: <FaTwitter />, path: "https://x.com/Mathieuschmit16" },
];

const Social = ({ containerStyles, iconStyles }) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => {
        return (
          <Link key={index} href={item.path} className={iconStyles}>
            {item.icon}
          </Link>
        );
      })}
    </div>
  );
};

export default Social;
