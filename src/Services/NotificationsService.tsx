import { toast } from "react-toastify";

class NotificationsService {

    public errorNotification(msg: string): void {
        toast.error(msg, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
        });
    }

    public successNotification(msg: string): void {
        toast.success(msg, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
        });
    }
}

const notificationsService = new NotificationsService();
export default notificationsService;