import * as React from 'react';
import {Skeleton,Grid} from '@mui/material';
import Stack from '@mui/material/Stack';

export default function Skeletonn() {
  return (
    <Grid className='mx-auto' item xs={12} sm={6} md={4} lg={3} xl={2} >
      <Stack className='p-2' spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton animation='wave' variant="rectangular" width={260} height={150} />
      <Skeleton variant="text" width={130} height={40} />
      <Skeleton className='mt-3' variant="text" width={260} height={34} />
      <div className='d-flex mt-2'>
      <Skeleton variant="text" width={260} height={20} />
      </div>

    </Stack>
    </Grid>
  );
}