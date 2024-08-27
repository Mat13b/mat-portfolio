import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaYoutube, FaTwitter } from "react-icons/fa";

const socials = [
  { Icon: FaGithub, path: "https://github.com/Mat13b" },
  { Icon: FaLinkedinIn, path: "https://www.instagram.com/mathieume740/" },
  { Icon: FaYoutube, path: "https://www.youtube.com/channel/UCt8iMd1uT5sqNVWRXLFMafA" },
  { Icon: FaTwitter, path: "https://x.com/Mathieuschmit16" },
];

const Social = ({ containerStyles, iconStyles }) => (
  <div className={containerStyles}>
    {socials.map(({ Icon, path }, index) => (
      <Link key={index} href={path} className={iconStyles}>
        <Icon />
      </Link>
    ))}
  </div>
);

export default Social;
