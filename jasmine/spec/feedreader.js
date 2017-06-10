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
    it('are defined', function() {
      expect(allFeeds).toBeTruthy();
    });


    /* A test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('every feed entry should have url defined, and it is not empty', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.url).toBeTruthy();
      });
    });

    /* A test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('every feed entry should have name defined, and it is not empty', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.name).toBeTruthy();
      });
    });
  });


  /* A new test suite named "The menu" */
  describe('The menu', function() {
    var menuHiddenTag = 'menu-hidden';
    var feedListAnchorClass = '.feed-list a';
    var menuButtonClass = '.menu-icon-link';

    /* a test that ensures the menu element is hidden by default. 
     * You'll have to analyze the HTML and the CSS to determine 
     * how we're performing the hiding/showing of the menu element.
     */
    it('should be hidden by default', function() {
      expect($('body').hasClass(menuHiddenTag)).toBeTruthy();
    });

    /* A set tests that ensures the menu changes visibility when 
     * the menu icon is clicked. This test should have two expectations: 
     * does the menu display when clicked and does it hide when clicked again.
     */
    it('should be displayed when menu button is clicked, if the menu was hidden.', function() {
      // give once click to make the menu appeared.
      $(menuButtonClass).click();
      expect($('body').hasClass(menuHiddenTag)).toBeFalsy();
    });

    it('should be hidden when menu button is clicked, if the menu was displayed.', function() {
      // give once click to make the menu appeared.
      $(menuButtonClass).click();
      expect($('body').hasClass(menuHiddenTag)).toBeFalsy();
      // Now this click should make the menu disappear.
      $(menuButtonClass).click();
      expect($('body').hasClass(menuHiddenTag)).toBeTruthy();
    });

    it('should be hidden when menu list is clicked, if the menu was displayed.', function() {
      // give first click to make the menu appeared.
      $(menuButtonClass).click();
      // now click the anchor link
      $(feedListAnchorClass)[0].click();
      expect($('body').hasClass(menuHiddenTag)).toBeTruthy();
    });
  });

  describe('Initial Entries', function() {
    /* A test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
    it('there is at least a single .entry element within the .feed container', function() {
      loadFeed(0, function(){
        expect($('.feed .entry').length).toBeGreaterThan(0);
      });
    });

    /**
     * A test that ensures when init function is called, the loadFeed() function was called
     * with parameter 0, and only call once.
     */
    it('the loadFeed(0) is called in init function, and only called once.', function() {
      spyOn(window, 'loadFeed');
      init();
      expect(window.loadFeed).toHaveBeenCalledWith(0);
      expect(window.loadFeed.calls.count()).toEqual(1);
    });
  });


  describe('New Feed Selection', function() {
    var feedListAnchorClass = '.feed-list a';
    var menuButtonClass = '.menu-icon-link';

    beforeAll(function(done) {
      loadFeed(0, done);
    });
    /* A test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
    it('The content of .feed container should be changed, when loadFeed(1) is called', function(done) {
      var oldContent = $('.feed').html();
      loadFeed(1, function() {
        expect($('.feed').html()).not.toEqual(oldContent);
        done();
      });
    });

    /**
     * A test that ensures when click a link in menu feedlist, the loadFeed() function is called
     * with correct index, and only is called once.
     */
    it('the loadFeed() is called with correspond index, when click a link', function() {
      spyOn(window, 'loadFeed');
      var index = 3;
      $(menuButtonClass).click();
      // now click the anchor link
      $(feedListAnchorClass)[index].click();
      expect(window.loadFeed).toHaveBeenCalledWith(index);
      expect(window.loadFeed.calls.count()).toEqual(1);
    });
  });
}());