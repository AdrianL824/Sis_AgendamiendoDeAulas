import Swal from "sweetalert2";

export const Warning = {
  showWarning: () => {
    return Swal.fire({
      title: "ESTA SEGURO DE ELIMINAR?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si,seguro",
      cancelButtonText: "No",
    }).then((result) => {
      return result.isConfirmed; // Devuelve directamente el valor booleano
    });
  },
};
