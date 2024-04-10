'use client'

import { Box, Button, Container } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { Grid } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
// import InvoicesTable from '@/features/invoices/InvoicesTable/Table';
// import { sumInvoices } from '@/repository/local/invoices/invoices_summary/data/summary';
import { useState } from 'react';
import { PatientsStats } from './types/PatientsStats';
import ReceptionsTable from './Table/Table';
import { Reception } from './Table/types/Reception';

type PatientsListProps = {
  patientsStats: PatientsStats;
  receptions: Reception[];
}

const Receptions = ({ patientsStats, receptions }: PatientsListProps) => {
  const [filterStatus, setFilterStatus] = useState('');

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ mb: '3em' }}>
          <h1 style={{ margin: 0 }}>Invoices</h1>
          <p style={{ margin: 0 }}>View all the information related to the company invoices</p>
        </Box>
        <Box sx={{ width: '100%', height: { xs: 'auto', lg: '12em' }, backgroundColor: "background.main", borderRadius: '10px', mb: '2em', boxShadow: 1 }}>
          <Grid container spacing={2} >

            <Grid item xs={12} lg={6} sx={{ height: '100%' }}>

              <PieChart
                slotProps={{
                  legend: {
                    direction: 'row',
                    position: { vertical: 'top', horizontal: 'right' },
                    padding: { left: 240, right: 0, top: 50 },
                    itemMarkHeight: 20,
                    itemMarkWidth: 20,
                    itemGap: 30,
                    labelStyle: { fontFamily: 'inherit', fontStyle: 'normal', fontWeight: '500', fontSize: 14 },
                  },
                }}
                height={300} width={540}
                onClick={(data, pieItemIdentifier) => {
                  switch (pieItemIdentifier.dataIndex) {
                    case 0:
                      setFilterStatus('All');
                      break;
                    case 1:
                      setFilterStatus('Overdue');
                      break;
                    case 2:
                      setFilterStatus('Pending');
                      break;
                    case 3:
                      setFilterStatus('Paid');
                      break;
                    default:
                      break;
                  }
                }}
                series={[
                  {
                    data: [
                      { id: 0, value: patientsStats.total, label: `$${patientsStats.total}\n All Total      `, color: 'lightblue' },
                      { id: 1, value: patientsStats.overdue, label: `$${patientsStats.overdue}\n Total Overdue`, color: 'salmon' },
                      { id: 2, value: patientsStats.pending, label: `$${patientsStats.pending}\n Total Pending`, color: 'lime' },
                      { id: 3, value: patientsStats.paid, label: `$${patientsStats.paid}\n Total Paid`, color: 'khaki' },
                    ],
                    innerRadius: 40,
                    outerRadius: 70,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    startAngle: -180,
                    endAngle: 180,
                    cx: 120,
                    cy: 90,

                  }]
                }
              />

            </Grid>
            <Grid item xs={12} lg={6}>
              {/* <BarChart
                xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                width={500}
                height={200}
              /> */}
              {/* <BarChart
                dataset={dataset}
                xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                series={[
                  { dataKey: 'london', label: 'London', valueFormatter },
                  { dataKey: 'paris', label: 'Paris', valueFormatter },
                  { dataKey: 'newYork', label: 'New York', valueFormatter },
                  { dataKey: 'seoul', label: 'Seoul', valueFormatter },
                ]}
                {...chartSetting}
              /> */}
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', }}>
          <Box sx={{ width: '100%' }}>
            {/* <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1em' }}> */}
            <ReceptionsTable filterStatus={filterStatus} receptions={receptions} />
            {/* </div> */}
          </Box>
        </Box>




      </Box >
      <Button variant="contained">Contained</Button>
    </>
  )
}
export default Receptions