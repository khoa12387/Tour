import {
  DataProvider, DeleteParams, DeleteResult, GetListParams, GetOneParams,
  UpdateParams, CreateParams, GetManyParams, UpdateManyParams, DeleteManyParams,
  RaRecord, GetManyResult, UpdateManyResult, DeleteManyResult
} from 'react-admin';
import axios from 'axios';

// API URL
const apiUrl = 'http://127.0.0.1:8000'; // Replace with your API URL
const getToken = () => localStorage.getItem('token');

// Axios interceptor to automatically add the Authorization header
axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const dataProvider: DataProvider = {
  getList: async (resource, params: GetListParams) => {
    try {
      const { pagination = { page: 1, perPage: 10 }, sort, filter } = params;
      let results: any[] = [];
      let total: number = 0;
      let page = pagination.page;
      let pageSize = pagination.perPage;
      let moreData = true;

      while (moreData) {
        const response = await axios.get(`${apiUrl}/${resource}/`, {
          params: {
            ...filter,
            ...sort,
            page,
            page_size: pageSize,  // Adjust based on your API's pagination parameters
          },
        });

        results = results.concat(response.data.results);  // Collect all results
        total = response.data.count;  // Total count from the API

        if (results.length >= total) {
          moreData = false;  // Stop if we've fetched all data
        } else {
          page++;
        }
      }

      return {
        data: results,
        total,
      };
    } catch (error) {
      console.error('Error fetching list:', error);
      throw new Error('Error fetching list');
    }
  },

  getOne: async (resource, params: GetOneParams) => {
    try {
      const response = await axios.get(`${apiUrl}/${resource}/${params.id}/`);
      return { data: response.data };
    } catch (error) {
      console.error('Error fetching one:', error);
      throw new Error('Error fetching one');
    }
  },

  create: async (resource, params: CreateParams) => {
    try {
      const response = await axios.post(`${apiUrl}/${resource}/`, params.data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return { data: response.data };
    } catch (error) {
      console.error('Error creating record:', error);
      throw new Error('Error creating record');
    }
  },

  update: async (resource: string, params: UpdateParams) => {
    try {
      const response = await axios.put(`${apiUrl}/${resource}/${params.id}/`, params.data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return { data: response.data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data || error.message);
      } else {
        console.error('Unexpected error:', error);
      }
      throw new Error('Error updating record');
    }
  },

  delete: async <RecordType extends RaRecord = any>(resource: string, params: DeleteParams<RecordType>): Promise<DeleteResult<RecordType>> => {
    try {
      await axios.delete(`${apiUrl}/${resource}/${params.id}/`);
      return { data: { id: params.id } as any };
    } catch (error) {
      console.error('Error deleting record:', error);
      throw new Error('Error deleting record');
    }
  },

  getMany: async <RecordType extends RaRecord = any>(resource: string, params: GetManyParams<RecordType>): Promise<GetManyResult<RecordType>> => {
    try {
      const responses = await Promise.all(params.ids.map(id => axios.get(`${apiUrl}/${resource}/${id}/`)));
      return { data: responses.map(response => response.data) };
    } catch (error) {
      console.error('Error fetching many records:', error);
      throw new Error('Error fetching many records');
    }
  },

  getManyReference: async <RecordType extends RaRecord = any>(resource: string, params: { target: string; id: any }): Promise<GetManyResult<RecordType>> => {
    try {
      const response = await axios.get(`${apiUrl}/${resource}/`, { params: { [params.target]: params.id } });
      return {
        data: response.data.results,  // Extract the results array
      };
    } catch (error) {
      console.error('Error fetching many references:', error);
      throw new Error('Error fetching many references');
    }
  },

  updateMany: async <RecordType extends RaRecord = any>(resource: string, params: UpdateManyParams<RecordType>): Promise<UpdateManyResult<RecordType>> => {
    try {
      const responses = await Promise.all(params.ids.map(id => axios.put(`${apiUrl}/${resource}/${id}/`, params.data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })));
      return { data: responses.map(response => response.data.id) };
    } catch (error) {
      console.error('Error updating many records:', error);
      throw new Error('Error updating many records');
    }
  },

  deleteMany: async <RecordType extends RaRecord = any>(resource: string, params: DeleteManyParams<RecordType>): Promise<DeleteManyResult<RecordType>> => {
    try {
      await Promise.all(params.ids.map(id => axios.delete(`${apiUrl}/${resource}/${id}/`)));
      return { data: params.ids };
    } catch (error) {
      console.error('Error deleting many records:', error);
      throw new Error('Error deleting many records');
    }
  },
};

export { dataProvider };
