
import DiscountComponent from '../components/DiscountComponent';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import PopularServices from '../components/PopularServices';
import HomeReviews from '../components/HomeReviews';


const Home = () => {
    return (
        <>
            <HeroSection></HeroSection>
            <PopularServices></PopularServices>
           <HomeReviews></HomeReviews>
            <DiscountComponent></DiscountComponent>
            <Footer></Footer>
        </>
    );
};

export default Home;