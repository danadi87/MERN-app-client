import React from "react";
import "../styles/Aboutus.css";
import { BackButton } from "./BackButton";

export function Aboutus() {
  return (
    <div className="about-us">
      <BackButton />
      <h1>About Us</h1>
      <p>
        We are two passionate women who found our way into coding thanks to the
        incredible Ironhack course! Let us tell you our story.
      </p>
      <section className="bio">
        <div className="person">
          <h2>Mirela - The Romanian Girl in Barcelona</h2>
          <p>
            Hi, I'm Mirela! Originally from Romania, I moved to Barcelona to
            follow my dreams. After joining Ironhack's bootcamp, I learned
            everything I needed to know about coding—from web development to
            building full-stack applications. Soon, I'll be a proud web
            developer, and I'm excited to keep learning and growing in this
            field!
          </p>
        </div>

        <div className="person">
          <h2>Cristy - The Mexican Girl in France</h2>
          <p>
            Hola! I’m Cristy. I moved to France from Mexico to explore new
            challenges, and never though that coding was going to be one!
            Ironhack's immersive course helped me added new projects about tech
            in my german company. I was always interested in coding, but it was
            only through Ironhack that I truly learned how to turn ideas into
            real web applications.
          </p>
        </div>
      </section>
    </div>
  );
}
