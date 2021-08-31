import React, { useEffect, useState } from "react";
import "./Landing.css";
import { Link } from "react-router-dom";
import { ProductItem } from "../../components/productItem/ProductItem";
import axios from "axios";
import { WaterDrops } from "../../components/waterDrops/WaterDrops";

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
              <Link
                to='/products'
                onClick={() =>
                  setCategory("category=60fff54422d16d1ef7943dd5")
                }>
                <div className='landingCategoriesCard Reel'>MASINICE</div>
              </Link>

              <Link
                to='/products'
                onClick={() =>
                  setCategory("category=6124f8f3c18cad4c266c3989")
                }>
                <div className='landingCategoriesCard Rod'>STAPOVI</div>
              </Link>
              <Link
                to='/products'
                onClick={() =>
                  setCategory("category=612c8cd251269608539f7048")
                }>
                <div className='landingCategoriesCard Bait'>VARALICE</div>
              </Link>
            </div>
          </div>
        </div>
        {/* MOST SOLD ITEMS */}
        <div className='landingMostSold'>
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
        </div>
        <div className='landingRules'>
          <WaterDrops j={35} />
          <div className='landingRulesWrapper'>
            <img src='./pike.png' alt='' className='landingRulesPike' />
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
              <h3 className='footerContactInfo'>Email: info@ribosport.com</h3>
              <h3 className='footerContactInfo'>Tel: +387 61 408 106</h3>
              <h3 className='footerContactInfo'>
                Adresa: 10. Septembar 58, Banovici, 75290
              </h3>
            </div>

            <div className='footerLinks'>
              <h1 className='footerLinksTitle'>LINKOVI</h1>
              <Link className='footerLink' to=''>
                OLX
              </Link>
              <Link className='footerLink' to=''>
                FACEBOOK
              </Link>
              <Link className='footerLink' to=''>
                INSTAGRAM
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
