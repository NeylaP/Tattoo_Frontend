import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';

const Cards = ({ image, title, description }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <Card sx={{ maxWidth: 350, maxHeight: 380 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={title}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {showFullDescription ? description : `${description.substring(0, 80)}...`}
          </Typography>
          {description.length > 80 && (
            <Button size="small" color="primary" onClick={toggleDescription}>
              {showFullDescription ? 'Ver menos' : 'Ver más'}
            </Button>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Cards;