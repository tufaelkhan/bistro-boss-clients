import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import featuredImg from '../../../assets/home/featured.jpg'
import './Featured.css'

const Featured = () => {
    return (
        <div className="featured-item bg-fixed text-white mb-14 pt-8">
            <SectionTitle subHeading='check it out' heading='featured item'></SectionTitle>
            <div className="md:flex justify-center bg-opacity-40 bg-slate-500 items-center pt-12 pb-14 px-32">
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className="md:ml-10">
                    <p>Aug 20, 2029</p>
                    <p className="uppercase">where can i get some?</p>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor accusamus tempore ex dicta accusantium, delectus ipsa quos blanditiis perferendis recusandae temporibus sint quibusdam ea voluptas praesentium explicabo, nisi tenetur ullam.</p>
                    <button className="btn btn-outline mt-5 border-0 border-b-4">order now!</button>
                </div>
            </div>

        </div>
    );
};

export default Featured;