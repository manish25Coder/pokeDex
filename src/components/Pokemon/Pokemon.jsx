import { Link } from "react-router-dom";
import "./Pokemon.css"
function Pokemon({name, image, id}) {
    return(
        <div className="pokemon">
            <Link to={`/pokemon/${id}`}>
                <div className="pokemon-names">{name}</div>
                <div>
                    <img className="pokemon-img" src={image}/>
                </div>
            </Link>
        </div>
       
    )
}
export default Pokemon;