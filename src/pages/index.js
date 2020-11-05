import React, { useState } from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const BlogIndex = ({ data, location }) => {

  let [activeCategory, setActiveCategory] = useState(null);
  let [cardInfo, setCardInfo] = useState({
    background: null,
    title: '',
  });

  const updateCardInfo = (card) => {
    if(card.background === cardInfo.background && card.title === cardInfo.title)
      return;
    if(card.background !== cardInfo.background) {
      const el = document.querySelector('.backgroundImage');
      el.classList.add('hidden');
    }
    setTimeout(()=>setCardInfo(card), 200);
    //setTimeout(()=> el.classList.remove('hidden'), 500);
  }

  const finishCardInfo = () => {
    const el = document.querySelector('.backgroundImage');
    el.classList.remove('hidden');
  }

  const updateActiveCategory = (category) => {
    const el = document.querySelector('#opacityContainer');
    el.classList.add('hidden');
    setTimeout(()=> {
      setActiveCategory(category);
      el.classList.remove('hidden');
    }, 200
    );
  }
  
  const siteTitle = data.site.siteMetadata.title;
  let posts = data.allMarkdownRemark.edges.filter(({node}) => {
    if(activeCategory === null || activeCategory === 'home')
      return true;
    return node.frontmatter.category === activeCategory
  });

  return (
    <Layout
      location={location}
      title={siteTitle}
      backgroundImage={cardInfo ? cardInfo.background : null}
      activeCategory={activeCategory}
      updateActiveCategory={updateActiveCategory}
      finishCardInfo={finishCardInfo}
    >
      <SEO
        title={data.site.siteMetadata.title}
        description={data.site.siteMetadata.description}
        ogImage={data.site.siteMetadata.image}
      />
      {
        !posts.length &&
        <div className="noContent">
          Square zero.<br/>Nothing yet.
        </div>
      }
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article
            key={node.fields.slug}
            className="homeCard"
            onMouseOver={()=>updateCardInfo(node.frontmatter)}
          >
            <div className="content" style={{
                marginLeft: `auto`,
                marginRight: `auto`,
                width: rhythm(48),
                maxWidth: '100%',
              }}>
              <header>
                <h3><Link to={node.fields.slug}>
                  {title}
                </Link></h3>
              </header>
              <section className={`subtitle ${cardInfo.title === node.frontmatter.title ? 'showSubtitle' : ''}`}>
                <Link to={node.fields.slug}>
                  {node.frontmatter.subtitle || node.excerpt}
                </Link>
              </section>
            </div>
            <div className="cardSeparator" style={{
                marginLeft: `auto`,
                marginRight: `auto`,
                maxWidth: rhythm(48),
              }}></div>
            <div className={`date homeDate ${cardInfo.title === node.frontmatter.title ? 'highlightDate' : ''}`}>
              {node.frontmatter.date}
            </div>
          </article>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        image
        social {
          email
        }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt(pruneLength: 40)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMDD, YYYY")
            title
            subtitle
            background
            category
          }
        }
      }
    }
  }
`
