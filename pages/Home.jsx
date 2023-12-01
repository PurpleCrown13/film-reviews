import MovieCard from '../components/MovieCard'
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

const Home = () => {
    return (
        <motion.div
            initial={{
                opacity: 0,
                
            }}
            animate={{
                opacity: 1,
            }}
            
        >
            <Helmet>
                <title>
                    Film Reviews
                </title>
            </Helmet>
            <MovieCard />
        </motion.div>
        
    );
}

export default Home;