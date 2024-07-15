import Swal from "sweetalert2";

export const showAlert = (title, text, icon = 'info') => {
    Swal({
        title: title,
        text: text,
        icon: icon,
        button: 'Aceptar',
    });
};

export const messageBasic = (icon = "success", message = "", position = "center", btnConfirm = true, time = false) => {
    Swal.fire({
        position: position,
        icon: icon,
        title: message,
        showConfirmButton: btnConfirm,
        timer: time
    });
}
