import Link from "next/link";

const linkStyle = {
  marginRight: 15
};

export default function Header() {
  return (
    <div>
      <Link href="/">
        <a style={linkStyle}>Home</a>
      </Link>
      <Link href="//github.com/xdmorgan">
        <a style={linkStyle} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </Link>
    </div>
  );
}
