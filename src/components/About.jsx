import './About.css'

function About() {
    return (
        <section id="about" className="about">
            <div className="about-intro">
                <h1>What is JSA?</h1>
                <h2>A home away from home for Japanese students, and an open door into Japanese culture for everyone.</h2>
            </div>
            <div className="about-body">
                <p>
                    The Japanese Student Association (JSA) began as an informal community welcoming 
                    Japanese exchange students to CSUN, long before it became an official club more than 10 
                    years ago — because starting over in a new country is much easier with friends.
                </p>
                <p>
                    Today, that mission continues: JSA is a place for Japanese exchange students to find a 
                    taste of home, and for anyone curious about Japanese language or culture to dive right in 
                    regardless of background.
                </p>
                <p>
                    Beyond our monthly meetings, we get together for karaoke nights, barbecues, movie nights, 
                    and Smash Bros. tournaments, alongside hands-on cultural events like calligraphy, origami, 
                    and paper lantern crafting. We celebrate Japanese holidays like Obon and Setsubun throughout 
                    the year, and host 2-3 parties each semester.
                </p>
                <p>
                    Each year in April, we collaborate with other JSA clubs around Southern California for a 
                    massive Undoukai event (Sports Tournament). We get together on a beach,
                    and each school competes in classic Japanese games.
                </p>
                <p className="about-note">Attendance is always optional, never mandatory.</p>
            </div>
        </section>
    )
}

export default About