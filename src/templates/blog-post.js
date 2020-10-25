import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import ShareIcon from '../../content/assets/share.svg';
import BackIcon from '../../content/assets/back.svg';

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark;

  function copyToClipboard(){
    var textArea = document.createElement("textarea");
    textArea.value = window.location.href;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();

    var tooltip = document.getElementById("tooltiptext");
    tooltip.innerHTML = "Link copied";
  }

  function outFunc() {
    var tooltip = document.getElementById("tooltiptext");
    tooltip.innerHTML = "Copy Link";
  }

  function goHome() {
    window.history.back();
  }

  return (
    <Layout
      location={location}
      title={post.frontmatter.title}
      backgroundImage={post.frontmatter.background}
      type="post"
    >
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.subtitle || post.excerpt}
      />
      <article className="article">
        <div className={`content blogPost ${post.frontmatter.category === 'poetry' ? 'fitContent' : ''}`}
          style={{
            position: 'relative',
            marginLeft: `auto`,
            marginRight: `auto`,
            marginTop: '50px',
            maxWidth: rhythm(36),
          }}>
          <header>
          </header>
          <section dangerouslySetInnerHTML={{ __html: post.html }} />
          <footer>
          </footer>
          <div className="backButton" onClick={goHome} title="Back">
            <img
              className="backIcon"
              src={BackIcon}
              alt="Back"
            />
          </div>
        </div>
        <div className="articleMeta">
          <div className={`date articleDate`}>
            {post.frontmatter.date}
          </div>
          <h3 className="metaSubtitle">
            {post.frontmatter.subtitle || post.frontmatter.category}
          </h3>
          {post.frontmatter.background_artist && <a className="coverArtist" href={post.frontmatter.background_artist} target="_blank">cover image artist</a>}
          <div className="tooltipcontainer">
            <img
              onClick={copyToClipboard}
              onMouseOut={outFunc}
              className="shareIcon"
              src={ShareIcon}
              alt="Share"
            />
            <span id="tooltiptext" className="tooltiptext">Copy Link</span>
          </div>
        </div>
      </article>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMDD, YYYY")
        subtitle
        background
        background_artist
        category
      }
    }
  }
`
