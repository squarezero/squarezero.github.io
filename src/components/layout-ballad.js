import React, { useEffect } from "react"
import { Link } from "gatsby"
import sqzBright from '../../content/assets/sqzBright.png'

import { rhythm } from "../utils/typography"
import '../templates/ballads/index.css';

const Layout = (props) => {
  const { title, children, backgroundImage } = props;
  const header = (
    <h1><Link style={{ color:`inherit` }} to={`/`}>{title}</Link></h1>
  );

  useEffect(() => {
    document.querySelector('.sq').addEventListener('scroll', scrollListener)
    return () => {
      document.querySelector('.sq').removeEventListener('scroll', scrollListener)
    }
  }, [props.type]);

  function scrollListener(e) {
    const target = e.target
    const scrollPercent = Math.floor(target.scrollTop*100/target.scrollHeight)
    //max percent: 56%
    if(scrollPercent<20) {
        target.style.background = 'rgb(126 0 255 / 50%)';
    }
    else if(scrollPercent<30) {
        target.style.background = 'rgb(255 0 224 / 50%)';
    }
    else if(scrollPercent<40) {
        target.style.background = 'rgb(255 0 149 / 50%)';
    }
    else {
        target.style.background = 'rgb(255 0 0 / 50%)';
    }
}
  
  const goHome = () => {
    if(props.type)
      window.location.href="/";
  }
  
  return (
    <>
    <div className="sidebarContainer">
      <div className="hamburger" onClick={goHome} title="Home">
        <img className="logo" src={sqzBright} alt="logo" />
      </div>
    </div>
    <div
      id=""
      className="balladLayout"
      style={{
        // position: 'relative'
      }}
    >
      <header className="pageHeader" title="Silent Observations">{header}</header>
      <main>{children}</main>
      <div className="gradient-blur">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <a className="aboutLink" href="https://surajk95.github.io/" target="_blank">about</a>
    </>
  )
}

export default Layout
