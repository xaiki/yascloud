const d3 = require('d3');
const layout = require('d3-cloud');

export default function wordCloud(selector, { w, h }) {
  const fill = d3.scaleOrdinal(d3.schemeCategory10);
  const svg = d3.select(selector)
    .append("svg")
    .attr("width", w)
    .attr("height", h)

  const group = svg
    .append("g")
    .attr("transform", `translate(${w / 2},${h / 2})`);

  function draw(words) {
    //Use the 'text' attribute (the word itself) to identity unique elements.
    const cloud = group.selectAll("g text")
      .data(words, d => d.text)

    cloud.transition()
      .duration(1000)
      .attr('transform', d => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
      .style('font-size', d => `${d.size}px`)

    cloud.enter()
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('transform', d => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
      .style('font-size', '1px')
      .transition()
      .duration(1000)
      .style('font-size', d => `${d.size}px`)
      .style('fill', d => fill(d.text.toLowerCase()))
      .text(d => d.text);

    cloud.style('font-family', d => d.font)
      .style('fill', d => fill(d.text.toLowerCase()))
      .text(d => d.text);

    cloud.exit()
      .transition()
      .duration(200)
      .style('fill-opacity', 1e-6)
      .attr('font-size', 1)
      .remove();
  }
  return {
    //Recompute the word cloud for a new set of words. This method will
    // asycnhronously call draw when the layout has been computed.
    update: function(words, progress = () => { }) {
      layout().size([w, h])
        .words(words)
        .padding(5)
        .rotate(() => ~~(Math.random() * 2) * 90)
        .font("Impact")
        .fontSize(d => d.size)
        .on("end", draw)
        .on("word", progress)
        .start();
    },
    resize: conf => svg
      .attr("width", conf.w)
      .attr("height", conf.h)
  }
}
