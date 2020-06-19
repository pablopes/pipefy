/*REACT*/
import React, {useRef, useContext} from 'react';
import {useDrag, useDrop} from 'react-dnd';
/*STYLES*/
import {Container, Label} from './styles';
/*SERVICE*/
import BoardContext from '../board/context';

export default function Card({data, index, listIndex}){
    const ref = useRef();
    const {move} = useContext(BoardContext);

   const [{isDragging}, dragRef] = useDrag({
        item: {type: 'CARD', index, listIndex},
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        })
    });

    const [, dropRef] = useDrop({
        accept: 'CARD',
        hover(item, monitor){
            const draggedListIndex = item.listIndex;
            const targetListIndex = listIndex;

            const draggetdIndex = item.index;
            const tragetIndex = index;

            if(draggetdIndex === tragetIndex && draggedListIndex === targetListIndex){
                return;
            }
            
            const targetSize = ref.current.getBoundingClientRect();
            const targetCenter = (targetSize.bottom - targetSize.top)/2;

            const draggetOffset = monitor.getClientOffset();
            const draggedTop = draggetOffset.y - targetSize.top; 

            if(draggetdIndex < tragetIndex && draggedTop < targetCenter){
                return;
            }
            if(draggetdIndex > tragetIndex && draggedTop > targetCenter){
                return;
            }

            move(draggedListIndex, targetListIndex, draggetdIndex, tragetIndex);

            item.index = tragetIndex;
            item.listIndex = targetListIndex;
        }
    });

    dragRef(dropRef(ref));
    return (
       <Container ref={ref} isDragging={isDragging}>
           <header>
               {data.labels.map(label => <Label color={label} key={label}/>)}
               
           </header>

           <p>{data.content}</p>

           { data.user && <img src={data.user} alt="" /> }
       </Container>
    );
}