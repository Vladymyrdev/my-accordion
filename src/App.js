import React, { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [items, setItems] = useState([
    {
      id: '1',
      title: 'Item 1',
      content: 'Hello world 1',
    },
    {
      id: '2',
      title: 'Item 2',
      content: 'Hello world 2',
    },
    {
      id: '3',
      title: 'Item 3',
      content: 'Hello world 3',
    },
    {
      id: '4',
      title: 'Item 4',
      content: 'Hello world 4',
    },
    {
      id: '5',
      title: 'Item 5',
      content: 'Hello world 5',
    },
  ]);

  const [selectedItem, setSelectedItem] = useState('');

  const selectItem = (id) => {
    setSelectedItem((prevId) => (prevId === id ? '' : id));
  };

  const [editItem, setEditItem] = useState(null);

  const onTitleChange = (e) => {
    setEditItem((prev) => ({ ...prev, title: e.target.value }));
  };

  const edit = (newItem) => {
    setItems((prev) => {
      const ind = prev.findIndex((item) => item.id === newItem.id);

      const newItems = [
        ...prev.slice(0, ind),
        { ...newItem },
        ...prev.slice(ind + 1),
      ];

      return newItems;
    });
  };

  const saveTitleBlur = () => {
    edit(selectItem);
    setSelectedItem(null);
  };

  const onKeyDownSave = (e) => {
    e.stopPropagation();
    if (e.code === 'Tab' || e.code === 'Enter') {
      edit(editItem);
      setEditItem(null);
      return;
    }

    if (e.code === 'Escape') {
      setEditItem(null);
    }
  };

  return (
    <Accordion activeKey={selectedItem}>
      {items.map((item) => (
        <Accordion.Item
          eventKey={item.id}
          key={item.id}
          onClick={() => selectItem(item.id)}
        >
          <Accordion.Header>
            {editItem && item.id === editItem.id ? (
              <input
                value={editItem.title}
                onChange={onTitleChange}
                onBlur={saveTitleBlur}
                onKeyDown={onKeyDownSave}
              />
            ) : (
              <span onClick={() => setEditItem(item)}>{item.title}</span>
            )}
          </Accordion.Header>
          <Accordion.Body>{item.content}</Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default App;
