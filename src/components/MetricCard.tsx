import {
  Stat, Show
} from "@chakra-ui/react";

interface MetricCardProps {
  label: string;
  statistic: string | number;
  changePercentage: string | number;
  change: "increase" | "decrease";
}

function MetricCard({
  label,
  statistic,
  changePercentage,
  change,
}: MetricCardProps): JSX.Element {
  return (
    <Stat.Root>
      <Stat.Label>{label}</Stat.Label>
      <Stat.ValueText>{statistic.toLocaleString()}</Stat.ValueText>
      <Stat.HelpText>
        <Show when={change=="increase"} fallback={<Stat.DownIndicator />} >
          <Stat.UpIndicator />
        </Show> 
        {changePercentage.toLocaleString()}
      </Stat.HelpText>
    </Stat.Root>
  );
}

export default MetricCard;
