import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow
} from '@chakra-ui/react'

interface MetricCardProps {
  label: string
  statistic: string | number
  changePercentage: string | number
  change: 'increase' | 'decrease'
}

function MetricCard ({
  label,
  statistic,
  changePercentage,
  change
}: MetricCardProps): JSX.Element {
  return (
    <Stat>
      <StatLabel>{label}</StatLabel>
      <StatNumber>{statistic.toLocaleString()}</StatNumber>
      <StatHelpText>
        <StatArrow type={change} />
        {changePercentage.toLocaleString()}
      </StatHelpText>
    </Stat>
  )
}

export default MetricCard
