// import React from 'react'
// import { DropTarget } from 'react-dnd'
// import ItemTypes from './ItemTypes'
// const style = {
//   height: '7rem',
//   width: '7rem',
//   marginRight: '1.5rem',
//   marginBottom: '1.5rem',
//   color: 'white',
//   padding: '1rem',
//   textAlign: 'center',
//   fontSize: '1rem',
//   lineHeight: 'normal',
//   float: 'left',
// }
// const Statbox = ({ name, value, canDrop, isOver, allowedDropEffect, connectDropTarget }) => {
//   const isActive = canDrop && isOver
//   let backgroundColor = '#222'
//   if (isActive) {
//     backgroundColor = 'darkgreen'
//   } else if (canDrop) {
//     backgroundColor = 'darkkhaki'
//   }
//   return connectDropTarget(
//     <div style={{ ...style, backgroundColor }}>
//       {name}
//       <br />
//       {value}
//       <br />
//       {isActive ? 'Release to drop' : 'Drag a box here'}
//     </div>,
//   )
// }
// export default DropTarget(
//   ItemTypes.BOX,
//   {
//     drop: ({ allowedDropEffect }) => ({
//       name: `${allowedDropEffect} Statbox`,
//       allowedDropEffect,
//     }),
//   },
//   (connect, monitor) => ({
//     connectDropTarget: connect.dropTarget(),
//     isOver: monitor.isOver(),
//     canDrop: monitor.canDrop(),
//   }),
// )(Statbox)
