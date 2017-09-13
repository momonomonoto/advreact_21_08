import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {DropTarget} from 'react-dnd'
import {connect} from 'react-redux'
import {deleteEvent} from '../../ducks/events'


class Basket extends Component {
    static propTypes = {

    };

    render() {
        const {connectDropTarget, hovered, canDrop, people} = this.props
        const dropStyle = {
            border: `4px solid ${canDrop?`black`:`transparent`}`
        }
        return connectDropTarget(
            <div style={{width:'200px',height:'100px ',backgroundColor:'#a68585',...dropStyle}}>
                Drag event here to delete!
            </div>
        )
    }
}

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop(),
    hovered: monitor.isOver()
})

const spec = {
    drop(props, monitor) {
        const eventDragUid = monitor.getItem().uid
        console.log(eventDragUid,'eventDragUid');
        console.log('start');
        props.deleteEvent(eventDragUid);
        return { eventDragUid }
    }
}

export default connect(null, {deleteEvent}) (DropTarget ('event',spec, collect)(Basket))
