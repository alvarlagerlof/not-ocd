import { useRef, useState } from "react";
import { useSpring, animated } from "react-spring";

import Button from "components/Button";
import useOnClickOutside from "lib/useOnClickOutside";

export default function DonateDropdown() {
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const styles = useSpring({
    config: { mass: 1, tension: 180, friction: 12 },
    opacity: isOpen ? "1" : "0",
    transform: isOpen ? "scale(1)" : "scale(0.9)",
  });

  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <Button
        variant="primary"
        onClick={() => setIsOpen((prev) => !prev)}
        id="menu-button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="flex flex-row items-center space-x-1"
      >
        <span>Donate</span>
        <Icon isOpen={isOpen} />
      </Button>
      <animated.div
        className="origin-top-right absolute right-0 mt-2 w-48 p-2 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex="-1"
        style={styles}
      >
        <ul role="none">
          <Item href="https://github.com/sponsors/alvarlagerlof" isOpen={isOpen}>
            GitHub
          </Item>
          <Item href="https://ko-fi.com/alvar" isOpen={isOpen}>
            Ko-fi
          </Item>
        </ul>
      </animated.div>
    </div>
  );
}
function Item({ href, isOpen, children }) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="block py-2 px-3 transition hover:bg-highlight rounded-md"
        tabIndex={isOpen ? "0" : "-1"}
      >
        {children}
      </a>
    </li>
  );
}

function Icon({ isOpen }) {
  const styles = useSpring({
    config: { mass: 1, tension: 180, friction: 12 },
    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
  });

  return (
    <animated.img
      aria-hidden
      alt=""
      src="/icons/plus.svg"
      width="20px"
      height="20px"
      className="!mr-[-6px]"
      style={styles}
    />
  );
}
