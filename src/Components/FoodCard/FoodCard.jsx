import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../Hooks/useCart";

const FoodCard = ({item}) => {
    const {image, name, recipe, price, _id} = item;
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const [, refetch] = useCart()

    const handleAddToCart = (item)=>{
        // console.log(item);
        if(user && user.email){
            const cartItem = {menuItemId: _id, name, price, image, email: user.email}
            fetch('http://localhost:5000/carts',{
                method: 'POST',
                headers:{
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
            .then(res => res.json())
            .then(data =>{
                if(data.insertedId){
                    refetch( ) //refetch cart to update the number of items in the cart
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Food Added On The Card Successfully',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
            })
        }
        else{
            Swal.fire({
                title: 'please login to order the food?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now!'
              }).then((result) => {
                if (result.isConfirmed) {
                 navigate('/login', {state: {from: location}})

                }
              })
        }
    }
    return (
        <div class="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes"/></figure>
            <p className="absolute right-0 bg-black px-3 m-5 text-white">${price}</p>
            <div class="card-body flex flex-col items-center">
                <h2 class="card-title">{name}</h2>
                <p>{recipe}</p>
                <div class="card-actions justify-end">
                    <button onClick={()=>handleAddToCart(item)} class="btn btn-outline bg-slate-100 border-0 border-b-4 border-orange-400">Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;