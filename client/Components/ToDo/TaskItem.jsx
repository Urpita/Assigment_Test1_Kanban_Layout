import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../utils/ItemTypes';

const TaskItem = ({ task, onDeleteTask }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <ListGroup.Item ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }} className="List_g">
      <strong>{task.task}</strong>
      <p>{task.description}</p>
      <Button onClick={() => onDeleteTask(task._id)}>
        Delete
      </Button>
    </ListGroup.Item>
  );
};

export default TaskItem;
