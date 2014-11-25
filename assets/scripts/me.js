!function (window, $, Voronoi) {

  var sites = [];
  var header_width = 4000;
  var header_height = 2000;
  var total_cells = 100;
  for (var i = 0; i < total_cells; i++) {
    var x = Math.random()*header_width;
    var y = Math.random()*header_height;
    var opacity = (Math.random()*10)/100;
    sites.push({ x: x, y: y, opacity: opacity });
  }

  function VoronoiSVG () {
    var voronoi = new Voronoi();
    var bbox = { xl: 0, xr: header_width, yt:0, yb: header_height };
    var result = voronoi.compute(sites, bbox);
    var polys = [];
    for (var x in result.cells) {
      var halfedges = result.cells[x].halfedges;
      var halfedges_total = halfedges.length;
      if (halfedges_total < 3) {
        continue;
      }
      var v = halfedges[0].getStartpoint();
      var pt = [];
      pt.push([v.x, v.y]);
      for (var y = 0; y < halfedges_total; y++) {
        v = halfedges[y].getEndpoint();
        pt.push([v.x, v.y]);
      }
      polys.push('<polygon opacity=\''+result.cells[x].site.opacity+'\' fill=\'#FFFFFF\' points=\''+pt.join(' ')+'\' />');
    }
    return '<svg version=\'1.1\' xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 '+header_width+' '+header_height+'\'><g>'+polys.join('')+'</g></svg>';
  }

  function VoronoiSVGTick () {
    // Move all the dots...
    for (var i = 0; i < total_cells; i++) {
      if (((Math.random()*2) > 1)) {
        sites[i].x += (-1+(Math.random()*2));
      }
      if (((Math.random()*2) > 1)) {
        sites[i].y += (-1+(Math.random()*2));
      }
    }
    // Header image
    var svg = VoronoiSVG();
    $('#header-style').html('#header{background-image: url("data:image/svg+xml;charset=utf-8,'+svg+'")}');
    //
    setTimeout(VoronoiSVGTick, 100);
  }

  function WindowScroll () {
    if ($(document).scrollTop() < 186) {
      $('body').removeClass('stick-header');
    } else {
      $('body').addClass('stick-header');
    }
  }

  function Init (page) {
    // Header Image
    VoronoiSVGTick();

    // Make the top nav sticky
    $(window).scroll(WindowScroll);
    WindowScroll();

    // Favicon
    $('<link rel="shortcut icon" href="/dist/images/favicon-'+page+'.ico">')
      .appendTo('head');

    if (page == 'work') {
      // Match height
      $('.grid .item').matchHeight();
      // Carousels
      $('.carousel').fotorama({
        fit: 'cover',
        width: '100%',
        height: 500,
        autoplay: 4000,
        nav: false,
        arrows: false
      });
    }
  }

  window.init = Init;

}(window, window.jQuery, window.Voronoi);
