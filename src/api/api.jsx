import axios from "axios";

export const getApi = async (route) => {
  try {
    const response = await axios.get(
      route
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const postProduct = async (route, formData) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/v1/registerusert`,
      formData, 
      {
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
      }
    ); 
    return response.data;
  } catch (error) {
    console.error("Error al guardar el producto:", error);
    throw error;
  }
};
export const postAmbiente = async (route, formData) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/space/register`,
      formData, 
      {
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al guardar el producto:", error);
    throw error;
  }
};


export const postApi = async (route, jsonData) => {
  console.log(jsonData);
  try {
    const response = await axios.post(
      //`${import.meta.env.VITE_BACKEND_PRODUCT}/${route}`,
      route,
      jsonData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesion:", error);
    throw error;
  }
};
export const deleteApi = async ( route) => {
  try {
    const response = await axios.delete(
      route,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw error;
  }
};
export const putApi = async (route, formData) => {
  try {
    const response = await axios.put(
      route,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("FormDATA: ", formData);
    return response.data;
  } catch (error) {
    console.error("Error al editar el producto:", error);
    throw error;
  }
};

