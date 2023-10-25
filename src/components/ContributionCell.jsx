import { styled } from '@mui/material';

function ContributionCell({ date, count }) {
  return <Cell count={count} />;
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
`;
