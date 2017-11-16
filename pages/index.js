import React from 'react'
import Head from 'next/head'
import * as d3 from 'd3'

export default class extends React.Component {
  componentDidMount () {
    this.startInterval()
    window.addEventListener('resize', () => this.redraw(true))
  }

  startInterval () {
    this.i = 0
    this.interval = setInterval(() => {
      this.redraw()
      this.i++
      if (this.i >= 50) {
        clearInterval(this.interval)
      }
    }, 10)
  }

  redraw (shouldWipeSVG) {
    const svg = d3.select(this.refs.bg)
    if (shouldWipeSVG) {
      svg.selectAll('*').remove()
    }
    const width = window.innerWidth + 200
    const height = window.innerHeight + 200

    const sites = d3.range(100).map((d) => [
      Math.random() * width,
      Math.random() * height
    ])

    const voronoi = d3.voronoi().extent([
      [-1, -1],
      [width + 1, height + 1]
    ])

    svg.append('g')
      .attr('class', 'polygons')
      .selectAll('path')
      .data(voronoi.polygons(sites))
      .enter().append('path')
      .call(this.redrawPolygon)

    svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(voronoi.links(sites))
      .enter().append('line')
      .call(this.redrawLink)

    if (shouldWipeSVG) {
      clearInterval(this.interval)
      this.startInterval()
    }
  }

  redrawPolygon (polygon) {
    polygon
      .attr('d', (d) => d ? `M${d.join('L')}Z` : null)
  }

  redrawLink (link) {
    link
      .attr('x1', d => d.source[0])
      .attr('y1', d => d.source[1])
      .attr('x2', d => d.target[0])
      .attr('y2', d => d.target[1])
  }

  render () {
    return (
      <div>
        <Head>
          <title>John Martin &middot; CTO IV.AI</title>
          <link
            rel='shortcut icon'
            href='/static/favicon.ico'
          />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
          />
        </Head>
        <svg
          ref='bg'
          className='bg'
          width={200}
          height={200}
        />
        <div className='content'>
          <h1>Hi.</h1>
          <p>I'm John Martin.</p>
          <p>I'm CTO of <a href='https://iv.ai/'>IV.AI</a>.</p>
          <p>Where we make things for enterprise with Machine Learning and AI.</p>
          <p><a href='https://iv.ai/contact'>Let's chat</a></p>
        </div>
        <style jsx global>{`
          html, body {
            min-height: 100%;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
            font-size: 21px;
            line-height: 1.25;
            color: white;
            background-color: #db2442;
            padding: 30px;
            margin: 0;
            text-shadow: 0 1px 3px #db2442;
            -webkit-font-smoothing: antialiased;
          }
          ::selection {
            color: white;
            background-color: black;
            text-shadow: none;
          }
          h1 {
            font-weight: 400;
            margin: 0 0 30px 0;
          }
          p {
            margin: 0 0 15px 0;
          }
          a {
            color: white;
            text-decoration: none;
            border-bottom: 2px solid rgba(255, 255, 255, 0.5);
            transition: all 0.1s ease-in;
          }
          a:hover {
            border-bottom-color: rgba(255, 255, 255, 0.75);
            border-bottom-width: 4px;
          }
          .content {
            position: relative;
            z-index: 1;
            overflow: hidden;
            max-width: 400px;
          }
          .bg {
            position: fixed;
            z-index: 0;
            top: -100px;
            left: -100px;
            min-width: calc(100vw + 200px);
            min-height: calc(100vh + 200px);
          }
          .links {
            stroke: rgba(255, 255, 255, 0.05);
            stroke-width: 0.5;
          }
          .polygons {
            fill: none;
            stroke: rgba(255, 255, 255, 0.025);
            stroke-width: 0.5;
          }
        `}</style>
      </div>
    )
  }
}
