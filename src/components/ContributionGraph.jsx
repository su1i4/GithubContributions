import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material';
import { Select, MenuItem } from '@mui/material';
import ContributionCell from './ContributionCell';
import { daysOfWeek, months } from '../constants/general';

function formatDateToISO(date) {
  return date.toISOString().split('T')[0];
}

function ContributionGraph() {
  const [contributions, setContributions] = useState({});
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const getContributions = async () => {
      try {
        const { data } = await axios.get('https://dpg.gg/test/calendar.json');
        setContributions(data);
      } catch (error) {
        console.error(error);
      }
    };

    getContributions();
  }, [selectedYear]);

  const getAllDatesOfYear = (year) => {
    const startDate = new Date(year, 3, 1);
    const endDate = new Date(year + 1, 2, 31);
    const dates = [];

    while (startDate <= endDate) {
      dates.push(new Date(startDate));
      startDate.setDate(startDate.getDate() + 1);
    }

    return dates;
  };

  const renderCells = () => {
    const dates = getAllDatesOfYear(selectedYear);
    const weeks = [];
    const daysInAWeek = 7;

    const emptyCellsBefore = (dates[0].getDay() + 5) % 7;

    for (let i = 0; i < emptyCellsBefore; i++) {
      dates.unshift(null);
    }

    for (let i = 0; i < dates.length; i += daysInAWeek) {
      const week = dates
        .slice(i, i + daysInAWeek)
        .map((date) => (date ? formatDateToISO(date) : null));
      weeks.push(week);
    }
    return weeks.map((week, index) => (
      <Week key={index}>
        {week.map((date, dateIndex) => (
          <ContributionCell
            key={date || dateIndex}
            date={date}
            count={date ? contributions[date] || 0 : 0}
          />
        ))}
      </Week>
    ));
  };

  const contributionYears = Object.keys(contributions)
    .map((date) => parseInt(date.split('-')[0], 10))
    .filter((year, index, self) => self.indexOf(year) === index)
    .sort((a, b) => b - a);

  return (
    <Container>
      <div className="select-container">
        <Select
          size="small"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {contributionYears.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </div>

      <Months>
        {months.map((month, index) => (
          <span key={index}>{month}</span>
        ))}
      </Months>

      <Grid>
        <DaysOfWeek>
          {daysOfWeek.map((day, index) => (
            <DayName key={index}>{day}</DayName>
          ))}
        </DaysOfWeek>
        {renderCells()}
      </Grid>
    </Container>
  );
}

export default ContributionGraph;

const Week = styled('div')`
  display: flex;
  flex-direction: column;
`;

const Grid = styled('div')`
  display: flex;
`;

const Months = styled('div')`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 10px;
  color: #959494;
  padding-left: 30px;
`;

const DaysOfWeek = styled('div')`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
`;

const DayName = styled('div')`
  height: 24px;
  display: flex;
  align-items: center;
`;

const Container = styled('div')`
  border-radius: 20px;
  padding: 20px 30px 40px 30px;
  background: #ffffff;
  .select-container {
    display: flex;
    justify-content: end;
    padding: 7px 10px;
  }
`;
