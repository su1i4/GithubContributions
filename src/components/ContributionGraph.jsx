import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material';
import ContributionCell from './ContributionCell';

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

  const renderCells = () => {
    const dates = Object.keys(contributions);
    const weeks = [];

    for (let i = 0; i < dates.length; i += 7) {
      const week = dates.slice(i, i + 7);
      weeks.push(week);
    }

    return weeks.map((week, index) => (
      <Week key={index}>
        {week.map((date) => (
          <ContributionCell
            key={date}
            date={date}
            count={contributions[date]}
          />
        ))}
      </Week>
    ));
  };

  return <Grid>{renderCells()}</Grid>;
}

export default ContributionGraph;
