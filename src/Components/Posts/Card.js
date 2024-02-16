import * as React from 'react';
import { useContext } from 'react';
import {Card,IconButton} from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Heart from '../../assets/Heart';
import {FavoriteBorder} from '@mui/icons-material';
import {PostContext} from "../../context/postContext"
import { useNavigate } from 'react-router-dom';
export default function MediaCard({product}) {
  const navigate = useNavigate()
  const {setPostDetails} = useContext(PostContext)
  return (
    <Grid className='mx-auto' item xs={12} sm={6} md={4} lg={3} xl={2} >
      <div  onClick={()=>{
      setPostDetails(product);
      navigate('/view')
    }}>
    <Card className='p-2' sx={{ maxWidth: 260,minWidth:260,margin:1, maxHeight:340 }}>
    <IconButton  sx={{position:'absolute',backgroundColor:'white'}} aria-label="fingerprint" color="default">
        <FavoriteBorder color='disabled' />
      </IconButton>
      <CardMedia
        className='border'
        sx={{ height: 140, }}
        image={product.url}
        title="green iguana"
      />
      
      <CardContent>
        <Typography  variant="h6" sx={{fontWeight:600}} component="">
        &#x20B9; {product.price}
        </Typography>
        <Typography variant="body3" color="text.secondary">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.category}
        </Typography>
        <div className='d-flex justify-content-between mt-3'>
        <Typography sx={{fontSize:11}} variant="subtitle2" color="text.secondary">
          CHENNAI,TAMILNADU
        </Typography>
        <Typography sx={{fontSize:11}} variant="subtitle2" color="text.secondary">
          {product.createdAt}
        </Typography>
        </div>
      </CardContent>
    </Card>
    </div>
    </Grid>
  );
}