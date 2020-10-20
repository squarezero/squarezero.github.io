import React, { useEffect } from "react"
import { Link } from "gatsby"
import sqzDim from '../../content/assets/sqzDim.png'
import APP_BACKGROUND from '../../content/assets/background.jpg';

import { rhythm, scale } from "../utils/typography"
import '../styles/styles.scss';

const Layout = (props) => {
  const { location, title, children, backgroundImage } = props;
  const rootPath = `${__PATH_PREFIX__}/`;
  const categories = ['home', 'blog', 'poetry', 'fiction', 'reviews'];
  const header = (
    <h1><Link style={{ color:`inherit` }} to={`/`}>{title}</Link></h1>
  );

  useEffect(() => {
    if(props.type) {
      addScrollListener();
    }
    return () => {
      removeScrollListener();
    }
  }, [props.type]);

  const addScrollListener = () => {
    document.addEventListener('scroll', scrollFunction);
  }

  const removeScrollListener = () => {
    document.removeEventListener('scroll', scrollFunction);
    const el = document.querySelector('.backgroundImage');
    if(!el)
      return;
    el.classList.remove('blurUp');
  }

  const scrollFunction = () => {
    const el = document.querySelector('.backgroundImage');
    if(!el)
      return;
    if(!el.classList.contains('blurUp'))
      el.classList.add('blurUp');
    setTimeout(()=>el.classList.remove('blurUp'), 300);
  }

  const onload = () => {
    if(props.finishCardInfo)
      props.finishCardInfo();
  }
  
  const goHome = () => {
    if(props.type)
      window.location.href="/";
  }
  
  return (
    <>
    <div className="sidebarContainer">
      <div className="hamburger" onClick={goHome} title="Home">
        <img className="logo" src={sqzDim} />
      </div>
      {
        !props.type &&
        <div className="categories">
        {
          categories.map((item, index) => (
            <div
              key={index}
              className="category"
              onClick={()=>props.updateActiveCategory(item, props.type)}
            >
              <div className="text">{item}</div>
              <div className="overlay"></div>
            </div>
          ))
        }
      </div>
      }
    </div>
    <div
      id="opacityContainer"
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        //maxWidth: rhythm(48),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        zIndex: 5,
        position: 'relative'
      }}
    >
      <header className="pageHeader" title="Silent Observations">{header}</header>
      <main>{children}</main>
      <footer>
      </footer>
    </div>
    <div className="backgroundImage">
      <div className="backgroundOverlay"></div>
      <img
        src={backgroundImage || APP_BACKGROUND}
        style={{objectFit: 'cover'}}
        onLoad={onload}
      />
    </div>
    </>
  )
}

export default Layout
