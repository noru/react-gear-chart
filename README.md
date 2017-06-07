# A Gear-style Chart Component for React

![sample](./img/sample.png)

[Demo](http://todo)

Install

```
npm install react-gear-list-chart
```

Usage

```javascript
import GearListChart from 'react-gear-list-chart'

// in your render() or whatever
<GearListChart 
  startAngle={110} endAngle={250} 
  outerRadius={outer_R} innerRadius={outer_r}
  margin={7}
  onClick={yourClickHandler}
  clockwise={false}
  items={items} // items to be rendered as teeth on the gear
  />

```