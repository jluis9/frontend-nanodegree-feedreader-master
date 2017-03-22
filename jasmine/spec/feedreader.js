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
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('Feeds are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /*Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('Feeds are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            })
        });

        /*Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Feeds are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            })
        });
    });


    /*Write a new test suite named "The menu" */
    describe('The menu', function() {

        var bodyElement = $('body').attr("class");
        var menuIcon = $(".menu-icon-link");

        /*Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         //This is the change per Udacity review Thank you 
        it('Menu element is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });

        /* : Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('Menu Changes visibility when the menu icon is clicked', function() {

            menuIcon.click();
            expect($('body').hasClass("menu-hidden")).toEqual(false);

            menuIcon.click();
            expect($('body').hasClass("menu-hidden")).toEqual(true);

        });
    });




    /* : Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* : Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {

            loadFeed(0, done);
        });

        it(' single entry element within the feed container', function(done) {

            expect($(".entry").length).not.toBe(0);
            done();
        });
    });
    /*Write a new test suite named "New Feed Selection"*/

    describe('New Feed Selection', function() {

        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var feedChoice = Math.floor(Math.random() * 3) + 1;
        //create global variable within this scope to push from beforeEach function;
        var previousContent;

        beforeEach(function(done) {
            loadFeed(0, function() {
                previousContent = $('.feed').html();
                loadFeed(feedChoice, done);
            });
        });
        //use afterEach (var  =  0 or null) to refresh feed container and keep test from being impacted by leftover content from previous test, using .empty() kept breaking the code
        afterEach(function() {
            previousContent = 0;
        });
        // use expect to see if the newly chosen .feed is different than the original invoked in the beforeEach function above
        it('New Content is Dispalyed', function() {
            expect($('.feed').html()).not.toBe(previousContent);
        }, 2000);

    });

}());
