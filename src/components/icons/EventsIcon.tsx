import { Icon } from "@chakra-ui/react";

function EventsIcon(): JSX.Element {
  return (
    <Icon>
      <svg viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeWidth="1.5">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 5h16M4 9h16M4 13h8M4 17h8"
          />
          <rect width="16" height="16" x="4" y="4" rx="2" />
        </g>
      </svg>
    </Icon>
  );
}

export default EventsIcon;
