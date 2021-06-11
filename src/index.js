const isOverflowHidden = el => getComputedStyle(el, 'overflow') === 'hidden';
const getComputedStyle = (el, property) => {
  const computedStyle = window.getComputedStyle
    ? document.defaultView.getComputedStyle(el,null)
    : el.currentStyle;

  return property 
    ? computedStyle[property]
    : computedStyle;
}
const isOnDocument = el => {
  const ownerDocument = el.ownerDocument;
  while (el = el.parentNode) {
    if (el == ownerDocument) return true;
  }
  return false;
};
const isVisibleDueToOverflow = (el, parentEl) => {
  const elPositioning = getPositioning(el.getBoundingClientRect());

  while (el = el.parentNode) {
    if (el.nodeType !== 9 && isOverflowHidden(el)) {
      const parentElPositioning = getPositioning(el.getBoundingClientRect());

      const isElInsideParentRectX = ( elPositioning.startX >= parentElPositioning.startX && elPositioning.endX <= parentElPositioning.endX );
      const isElInsideParentRectY = ( elPositioning.startY >= parentElPositioning.startY && elPositioning.endY <= parentElPositioning.endY );
  
      if (!isElInsideParentRectX || !isElInsideParentRectY) return false;
    }
  }

  return true;
};
const getPositioning = ({ x, width, y, height }) => ({
  startX: parseInt(x),
  endX: parseInt(x) + parseInt(width),
  startY: parseInt(y),
  endY: parseInt(y) + parseInt(height)
});

function isVisible(el) {
  if ( !isOnDocument(el) ) return false;

  const isHiddenDueToOpacity = getComputedStyle(el, 'opacity') === '0';
  const isHiddenDueToDisplay = getComputedStyle(el, 'display') === 'none';
  const isHiddenDueToVisibility = getComputedStyle(el, 'visibility') === 'hidden';
  if ( isHiddenDueToOpacity || isHiddenDueToDisplay || isHiddenDueToVisibility ) return false;

  return isVisibleDueToOverflow(el);
}

Element.prototype.isVisible = function() {
  return isVisible(this);
};

export default isVisible;