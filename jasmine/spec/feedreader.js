/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    //A test about the RSS feeds definitions, the allFeeds variable in our application.
    describe('RSS Feeds', function() {
        //This tests to make sure that the allFeeds variable has been defined and that it is not empty. 
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        //A test that loops through each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty.
		it('loop through urls', function() {
			for(let feed of allFeeds) {
				expect(feed.url).toBeDefined();
				expect(feed.url).toBeTruthy();
			}
		});

        //A test that loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty.
		it('loop through names', function(){
			for(let feed of allFeeds) {
				expect(feed.name).toBeDefined();
				expect(feed.name.length).not.toBe(0);
			}
		});	
	});

    //A test named "The menu"
	describe('The menu', function() {

        //Menu element is hidden by default.
		it('menu hidden by default', function() {
			const body = document.querySelector('body');
			expect(body.classList.contains('menu-hidden')).toBe(true);
		});

         //Menu changes visibility when the menu icon is clicked.
		it('menu changes when clicked', function() {
			const body = document.querySelector('body');
			const menu = document.querySelector('.menu-icon-link');
			
			//On click to show and hide sidebar menu
			menu.click();
			expect(body.classList.contains('menu-hidden')).toBe(false);
			
			menu.click();
			expect(body.classList.contains('menu-hidden')).toBe(true);
		});
	});
    //A test named "Initial Entries"
	describe('Initial Entries', function() {
		
        //The loadFeed function is called and completes its work, there is at minimum a single .entry element within the .feed.
		beforeEach(function(done) {
			loadFeed(0,done);
		});
		
		it('single entry after load feed', function() {
			const feed = document.querySelector('.feed');
			expect($('.feed .entry').length > 0).toBe(true);
		});
	});
	
    //A test named "New Feed Selection"
	describe('New Feed Selection', function() {
		const feed = document.querySelector('.feed');
		const newFeed = [];
        
		//A new feed is loaded by the loadFeed function that the content actually changes.
		beforeEach(function(done) {
			//this feed loads first
			loadFeed(0, function(){
				//loads entries into an array
				Array.from(feed.children).forEach(function(entry) {
					newFeed.push(entry.innerText);
				});
				//loads newfeed after done loading feed
				loadFeed(1,done);
			});
		});
		
		//Compare feeds, omit duplicates
		it('new feed loaded', function() {
			Array.from(feed.children).forEach(function(entry,index) {
			expect(feed).not.toEqual(newFeed);
			});
	});
});
});