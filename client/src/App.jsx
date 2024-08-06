import './App.css';
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Search from '../Components/Searchbar/Search';
import Todo from '../Components/ToDo/Todo';
import Done from '../Components/Done/Done';
import PeerReview from '../Components/PeerReview/PeerReview';
import Inprogress from '../Components/Inprogress/Inprogress';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = () => {
    setShowModal(true);
  };

  const handleSaveTask = async () => {
    const task = {
      task: newTask,
      description: description,
      status: status,
    };
    try {
      const response = await axios.post('http://localhost:5000/tasks', task);
      setTasks([...tasks, response.data]);
      setNewTask('');
      setDescription('');
      setStatus('To Do');
      setShowModal(false);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task._id !== id));
  };

  const moveTask = (id, newStatus) => {
    setTasks(tasks.map(task => task._id === id ? { ...task, status: newStatus } : task));
  };

  const filteredTasks = tasks.filter(task =>
    task.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="background-video">
        <video autoPlay muted loop id="bg-video">
          <source src="Vedio/bg_vedio.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      </div>
      <div className="container mt-5">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="row g-3">
          <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
            <Todo
              title="To Do"
              tasks={filteredTasks.filter(task => task.status === 'To Do')}
              onAddTask={handleAddTask}
              onDeleteTask={handleDeleteTask}
              moveTask={moveTask}
              noTaskMessage="Task is not listed yet"
            />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
            <Inprogress
              title="In Progress"
              tasks={filteredTasks.filter(task => task.status === 'In Progress')}
              onDeleteTask={handleDeleteTask}
              moveTask={moveTask}
              noTaskMessage="Task is not listed yet"
            />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
            <PeerReview
              title="Peer Review"
              tasks={filteredTasks.filter(task => task.status === 'Peer Review')}
              onDeleteTask={handleDeleteTask}
              moveTask={moveTask}
              noTaskMessage="Task is not listed yet"
            />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
            <Done
              title="Completed"
              tasks={filteredTasks.filter(task => task.status === 'Completed')}
              onDeleteTask={handleDeleteTask}
              moveTask={moveTask}
              noTaskMessage="Task is not listed yet"
            />
          </div>
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formNewTask">
                <Form.Label>Task</Form.Label>
                <Form.Control
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Enter new task"
                />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter task description"
                />
              </Form.Group>
              <Form.Group controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="custom-select"
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Peer Review">Peer Review</option>
                  <option value="Completed">Completed</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveTask}>
              Save Task
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </DndProvider>
  );
};

export default App;
