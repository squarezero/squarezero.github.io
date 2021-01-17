import React, { useEffect } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import BrightLogo from '../../content/assets/sqzBright.png';
import DimLogo from '../../content/assets/sqzDim.png';

import '../styles/about.scss';

const AboutPage = ({ data, location }) => {

  useEffect(() => {
    startAnimation(true);
  });

  const startAnimation = (flag) => {
    const brightLogo = document.querySelector("#brightLogo");
    if(flag) {
      brightLogo && brightLogo.classList.remove("active");
    }
    else {
      brightLogo && brightLogo.classList.add("active");
    }
    setTimeout(() => startAnimation(!flag), 4000);
  }

  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle} type="about">
      <SEO title="About Square Zero" />
      <div className="aboutContainer">
        <div className="aboutLogoContainer">
          <img className="aboutLogo" id="brightLogo" src={BrightLogo} />
          <img className="aboutLogo" id="dimLogo" src={DimLogo} />
        </div>
        <p className="aboutTitle">About</p>
        <p className="aboutDescription">Description ...</p>
      </div>
    </Layout>
  )
}

export default AboutPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
