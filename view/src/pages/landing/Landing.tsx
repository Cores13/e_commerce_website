import React from "react";
import "./Landing.css";
import { Link } from "react-router-dom";

export const Landing: React.FC = () => {
  return (
    <div className='landing'>
      <div className='landingWrapper'>
        {/* Home */}
        <div className='landingTitleSection'>
          <div className='landingTitleSectionLeft'>
            <h1 className='landingTitle'>
              Većina planete prekrivena je vodom. Posao ribara je jednostavan:
              odabrati najbolje dijelove!
            </h1>

            <Link to='/products' className='landingTitleLink'>
              &#x2794; Kupi sada
            </Link>
          </div>
          <div className='landingTitleSectionRight'></div>
        </div>
        {/* Categories */}
        <div className='landingCategories'>
          <div className='landingCategoriesWrapper'>
            <div className='landingCategoriesCards'>
              <div className='landingCategoriesCard'>MASINE</div>
              <div className='landingCategoriesCard'>STAPOVI</div>
              <div className='landingCategoriesCard'>VARALICE</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
