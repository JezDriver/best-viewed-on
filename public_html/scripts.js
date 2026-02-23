/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



function startup() {
  // Viewport vars
  var 
    screenWidth, 
    screenHeight, 
    screenX, 
    screenY, 
    browserWidth, 
    browserHeight, 
    innerWidth, 
    innerHeight, 
    browserChromeX, 
    browserChromeY, 
    maxViewportWidth, 
    maxViewportHeight;

  // Target vars
  var
    targetWidth,
    targetHeight,
    widthDiff,
    heightDiff;
  var leeway = 1;

  /**
   * Update viewport vars
   */
  function initViewportSize() {
    screenWidth = window.screen.availWidth;
    screenHeight = window.screen.availHeight;
    screenX = window.screenX;
    screenY = window.screenY;
    browserWidth = window.outerWidth;
    browserHeight = window.outerHeight;
    innerWidth = window.innerWidth;
    innerHeight = window.innerHeight;

    browserChromeX = browserWidth - innerWidth;
    browserChromeY = browserHeight - innerHeight;

    maxViewportWidth = screenWidth - screenX - browserChromeX;
    maxViewportHeight = screenHeight - screenY - browserChromeY;
  }
  initViewportSize();


  function createNewTarget() {
    targetWidth = getRandomInt(400, maxViewportWidth);
    targetHeight = getRandomInt(400, maxViewportHeight);

    console.log(targetWidth + " x " + targetHeight);
  }
  createNewTarget();


  function updateViewportSize() {
    initViewportSize();

    console.log(innerWidth + " x " + innerHeight);
    
    widthDiff = targetWidth - innerWidth;
    heightDiff = targetHeight - innerHeight;

    if (widthDiff <= leeway && heightDiff <= leeway) {
      console.log("YIPPEE");
      createNewTarget();
    }
  }

  window.__resizeFrame().addResizeListener(updateViewportSize);


  
}

window.addEventListener("DOMContentLoaded", function () {
  startup();
})
