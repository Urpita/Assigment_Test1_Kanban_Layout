import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../utils/ItemTypes';
import TaskItem from '../ToDo/TaskItem';
import './peerReview.css'

const PeerReview = ({ title, tasks, moveTask, onDeleteTask }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item) => moveTask(item.id, 'Peer Review'),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} >
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <ListGroup variant="flush" >
            {tasks.map((task) => (
              <TaskItem key={task._id} task={task} onDeleteTask={onDeleteTask} />
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PeerReview;
