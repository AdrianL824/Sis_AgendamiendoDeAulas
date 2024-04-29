import Swal from "sweetalert2";

export const Danger = {
  showError: (message) => {
    // Cambiado de showSuccess a showError
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-start",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "error", // Cambiado de "danger" a "error"
      title: message,
    });
  },
};
