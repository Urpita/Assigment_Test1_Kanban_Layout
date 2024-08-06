import './Todo.css';
import React from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../utils/ItemTypes';

const Todo = ({ title, tasks, onAddTask, onDeleteTask, moveTask, noTaskMessage }) => {
  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      onDeleteTask(id);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item) => moveTask(item.id, 'To Do')
  });

  return (
    <>
      <Card className="mb-3" ref={drop}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <ListGroup variant="flush">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <ListGroup.Item key={task._id} className='List_g'>
                  <strong>{task.task}</strong>
                  <p>{task.description}</p>
                  <Button onClick={() => handleDeleteTask(task._id)}>
                    Delete
                  </Button>
                </ListGroup.Item>
              ))
            ) : (
              <p>{noTaskMessage}</p>
            )}
          </ListGroup>
        </Card.Body>
      </Card>
      <Button onClick={onAddTask} className="mt-3 btn">
        Add New Task
      </Button>
    </>
  );
};

export default Todo;





