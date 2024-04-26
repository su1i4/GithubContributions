import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material';

function CustomTooltipContent({ date, count }) {
  return (
    <ContainerContentTooltip>
      <span className="counts">{`${count || 0} contributions`}</span>
      <span className="date">{date}</span>
    </ContainerContentTooltip>
  );
}

function ContributionCell({ date, count }) {
  if (date === null) {
    return <Cell count={count} date={date} />;
  }

  const formatDate = new Date(date).toLocaleDateString('ru-RU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Tooltip
      placement="top"
      arrow
      title={<CustomTooltipContent date={formatDate} count={count} />}
    >
      <Cell count={count} date={date} />
    </Tooltip>
  );
}

export default ContributionCell;

const Cell = styled('div')`
  width: 20px;
  height: 20px;
  margin: 2px;
  cursor: pointer;
  background-color: ${({ count }) => {
    if (!count) return '#ededed';
    if (count >= 1 && count <= 9) return '#acd5f2';
    if (count >= 10 && count <= 19) return '#7ea8c9';
    if (count >= 20 && count <= 29) return '#527ba0';
    if (count >= 30) return '#254e77';
  }};
  background-color: ${({ date }) => {
    if (date === null) return '#ffffff';
  }};
  cursor: ${({ date }) => {
    if (date === null) return 'default';
  }};
`;

const ContainerContentTooltip = styled('div')`
  display: flex;
  padding: 5px 8px;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  .counts {
    color: #ffffff;
    font-size: 1rem;
  }
  .date {
    color: #7c7c7c;
    font-size: 0.8rem;
  }
`;
