import CourseTextMotionHero from './CourseTextMotionHero';
import CourseElasticGallery from './CourseElasticGallery';

export default function CoursesCarousel() {
  return (
    <section className="courses-carousel-sec" id="cursos-disponibles">
      <div className="carousel-container">
        {/* Continuous Vertical Text Motion Showcase */}
        <CourseTextMotionHero />

        {/* Modern Elastic Accordion Course Gallery */}
        <CourseElasticGallery />
      </div>
    </section>
  );
}


