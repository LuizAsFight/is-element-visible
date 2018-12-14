is-element-visible
===============

Checks if a DOM element is really visible.
This repo is suppose to cover all caveats (display, opacity, visibility, overflow), so any suggestions/help/PR would be appreaciated.

No jQuery or any dependencies needed at all, just pure JS here :)

### Install

`npm i is-element-visible`

### Usage

``` Javascript
import isVisible from 'is-element-visible';

const el = document.getElementById('id');
isVisible(el);
```
