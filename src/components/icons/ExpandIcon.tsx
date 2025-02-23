import { Icon } from "@chakra-ui/react";

function ExpandIcon(): JSX.Element {
  return (
    <Icon>
      <svg viewBox="0 0 24 24">
        <g fill="none" strokeWidth="1.5" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
          />
        </g>
      </svg>
    </Icon>
  );
}

export default ExpandIcon;
