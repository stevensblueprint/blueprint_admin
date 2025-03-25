import { Icon } from "@chakra-ui/react";

function PerformanceIcon(): JSX.Element {
  return (
    <Icon
      fill="white"
      viewBox="10 -2 5 30"
      strokeWidth="0.5"
      stroke="currentColor"
    >
      <svg>
        <path d="M 12 2 C 6.486 2 2 6.486 2 12 C 2 14.757 3.1216406 17.257359 4.9316406 19.068359 L 6.3457031 17.654297 C 4.8967031 16.206297 4 14.206 4 12 C 4 7.589 7.589 4 12 4 C 16.411 4 20 7.589 20 12 C 20 14.206 19.103297 16.206297 17.654297 17.654297 L 19.068359 19.068359 C 20.878359 17.257359 22 14.757 22 12 C 22 6.486 17.514 2 12 2 z M 15.292969 7.2929688 L 10 12 L 12 14 L 16.707031 8.7070312 L 15.292969 7.2929688 z" />
      </svg>
    </Icon>
  );
}

export default PerformanceIcon;
