import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import menuImg from '../../../assets/menu/banner3.jpg'
import dessertImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'
import useMenu from '../../../Hooks/useMenu';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';

const Menu = () => {
    const [menu] = useMenu()
    const dessert = menu.filter(item => item.category === 'dessert')
    const soup = menu.filter(item => item.category === 'soup')
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const offered = menu.filter(item => item.category === 'offered')
    return (
        <div>
            <Helmet>
                <title> Speacial || Menu</title>
            </Helmet>
            <Cover title='our menu' img={menuImg}></Cover>
            {/* main cover */}
            <SectionTitle subHeading='Don`t miss' heading='today`s offfer'></SectionTitle>
            {/* offered menu item */}
            <MenuCategory items={offered}></MenuCategory>
            {/* desserts menu item */}
            <MenuCategory items={dessert} title='desserts' img={dessertImg}></MenuCategory>
            {/* pizza menu item */}
            <MenuCategory items={pizza} title='pizza' img={pizzaImg}></MenuCategory>
            {/* salad menu item */}
            <MenuCategory items={salad} title='salad' img={saladImg}></MenuCategory>
            {/* soup menu item */}
            <MenuCategory items={soup} title='soup' img={soupImg}></MenuCategory>
        </div>
    );
};

export default Menu;