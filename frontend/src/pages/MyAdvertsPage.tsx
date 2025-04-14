import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import State from "../store/state/types";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getAdverts } from "../store/actions/creators";

const myAdvertsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: State) => state.user);
    const adverts = useSelector((state: State) => state.adverts);

    useEffect(() => {
        if(!user.username) {
            navigate("/login");
        } else {
            const queryString = new URLSearchParams({
                username: user.username,
            }).toString();

            // @ts-expect-error Lo vamos a tipar más adelante
            dispatch(getAdverts(queryString));

        }
    }, [user.username, dispatch]);
    return (
        <div>
        <h1>My Adverts Page</h1>
        <p>This is the My Adverts page.</p>
        </div>
    );
    }
export default myAdvertsPage;