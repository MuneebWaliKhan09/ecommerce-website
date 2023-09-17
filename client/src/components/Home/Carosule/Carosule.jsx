import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css"
import "../../../../node_modules/bootstrap-icons/font/bootstrap-icons.css"
import './car.css';

const Carosule = () => {

    const images = [
        'https://source.unsplash.com/1900x1200/?shoes,shoes',
        'https://source.unsplash.com/1900x1200/?women,fashion',
        'https://source.unsplash.com/1900x1200/?mens,fashion',
    ];

    return (
        <div>
            <Carousel
                infiniteLoop
                autoPlay
                showThumbs={false}
                showStatus={false}
                showIndicators={false}
            >
                {images.map((image, index) => (
                    <div key={index} className='caroules'>
                        <img src={image} alt={`Slide ${index + 1}`} />
                        <div className="carousel-caption pt-4">
                            <h5>Discover the Perfect Gift for Every Occasion</h5>
                            <p> From birthdays to anniversaries, our wide range of products ensures you'll find the perfect present that will bring joy and smiles.</p>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default Carosule