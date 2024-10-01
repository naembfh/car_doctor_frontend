
import DiscountComponent from '../components/DiscountComponent';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import PopularServices from '../components/PopularServices';
import Reviews from '../components/Reviews';


const Home = () => {
    return (
        <>
            <HeroSection></HeroSection>
            <PopularServices></PopularServices>
            <Reviews></Reviews>
            <DiscountComponent></DiscountComponent>
            <Footer></Footer>
        </>
    );
};

export default Home;