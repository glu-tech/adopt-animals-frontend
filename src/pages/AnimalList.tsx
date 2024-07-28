import React, { useState, useEffect } from 'react';
import { Container, CircularProgress, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { fetchAnimals, changeStatus } from '../services/AnimalService';
import { Animal } from '../models/Animal';
import { Link } from 'react-router-dom';

const AnimalList: React.FC = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [isChangingStatus, setIsChangingStatus] = useState(false);

  useEffect(() => {
    const getAnimals = async () => {
      setLoading(true);
      try {
        const response = await fetchAnimals(page, size);
        setAnimals(response.data.content); 
        setTotalPages(response.data.totalPages - 1);
      } finally {
        setLoading(false);
      }
    };

    getAnimals();
  }, [page, size]);

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleChangeStatus = async (id: number) => {
    setIsChangingStatus(true);
    try {
      await changeStatus(id, 'adopted');
      setAnimals(animals.map(animal => animal.id === id ? { ...animal, status: 'adopted' } : animal));
    } finally {
      setIsChangingStatus(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Animal List
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Birth Date</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {animals.map(animal => (
              <TableRow key={animal.id}>
                <TableCell>{animal.id}</TableCell>
                <TableCell>
                  <Link 
                    to={`/animals/${animal.id}`} 
                    style={{ color: 'blue', textDecoration: 'none', cursor: 'pointer' }}
                  >
                    {animal.name}
                  </Link>
                </TableCell>
                <TableCell>{animal.description}</TableCell>
                <TableCell>{animal.category}</TableCell>
                <TableCell>{new Date(animal.birthDate).toLocaleDateString()}</TableCell>
                <TableCell>{animal.age}</TableCell>
                <TableCell>{animal.status}</TableCell>
                <TableCell>
                  {animal.status === 'available' && (
                    <Button
                      onClick={() => handleChangeStatus(animal.id)}
                      disabled={isChangingStatus}
                    >
                      Adopt
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <div style={{ marginTop: '16px' }}>
        <Button onClick={handlePreviousPage} disabled={page === 0}>Previous</Button>
        <Button onClick={handleNextPage} disabled={page >= totalPages}>Next</Button>
      </div>
    </Container>
  );
};

export default AnimalList;
