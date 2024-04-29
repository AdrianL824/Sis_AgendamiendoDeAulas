import jwt from "jsonwebtoken";

function verifyAuthToken(authToken) {
  const secret = "tu_secreto_secreto"; // Debe coincidir con la clave secreta que se usó para firmar el token

  try {
    const decoded = jwt.verify(authToken, secret);
    return decoded;
  } catch (error) {
    // El token no es válido
    return null;
  }
}

// Uso de la función para verificar un token
const authToken = "token_de_ejemplo"; // Reemplaza con un token válido
const decodedToken = verifyAuthToken(authToken);

if (decodedToken) {
  console.log("Token válido. Datos decodificados:", decodedToken);
} else {
  console.log("Token no válido o expirado.");
}
