import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress, Box } from '@mui/material';
import { fetchAnimalById } from '../services/AnimalService';
import { Animal } from '../models/Animal';

const AnimalDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAnimal = async () => {
      setLoading(true);
      try {
        const response = await fetchAnimalById(Number(id));
        setAnimal(response);
      } finally {
        setLoading(false);
      }
    };

    getAnimal();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!animal) {
    return <Typography variant="h6">Animal not found</Typography>;
  }

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {animal.name}
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Description:</strong> {animal.description}
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Category:</strong> {animal.category}
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Birth Date:</strong> {new Date(animal.birthDate).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Age:</strong> {animal.age}
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Status:</strong> {animal.status}
        </Typography>
        <Box
          component="img"
          src={animal.urlImage}
          alt={animal.name}
          sx={{ width: '30%', mt: 4 }}
        />
      </Box>
    </Container>
  );
};

export default AnimalDetail;
