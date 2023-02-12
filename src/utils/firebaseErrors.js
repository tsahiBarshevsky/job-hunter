import { toast } from "react-toastify";

const notify = (message) => {
    switch (message) {
        case 'Firebase: Error (auth/email-already-in-use).':
            toast.error('Email is already in use');
            break;
        case 'Firebase: Error (auth/invalid-email).':
            toast.error('Bad email format');
            break;
        case 'Firebase: Error (auth/user-not-found).':
            toast.error("Invalid email or doesn't exists");
            break;
        case 'Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).':
            toast.error("Invalid or incorrect password");
            break;
        case 'Firebase: Error (auth/internal-error).':
            toast.error("Internal error");
            break;
        case 'Firebase: Error (auth/wrong-password).':
            toast.error("Wrong password");
            break;
        case 'Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).':
            toast.error("There is no user record corresponding to this identifier");
            break;
        case 'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).':
            toast.error("Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.");
            break;
        default:
            return null;
    }
}

export { notify };