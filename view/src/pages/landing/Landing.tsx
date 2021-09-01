import React, { useEffect, useState } from "react";
import "./Landing.css";
import { Link } from "react-router-dom";
import { ProductItem } from "../../components/productItem/ProductItem";
import axios from "axios";
import { WaterDrops } from "../../components/waterDrops/WaterDrops";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import ScrollAnimation from "react-animate-on-scroll";

export const Landing: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [callback] = useState(false);
  const [sort] = useState("");
  const [search] = useState("");
  const [page] = useState(1);
  const [result, setResult] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(
        `/api/products?limit=${page * 5}&&sort=-sold&title[regex]=`
      );
      setResult(res.data.result);
      setProducts(res.data.products);
    };
    getProducts();
  }, [callback, category, sort, page, search]);

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
          <WaterDrops j={25} />
          <div className='landingCategoriesWrapper'>
            <div className='landingCategoriesCards'>
              <ScrollAnimation
                animateIn='fadeInUp'
                duration={1.1}
                offset={250}
                className='animation'>
                <Link
                  to='/products'
                  onClick={() =>
                    setCategory("category=60fff54422d16d1ef7943dd5")
                  }>
                  <div className='landingCategoriesCard Reel'>MASINICE</div>
                </Link>
              </ScrollAnimation>
              <ScrollAnimation
                animateIn='fadeInUp'
                duration={1.1}
                offset={250}
                className='animation'>
                <Link
                  to='/products'
                  onClick={() =>
                    setCategory("category=6124f8f3c18cad4c266c3989")
                  }>
                  <div className='landingCategoriesCard Rod'>STAPOVI</div>
                </Link>
              </ScrollAnimation>
              <ScrollAnimation
                animateIn='fadeInUp'
                duration={1.1}
                offset={250}
                className='animation'>
                <Link
                  to='/products'
                  onClick={() =>
                    setCategory("category=612c8cd251269608539f7048")
                  }>
                  <div className='landingCategoriesCard Bait'>VARALICE</div>
                </Link>
              </ScrollAnimation>
            </div>
          </div>
        </div>
        {/* MOST SOLD ITEMS */}
        <div className='landingMostSold'>
          <ScrollAnimation
            animateIn='fadeInLeft'
            duration={1.1}
            offset={250}
            className='animation'>
            <div className='landingMostSoldWrapper'>
              <h2 className='landingMostSoldTitle title'>
                NAJPRODAVANIJI PROIZVODI
              </h2>
              <div className='landingMostSoldProduct'>
                {products.map((product: any) => {
                  return <ProductItem key={product._id} product={product} />;
                })}
              </div>
            </div>
          </ScrollAnimation>
        </div>
        <div className='landingRules'>
          <WaterDrops j={35} />
          <div className='landingRulesWrapper'>
            <ScrollAnimation
              animateIn='zoomInRight'
              duration={0.55}
              offset={250}
              className='animationPike'>
              <img src='./pike.png' alt='' className='landingRulesPike' />
            </ScrollAnimation>
            <ul className='landingRulesList'>
              <h1 className='landingRulesTitle title'>
                PRAVILA RIBOLOVA
                <br />
              </h1>
              <li className='landingRulesListItem'>
                Besplatan ribolov u privatne svrhe dozvoljen je svima na svim
                vodenim tijelima. Pored prirodnih rezervata, odgovarajući
                rasadnici i privatni rezervoari.
              </li>
              <br />

              <li className='landingRulesListItem'>
                Ribolov je zabranjen na udaljenosti manjoj od 500 metara od
                brana, mostova ili vodenih brana. Također nije dozvoljeno loviti
                direktno sa samih takvih struktura.
              </li>
              <br />

              <li className='landingRulesListItem'>
                Ulov za rekreativni ribolov ne smije prelaziti 5 kg po osobi.
                Ovo pravilo treba poštovati. Takođe, amateri ne smiju loviti
                mrežama i koristiti predmete koji probijaju. Upotreba eksploziva
                ili toksičnih supstanci je takođe zabranjena.
              </li>
              <br />

              <li className='landingRulesListItem'>
                Ribolov je dozvoljen tokom cijele godine. Ograničenja i zabrane
                ribolova uvode se samo tokom mrijesta. To se radi kako bi se
                ribama osigurali povoljni uslovi za razmnožavanje. To osigurava
                održavanje njegovih brojeva.
              </li>
            </ul>
          </div>
        </div>
        <div className='landingPartners'>
          {/* <WaterDrops j={15} /> */}
          <div className='landingPartnersWrapper'>
            <img
              src='./okuma.svg'
              alt='okuma'
              className='landingPartnersLogo'
            />
            <img
              src='./shimano.png'
              alt='shimano'
              className='landingPartnersLogo'
            />
            <img
              src='./formax.jpeg'
              alt='formax'
              className='landingPartnersLogo'
            />
            <img
              src='./carpologija.png'
              alt='carpologija'
              className='landingPartnersLogo'
            />
          </div>
        </div>
        <div className='footer'>
          <div className='footerWrapper'>
            <div className='footerLogo'>
              <Link className='footerLogo' to='/'>
                RiboSport
              </Link>
            </div>
            <div className='footerContact'>
              <h1 className='footerContactTitle'>KONTAKT</h1>
              <h3 className='footerContactInfo'>
                <span style={{ color: "#00c6bd" }}>Email:</span>{" "}
                info@ribosport.com
              </h3>
              <h3 className='footerContactInfo'>
                <span style={{ color: "#00c6bd" }}>Tel:</span> +387 61 408 106
              </h3>
              <h3 className='footerContactInfo'>
                <span style={{ color: "#00c6bd" }}>Adresa:</span> 10. Septembar
                58, Banovici, 75290
              </h3>
            </div>

            <div className='footerLinks'>
              <h1 className='footerLinksTitle'>LINKOVI</h1>
              <div className='footerLinksBottom'>
                <Link className='footerLink' to=''>
                  <svg
                    id='Layer_1'
                    data-name='Layer 1'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 100 99.9'
                    className='footerLinkOlx'>
                    <defs></defs>
                    <path
                      className='cls-1'
                      d='M304.64,346.07a49.95,49.95,0,1,1-23.39,6.53,49.81,49.81,0,0,1,23.39-6.53Zm-1.08,1.57a48.1,48.1,0,0,0-26,9.16A48.7,48.7,0,0,0,263,373.74a48.28,48.28,0,0,0,4.2,51.21,49,49,0,0,0,13,12A48.43,48.43,0,0,0,343,364.78a48.94,48.94,0,0,0-13.93-11.35,48.2,48.2,0,0,0-25.55-5.79Z'
                      transform='translate(-256 -346.05)'
                      style={{ fill: "#00c6bd" }}
                    />
                    <path
                      className='cls-2'
                      d='M297,372.61c1.34-.17,2.69,0,4-.08a9.08,9.08,0,0,1,2.5.16,2.17,2.17,0,0,1,1.37,2.06q0,9.58,0,19.17c0,.59-.11,1.29.33,1.78a1.49,1.49,0,0,0,1.14.33h7.38a2.22,2.22,0,0,1,2.42,2.29c0,1.41,0,2.83,0,4.24a2.16,2.16,0,0,1-2.24,2c-5.5,0-11,0-16.5,0a2.18,2.18,0,0,1-2.1-2.3q0-13.74,0-27.47a2.18,2.18,0,0,1,1.67-2.16Z'
                      transform='translate(-256 -346.05)'
                      style={{ fill: "#00c6bd" }}
                    />
                    <path
                      className='cls-3'
                      d='M339.31,378.21a4.38,4.38,0,0,1,5.22-1.44,4.38,4.38,0,0,1,.36,3.27,11.5,11.5,0,0,1-2.71,4.63c-2,2.49-3.79,5.13-5.61,7.74-.38.58-.81,1.12-1.16,1.71-.21.21,0,.43.13.62,3.76,5.5,7.49,11,11.25,16.54a5.46,5.46,0,0,1,1.38,3.38,2.2,2.2,0,0,1-1.44,1.75,30.49,30.49,0,0,1-7.21,2,3.85,3.85,0,0,1-4-2.15c-2-4.29-4.28-8.49-6.44-12.73-2.6,3.84-5.12,7.73-7.66,11.6a4.71,4.71,0,0,1-1.9,1.67,1.58,1.58,0,0,1-1.56-.08,5.76,5.76,0,0,1-1.2-1.31,33.88,33.88,0,0,1-2.39-3.74,4.67,4.67,0,0,1-.21-3.82,8.1,8.1,0,0,1,1.76-2.94c2.9-3.3,5.78-6.62,8.69-9.91-2-3.87-4-7.71-6-11.56a6.56,6.56,0,0,1-.71-3.48,2.88,2.88,0,0,1,1.35-2.39,4.28,4.28,0,0,1,4.09-.11,4.37,4.37,0,0,1,1.5,1.46c2,3,4,5.94,6.05,8.91,2.84-3.17,5.63-6.41,8.45-9.61Z'
                      transform='translate(-256 -346.05)'
                      style={{ fill: "#00c6bd" }}
                    />
                    <path
                      className='cls-4'
                      d='M275.5,377.73a14.25,14.25,0,0,1,9,1.91,18.19,18.19,0,0,1,7.49,9.13,22.17,22.17,0,0,1,.64,14,18.85,18.85,0,0,1-7.24,10.47,14.13,14.13,0,0,1-16.65-.23,19.16,19.16,0,0,1-7.21-11.38,22,22,0,0,1,2.11-15.33,17.3,17.3,0,0,1,7.22-7.11,14.1,14.1,0,0,1,4.62-1.42Zm.46,6.1a7.17,7.17,0,0,0-3.8,3.08,16.64,16.64,0,0,0-2.4,6.83A20.61,20.61,0,0,0,271,404.31a10,10,0,0,0,3.64,4.68,4.83,4.83,0,0,0,4.46.39,7.58,7.58,0,0,0,3.23-2.89,16.47,16.47,0,0,0,2.39-6.76A20.51,20.51,0,0,0,283.46,389a10.1,10.1,0,0,0-3.4-4.47,4.83,4.83,0,0,0-4.1-.72Z'
                      transform='translate(-256 -346.05)'
                      style={{ fill: "#00c6bd" }}
                    />
                  </svg>
                </Link>
                <Link className='footerLink' to=''>
                  <FacebookIcon className='footerLinkFacebook' />
                </Link>
                <Link className='footerLink' to=''>
                  <InstagramIcon className='footerLinkInstagram' />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
