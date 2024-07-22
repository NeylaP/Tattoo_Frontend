import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Grid } from '@mui/material';

const Cards = ({ image, title, description }) => {

  return (
        <CardActionArea component="a" href="#">
          <Card sx={{ display: 'flex' }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography component="h2" variant="h5">
              {title}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {description}
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
              image={image}
              alt={title}
            />
          </Card>
        </CardActionArea>
  );
};

export default Cards;