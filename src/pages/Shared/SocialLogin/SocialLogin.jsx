import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const SocialLogin = () => {
    const {singINWithGoogle} = useContext(AuthContext);

    const handleGoogle = () => {
        singINWithGoogle()
        .then(result => {
            console.log(result.user);
        })
        .catch(error => {
            console.log(error);
        })
    }
    return (
        <div>
            <div className="divider">OR</div>
            <div className="text-center">
                <button onClick={handleGoogle} className="btn btn-circle btn-outline font-bold text-blue-600 text-2xl">
                    G
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;