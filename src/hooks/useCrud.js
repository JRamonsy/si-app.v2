import axios from "axios";
import { useState } from "react";

const useCrud = (BASE_URL) => {
  const [response, setResponse] = useState([]);

  const getApi = async (path) => {
    const url = `${BASE_URL}${path}`;
    try {
      const res = await axios.get(url);
      setResponse(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const postApi = async (path, data) => {
    const url = `${BASE_URL}${path}`;
    try {
      const res = await axios.post(url, data);
      // console.log(res.data);
      setResponse((prevResponse) => [...prevResponse, res.data]);
      return res.data; // Devuelve los datos de la respuesta
    } catch (err) {
      console.error("Error en postApi:", err.response?.data || err.message);
      throw err; // Lanza el error para que sea capturado en `Submit`
    }
  };

  const deleteApi = async (path, id) => {
    const url = `${BASE_URL}${path}${id}/`;
    try {
      // console.log('Deleting resource at:', url);
      const res = await axios.delete(url);
      // console.log(res.data);
      setResponse((prevResponse) => prevResponse.filter(info => info.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const updateApi = async (path, id, data, isImage = false) => {
    const url = `${BASE_URL}${path}${id}/`;
    try {
      let config = {};
      let payload = data;
  
      if (isImage) {
        payload = new FormData();
        Object.keys(data).forEach(key => {
          payload.append(key, data[key]);
        });
        config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
      }
  
      const res = await axios.put(url, payload, config);
      console.log(res.data);
      setResponse((prevResponse) =>
        prevResponse.map(info => info.id === id ? res.data : info)
      );
    } catch (err) {
      console.error(err);
    }
  };
  
  

  return [response, getApi, postApi, deleteApi, updateApi];
};

export default useCrud;
