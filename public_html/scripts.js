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
    heightDiff,
    closeEnoughTimeout;
  var leeway = 0;

  // Other vars
  var closeEnough = false;
  var lingerTimeMs = 500;


  // DOM Elements
  var targetSizeText = document.querySelector('.js-target-size');
  var currentSizeText = document.querySelector('.js-current-size');


  /**
   * Update viewport vars
   */
  async function measureViewportSize() {
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
  measureViewportSize();


  /**
   * Generate a new target resolution
   */
  function createNewTarget() {
    targetWidth = Math.ceil(getRandomInt(400, maxViewportWidth) / 10) * 10;
    targetHeight = Math.ceil(getRandomInt(400, maxViewportHeight) / 10) * 10;

    targetSizeText.innerText = targetWidth + " x " + targetHeight;
  }
  createNewTarget();


  /**
   * Checks current viewport size, compares it to the current size
   * - runs on resize, but matching framerate
   */
  async function updateViewportSize() {
    await measureViewportSize();
    currentSizeText.innerText = innerWidth + " x " + innerHeight;

    closeEnough = await isCloseEnough();

    if (!closeEnoughTimeout) {
      // Timer hasn't started
      if (closeEnough) {
        // It's matching, start the timer
        closeEnoughTimeout = setTimeout(youDidIt, lingerTimeMs);
      }
    }
    else {
      // Timer has started
      if (!closeEnough) {
        // No longer matching, cancel the timer
        clearTimeout(closeEnoughTimeout);
        closeEnoughTimeout = null;
      }
    }
  }
  window.__resizeFrame().addResizeListener(updateViewportSize);


  /**
   * Compares current viewport width and height to the target
   * 
   * @returns closeEnough
   */
  function isCloseEnough() {
    widthDiff = Math.abs(targetWidth - innerWidth);
    heightDiff = Math.abs(targetHeight - innerHeight);
    
    if (widthDiff <= leeway && heightDiff <= leeway) {
      return true;
    }
    else {
      return false;
    }
  }


  /**
   * Successful viewport size match to the target
   */
  function youDidIt() {
    createNewTarget();
  }
  
}

window.addEventListener("DOMContentLoaded", function () {
  startup();
})
