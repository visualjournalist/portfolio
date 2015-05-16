var express = require('express');
var router = express.Router();


/* Splits data into separate paragraphs*/
function splitParagraphs(source){
	var splitGraphs = '';

	var paragraphs = source;
	paragraphs = paragraphs.split('\n')

	for (var i = 0; i<paragraphs.length; i++){
		splitGraphs += '<p>' + paragraphs[i] + '</p>';
	}
	return splitGraphs
}



/* GET home page. */
router.get('/', function(req, res, next) {
	var featuredNumber = 0;
	if (req.query.number!=null){
		featuredNumber = req.query.number;
	};


	var data = global.site.sitewide;
	var portfolioData = global.portfolio.sitewide;


	var randomProjectNumber = Math.floor(portfolioData.length*Math.random());
	var projectData = portfolioData[randomProjectNumber];
	projectData.descriptionSplit = splitParagraphs(projectData.description);

	var verticalImage = '';
	if (projectData.verticalimage == 'TRUE'){
		verticalImage = 'verticalImage';
	}
	/*
	console.log(global.categories);
	var promos = [];
	var counter = 0; 
	var promoCount = 0;
	var categoryCount = 0;
	var promoCountLimit = 6;

	function addCategories(cat){
		console.log('addCategoriesx '+portfolioData[counter].category + '  x ' + cat);
		if (portfolioData[counter].category==cat&&counter<2){
			promos.push(portfolioData[counter]);
			counter++;
			addCategories(counter);
			console.log('-------')
			console.log(promos);
		} else if (counter < 2 && categoryCount < global.categories.length){
			console.log('else if')
			categoryCount++;
			promoCount++;
			counter = 0;
			addPromos(promoCountLimit);
		} else if (categoryCount < global.categories.length){
			categoryCount++;
			addCategories(global.categories[categoryCount])
		}
	}

	function addPromos(promoCountLimit){
		if(promoCount<promoCountLimit){
			console.log('global.categories[categoryCount] '+ global.categories[categoryCount]);
			addCategories(global.categories[categoryCount]);
		}
	}
	addPromos(promoCountLimit);
	*/



	res.render('index', { 
		data: data,
		portfolioData: portfolioData,
		projectData: projectData,
		verticalImage: verticalImage,
		featuredNumber: featuredNumber,
		category: 'showAll',
		loopLimit: 6,
		description: splitParagraphs(data[0].biography)
	});
});


/* GET about page. */
router.get('/about', function(req, res, next) {
	var data = global.site.sitewide;
	var portfolioData = global.portfolio.sitewide;

	res.render('about', { 
		data: data,
		portfolioData: portfolioData,
		description: splitParagraphs(data[0].biography)
	});
});


/* GET portfolio page. Show all. */
router.get('/portfolio/', function(req, res, next) {
	var featuredNumber = req.query.number;

	var data = global.site.sitewide;
	var portfolioData = global.portfolio.sitewide;

	res.render('portfolio', { 
		data: data,
		portfolioData: portfolioData,
		featuredNumber: featuredNumber,
		category: 'showAll',
		loopLimit: portfolioData.length,
		description: splitParagraphs(data[0].biography)
	});
});



/* GET portfolio page. */
router.get('/portfolio/:category/', function(req, res, next) {
	var category = req.params.category;
	if (req.params.category==null){
		category = illustration;
	}

	var data = global.site.sitewide;
	var portfolioData = global.portfolio.sitewide;

	res.render('portfolio', { 
		data: data,
		portfolioData: portfolioData,
		category: category,
		loopLimit: portfolioData.length,
		description: splitParagraphs(data[0].biography)
	});
});


/* GET project page. */
router.get('/project/:number/', function(req, res, next) {
	var featuredNumber = req.params.number;

	var data = global.site.sitewide;
	var portfolioData = global.portfolio.sitewide;
	var projectData;
	var currentCategory;
	for (var k=0; k<portfolioData.length; k++){
		if(portfolioData[k].projectnumber==featuredNumber){
			projectData = portfolioData[k];
			projectData.descriptionSplit = splitParagraphs(projectData.description);
			currentCategory = projectData.category;
		}
	}
	var verticalImage = '';
	if (projectData.verticalimage == 'TRUE'){
		verticalImage = 'verticalImage';
	}


	var promos = [];
	for (k=0; k<portfolioData.length; k++){
		if(portfolioData[k].category==currentCategory&&portfolioData[k].projectnumber!=featuredNumber){
			promos.push(portfolioData[k]);
		}
	}


	res.render('project', { 
		data: data,
		portfolioData: promos,
		projectData: projectData,
		featuredNumber: featuredNumber,
		verticalImage: verticalImage,
		category: 'showAll',
		loopLimit: 3,
		description: splitParagraphs(data[0].biography)
	});
});


/* GET blog page. */
router.get('/blog/', function(req, res, next) {
	var data = global.site.sitewide;
	var blogData = global.blog.sitewide;

	for (var j=0; j<blogData.length; j++){
		var splitPost = splitParagraphs(blogData[j].post);
		blogData[j].postSplit = splitPost;
	}


	res.render('blog', { 
		data: data,
		blogData: blogData,
		description: splitParagraphs(data[0].biography)
	});
});


module.exports = router;
