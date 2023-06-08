
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../Hooks/useMenu";

const PopularMenu = () => {
    const [menu] = useMenu()
    const popular = menu.filter(item => item.category === 'popular')

    return (
        <section className="mb-12">
            <SectionTitle heading='From Our Menu' subHeading='popular items'></SectionTitle>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-10">
            {
                popular.map(item => <MenuItem key={item._id} 
                    item={item}></MenuItem>)
            }
            </div>
            <div className="text-center">
            <button className="btn btn-outline mt-5 border-0 border-b-4">view full menu!</button>
            </div>
        </section>
    );
};

export default PopularMenu;