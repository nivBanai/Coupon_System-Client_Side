import { Link } from "react-router-dom";
import "./Page404.css";

function Page404(): JSX.Element {

    return (
        <div className="Page404 FlexColPage">

            <h1 id="error404">Error 404 - Page Not Found</h1>

            <h2>Even Our Queenpins Couldn't Find The Page You Are Looking For...</h2>

            <img src="https://m.media-amazon.com/images/M/MV5BYzRkY2IzNGYtZWUzMy00NDkyLWE4N2ItYjQ0ZWFhMTA3ZWZmXkEyXkFqcGdeQXNuZXNodQ@@._V1_.jpg" alt="N/A" />

            <Link to={"home"}>Go Back Home</Link>


        </div>
    );
}

export default Page404;
