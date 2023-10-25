import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material';

const Week = styled('div')`
  display: flex;
  flex-direction: column;
`;

const Grid = styled('div')`
  display: flex;
`;

function ContributionGraph() {
  const [contributions, setContributions] = useState({});

  useEffect(() => {
    const getContributions = async () => {
      try {
        const { data } = await axios.get('https://dpg.gg/test/calendar.json');
        setContributions(data);
      } catch (error) {
        throw new Error(error);
      }
    };

    getContributions();
  }, []);

  return <Grid>test</Grid>;
}

export default ContributionGraph;
