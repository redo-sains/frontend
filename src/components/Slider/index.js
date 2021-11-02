import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Slider = () => {

    const responsive = {
        desktop: {
            breakpoint: {max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: {max: 1024, min: 320 },
            items: 3
        },
        mobile: {
            breakpoint: {max: 320, min: 0 },
            items: 2
        }
    };

    return (
        <div>
            <Carousel responsive={responsive}
            centerMode={true}
            swipeable={true}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            // autoPlay={this.props.deviceType !== "mobile" ? true : false}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            // deviceType={this.props.deviceType}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            >
                <div>Item 1</div>
                <div>Item 2</div>
                <div>Item 3</div>
                <div>Item 5</div>
                <div>Item 6</div>
                <div>Item 7</div>
                <div>Item 8</div>
            </Carousel>
        </div>
    )
}

export default Slider;