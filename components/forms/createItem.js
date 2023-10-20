import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { createItem, getSingleItem, updateItem } from '../../api/ItemData';

const initialState = {
  Name: '',
  Description: '',
  ImageUrl: '',
  Price: '',
};

export default function ItemForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    if (obj && obj.id) {
      getSingleItem(obj.id)
        .then((data) => {
          console.warn('API Response:', data); // Log the response
          // Check if data is not undefined before setting the form input
          if (data && Object.keys(data).length > 0) {
            // Map the properties to match the initial state
            const mappedData = {
              Name: data.name || '', // Adjust property names if needed
              Description: data.description || '',
              ImageUrl: data.imageUrl || '',
              Price: data.price || '',
            };
            setFormInput(mappedData);
          }
        })
        .catch((error) => {
          console.error('Error fetching item details:', error);
        });
    }
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      console.warn('Updating item with id:', obj.id);
      updateItem(formInput)
        .then(() => router.push('/'))
        .catch((error) => {
          console.error('Error updating item:', error);
        });
    } else {
      console.warn('Creating a new item');
      const payload = {
        ...formInput,
      };
      createItem(payload)
        .then(() => {
          router.push('/itemsOnDom');
        })
        .catch((error) => {
          console.error('Error creating item:', error);
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit} autoComplete="off">
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Item</h2>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCharName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            name="Name"
            value={formInput.Name}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridContent">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Description"
            name="Description"
            value={formInput.Description || ''}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridContent">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Price"
            name="Price"
            value={formInput.Price || ''}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridContent">
          <Form.Label>Image Url</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Link"
            name="ImageUrl"
            value={formInput.ImageUrl || ''}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </Form.Group>
      </Row>
      <Button type="submit">{obj.id ? 'Update' : 'Create'} Item</Button>
    </Form>
  );
}

ItemForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    Name: PropTypes.string,
    Description: PropTypes.string,
    Price: PropTypes.number,
  }),
};
ItemForm.defaultProps = {
  obj: initialState,
};
