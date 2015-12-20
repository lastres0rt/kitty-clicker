// referenced from https://github.com/udacity/ud989-pizzamvo/blob/master/js/app.js
var data = {
	currentKitty: null,
	kitties: [
		{
			name: "Mipsy",
			clickCount: 0,
			img: "img/cat1.jpg"
		},
		{
			name: "Blinky",
			clickCount: 0,
			img: "img/cat2.jpg"
		},
		{
			name: "Boopsy",
			clickCount: 0,
			img: "img/cat3.jpg"
		},
		{
			name: "Slinky",
			clickCount: 0,
			img: "img/cat4.jpg"
		},
		{
			name: "Zazzles",
			clickCount: 0,
			img: "img/cat5.jpg"
		},
	]
};

var octopus = {
	init: function() {
		data.currentKitty = data.kitties[0];
		kittyListView.init();
		kittyView.init();
		adminView.init();
	},

	getCurrentKitty: function() {
		return data.currentKitty;
	},

	getKitties: function() {
		return data.kitties;
	},

	setCurrentKitty: function(kitty) {
		data.currentKitty = kitty;
	},

	incrementCounter: function () {
		data.currentKitty.clickCount++;
		kittyView.render();
		adminView.render();
	},

	modifyKitty: function(name, clickCount, image) {
		data.currentKitty.name = name;
		data.currentKitty.clickCount = clickCount;
		data.currentKitty.img = image;
		kittyView.render();
	}
};

var kittyView = {
	init: function() {
		this.kittyElem = document.getElementById('kitty');
		this.kittyNameElem = document.getElementById('kitty-name');
		this.kittyImageElem = document.getElementById('kitty-img');
		this.countElem = document.getElementById('kitty-count');

		this.kittyImageElem.addEventListener('click', function(){
			octopus.incrementCounter();
		});

		this.render();
	},

	render: function() {
		var currentKitty = octopus.getCurrentKitty();
		this.countElem.textContent = currentKitty.clickCount;
		this.kittyNameElem.textContent = currentKitty.name;
		this.kittyImageElem.src = currentKitty.img;
	}
};

var kittyListView = {
	init: function() {
		this.kittyListElem = document.getElementById('kitty-list');
		this.render();
	},

	render: function() {
		var kitty, elem, i;
		var kitties = octopus.getKitties();

		this.kittyListElem.innerHTML='';

		for (i = 0; i < kitties.length; i++) {
			kitty = kitties[i];

			elem = document.createElement('li');
			elem.textContent = kitty.name;

			elem.addEventListener('click', (function(kittyCopy) {
				return function() {
					octopus.setCurrentKitty(kittyCopy);
					kittyView.render();
				};
			})(kitty));

			this.kittyListElem.appendChild(elem);
		}
	}
}

var adminView = {
	init: function() {
		this.adminModeElem = document.getElementById('admin-mode');
		this.adminElem = document.getElementById('admin');
		this.cancelElem = document.getElementById('cancel');
		this.saveElem = document.getElementById('save');
		this.nameElem = document.getElementById('kitty-name-change');
		this.clickElem = document.getElementById('kitty-click-change');
		this.imgElem = document.getElementById('kitty-image-change');

		this.adminElem.addEventListener('click', function(){
			document.getElementById('admin-mode').style.visibility = "visible"
		});

		this.cancelElem.addEventListener('click', function(){
			document.getElementById('admin-mode').style.visibility = "hidden"
		});

		this.saveElem.addEventListener('click', function(){
			var newKittyName = document.getElementById('kitty-name-change').value;
			var newKittyClick = document.getElementById('kitty-click-change').value;
			var newKittyImg = document.getElementById('kitty-image-change').value;
			document.getElementById('admin-mode').style.visibility = "hidden"
			octopus.modifyKitty(newKittyName, newKittyClick, newKittyImg);
		});

		this.adminModeElem.style.visibility = "hidden";

		this.render();
 	},

	render: function() {
		var kitty = octopus.getCurrentKitty();

		this.nameElem.value = kitty.name;
		this.clickElem.value = kitty.clickCount;
		this.imgElem.value = kitty.img;
	}
}

octopus.init();