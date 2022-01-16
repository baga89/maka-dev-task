let direction = 'up';
let prevYPosition = 0;

// Use this function only if you need scroll
// direction
function setScrollDirection(elem) {
  if (elem.scrollTop > prevYPosition) {
    direction = 'down';
  } else {
    direction = 'up';
  }

  prevYPosition = elem.scrollTop;
}
