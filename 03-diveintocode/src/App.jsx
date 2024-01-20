import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';
import About from './components/Body/About';
import Contact from './components/Body/Contact';
import Error from './components/Body/Error';
import Cart from './components/Body/Cart';
import RestaurantMenu from './components/Body/RestaurantMenu';

const App = () => {
  return (
    <Router>
      <div className='app'>
        <Header />
        <Routes>
          <Route path='/' element={<Body />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/restaurants/:resId' element={<RestaurantMenu />}  />
          <Route path='*' element={<Error />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;