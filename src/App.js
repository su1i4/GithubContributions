import { styled } from '@mui/material';
import ContributionGraph from './components/ContributionGraph';

function App() {
  return (
    <StyledApp>
      <ContributionGraph />
    </StyledApp>
  );
}

export default App;

const StyledApp = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: 'Raleway', sans-serif;
  background: #0d1116;
  margin: 0;
`;
