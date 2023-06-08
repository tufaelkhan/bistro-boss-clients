import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import { Link } from "react-router-dom";
const MenuCategory = ({ items, title, img}) => {

    return (
        <div className="pt-8">
            {title && <Cover title={title} img={img}></Cover>}
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-10 mt-16 mb-8">
                {
                    items.map(item => <MenuItem key={item._id}
                        item={item}></MenuItem>)
                }
            </div>
            <Link to={`/order/${title}`}><button className="btn btn-outline mt-5 border-0 border-b-4">order now!</button></Link>
        </div>
    );
};

export default MenuCategory;