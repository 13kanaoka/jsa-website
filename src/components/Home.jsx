import './Home.css'
import photo1 from '../assets/slider/1_undoukai.png'
import photo2 from '../assets/slider/2_karaoke.png'
import photo3 from '../assets/slider/3_calligraphy.jpg'
import photo4 from '../assets/slider/4_party.jpg'

import { useState, useEffect } from 'react'

const SLIDES = [photo1, photo2, photo3, photo4]

function Home() {
    return (
        <section id="home" className="home">
            <div className="hero">
                <div className="slider">
                    <div
                        className="slider-track">
                            {[...SLIDES, ...SLIDES].map((src, i) => (
                                <img key={i} src={src} className="slide" alt="" />
                            ))}
                        </div>
                </div>
                <div className="overlay"></div>
                <div className="hero-text">
                    <h2>日 本 人 学 生 会</h2>
                    <h1>Japanese Student Association</h1>
                    <p>California State University, Northridge</p>
                </div>
            </div>
        </section>
    )
}

export default Home