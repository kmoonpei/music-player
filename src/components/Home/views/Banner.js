import React, { Component } from 'react';
import { Swiper, Slide } from 'react-dynamic-swiper';
import 'react-dynamic-swiper/lib/styles.css';
import API from '../../../utils/API';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slides: [],
        }
    }
    componentWillMount() {
        this.getBannerData()
    }

    async getBannerData() {
        try {
            let result = await fetch(`/kugou${API.new_banner}`);
            let data = await result.json();
            let slidesArr = data.banner.map((item) => {
                return this.renderItem(item.imgurl)
            })
            this.setState({ slides: slidesArr })
        } catch (err) {
            console.log('Error', err);
        }
    }

    renderItem(item) {
        return (
            <img src={item} className="img_banner" />
        )
    }

    render() {
        const { slides } = this.state
        return (
            <Swiper
                swiperOptions={{
                    scrollbarHide: true,
                    // scrollBar: true,
                    loop: true,
                    // nextButton: null,
                    // preButton: null,
                }}
            >
                {slides.map(slide => (
                    <Slide className="Demo-swiper__slide" key={slide.id} >
                        {slide}
                    </Slide>
                ))}
            </Swiper>
        )
    }
}