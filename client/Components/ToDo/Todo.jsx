import './Todo.css';
import React from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';
import { useDrop } from 'react-dnd';
import axios from 'axios';
import TaskItem from './TaskItem';
import { ItemTypes } from '../../utils/ItemTypes';

const Todo = ({ title, tasks, onAddTask, onDeleteTask, moveTask }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item) => moveTask(item.id, 'To Do'),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} >
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <ListGroup variant="flush">
            {tasks.map((task) => (
              <TaskItem key={task._id} task={task} onDeleteTask={onDeleteTask} />
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
      <Button onClick={onAddTask} className="mt-3 btn">
        Add New Task
      </Button>
    </div>
  );
};

export default Todo;
