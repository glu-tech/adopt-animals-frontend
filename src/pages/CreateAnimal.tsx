import React, { useState } from 'react';
import { TextField, Button, MenuItem, Container, Typography, CircularProgress } from '@mui/material';
import { createAnimal } from '../services/AnimalService';

const CreateAnimal = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    birthDate: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); 

    if (selectedFile) {
      const formData = new FormData();
      formData.append('animal', JSON.stringify(form));
      formData.append('file', selectedFile);

      try {
        await createAnimal(formData);
        alert('Animal registered successfully');
      } catch {
        alert('There was an error registering the animal.');
      } finally {
        setLoading(false); 
      }
    }
  };

  return (
    <Container className="mt-8 p-4 bg-white rounded shadow-md">
      <Typography variant="h4" className="text-2xl font-bold mb-4">Register Animal</Typography>
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          label="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          margin="normal"
          select
        >
          <MenuItem value="dog">Dog</MenuItem>
          <MenuItem value="cat">Cat</MenuItem>
        </TextField>
        <TextField
          label="Birth Date"
          name="birthDate"
          type="date"
          value={form.birthDate}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div style={{ marginBottom: '16px' }}>
          <Button variant="contained" component="label">
            Upload Image
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          {selectedFile && <Typography>{selectedFile.name}</Typography>}
        </div>
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          Register
        </Button>
        {loading && <CircularProgress style={{ marginLeft: 16 }} />}
      </form>
    </Container>
  );
};

export default CreateAnimal;
