// referenced from https://github.com/udacity/ud989-pizzamvo/blob/master/js/app.js

$(function() {

	var data = {
		lastID: 0;
		kitties: []
	};

	var octopus = {
		addKitty: function() {
			var thisID = ++data.lastID;

			data.kitties.push({
				id. thisID,
				visible: true
			});
			view.render();
		},

		removeKitty: function(kitty){
			var clickedKitty = data.kitties[ kitty.id - 1 ]
			clickedKitty.visible = false;
			view.render();
		},

		getVisibleKitties: function() {
			var visibleKitties = data.kitties.filter(function(kitty) {
				return kitty.visible;
			});
			return visibleKitties;
		},

		init: function() {
			view.init();
		}
	};

	var view = {
		init: function() {
			var addKittyButton = $('.add-kitty');
			addKittyButton.click(function() {
				octopus.addKitty();
			});

			this.$kittyList = $('.kitty-list');
			this.kittyTemplate = $('script[data-template="kitty"]').html();

			this.$kittyList.on('click', '.remove-kitty', function(e) {
				var kitty = $(this).parents('.kitty').data();
				octopus.removeKitty(kitty);
				return false;
			});
		},

		render: function() {
			var $kittyList = this.$kittyList,
				kittyTemplate = this.kittyTemplate;

			$kittyList.html('');
			octopus.getVisibleKitties().forEach(function(kitty) {
				var thisTemplate = kittyTemplate.replace(/{{id}}/g, kitty.id);
				$kittyList.append(thisTemplate);
			});
		}
	};

	octopus.init();
}());