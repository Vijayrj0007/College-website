import apiClient from './apiClient';

export interface Alumni {
  _id: string;
  name: string;
  email: string;
  graduationYear: number;
  degree: string;
  department: string;
  currentCompany?: string;
  currentPosition?: string;
  location?: string;
  phone?: string;
  linkedin?: string;
  achievements?: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAlumniData {
  name: string;
  email: string;
  graduationYear: number;
  degree: string;
  department: string;
  currentCompany?: string;
  currentPosition?: string;
  location?: string;
  phone?: string;
  linkedin?: string;
  achievements?: string[];
  isActive?: boolean;
}

export interface UpdateAlumniData extends Partial<CreateAlumniData> {}

export interface AlumniListResponse {
  alumni: Alumni[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const fetchAlumni = async (page = 1, limit = 50, search = ''): Promise<Alumni[]> => {
  try {
    const response = await apiClient.get('/alumni', {
      params: { page, limit, search }
    });
    return response.data.alumni || response.data;
  } catch (error) {
    console.error('Error fetching alumni:', error);
    throw error;
  }
};

export const fetchAlumniById = async (id: string): Promise<Alumni> => {
  try {
    const response = await apiClient.get(`/alumni/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching alumni by ID:', error);
    throw error;
  }
};

export const addAlumni = async (alumniData: CreateAlumniData): Promise<Alumni> => {
  try {
    const response = await apiClient.post('/alumni', alumniData);
    return response.data;
  } catch (error) {
    console.error('Error adding alumni:', error);
    throw error;
  }
};

export const updateAlumni = async (id: string, alumniData: UpdateAlumniData): Promise<Alumni> => {
  try {
    const response = await apiClient.put(`/alumni/${id}`, alumniData);
    return response.data;
  } catch (error) {
    console.error('Error updating alumni:', error);
    throw error;
  }
};

export const deleteAlumni = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/alumni/${id}`);
  } catch (error) {
    console.error('Error deleting alumni:', error);
    throw error;
  }
};

export const searchAlumni = async (query: string, filters?: {
  department?: string;
  graduationYear?: number;
  degree?: string;
  isActive?: boolean;
}): Promise<Alumni[]> => {
  try {
    const response = await apiClient.get('/alumni/search', {
      params: { q: query, ...filters }
    });
    return response.data.alumni || response.data;
  } catch (error) {
    console.error('Error searching alumni:', error);
    throw error;
  }
};

export const getAlumniStats = async (): Promise<{
  total: number;
  active: number;
  byDepartment: Record<string, number>;
  byGraduationYear: Record<number, number>;
}> => {
  try {
    const response = await apiClient.get('/alumni/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching alumni stats:', error);
    throw error;
  }
};

