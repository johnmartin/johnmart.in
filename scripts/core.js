(function($, window) {
	function Portfolio() {
		var total = 9;
		var names = $('header h2');
		var height = names.outerHeight();
		var position = 0;
		setInterval(function() {
			position++;
			if (position >= total) {
				position = 0;
			}
			names.removeClass().addClass('position-'+position);
		}, 1500);
	}
	window.__ = Portfolio;
})(jQuery, window);