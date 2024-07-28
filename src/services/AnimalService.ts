import axios from 'axios';
import { Animal } from '../models/Animal';

const API_URL = 'http://localhost:8080/animals';

export const createAnimal = async (formData: FormData) => {
    return axios.post(`${API_URL}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
    });
};

export const fetchAnimals = (page = 1, size = 10) => {
    return axios.get(`${API_URL}?page=${page}&size=${size}`);
};

export const changeStatus = async (id: number, status: string) => {
    const response = await axios.patch(`${API_URL}/${id}/status`, { status }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data as Animal;
};

export const fetchAnimalById = async (id: number): Promise<Animal> => {
    const response = await axios.get<Animal>(`${API_URL}/${id}`);
    return response.data as Animal;
};