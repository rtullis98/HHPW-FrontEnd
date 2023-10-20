import { dbUrl } from './OrderData';

const getAllItems = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/menuItem`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});
const getSingleItem = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/menuItem/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
// const getCategoryItem = (id) => new Promise((resolve, reject) => {
//   fetch(`${dbUrl}/menuItemCategory/${id}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => resolve(data))
//     .catch(reject);
// });

const createItem = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/menuItem`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(async (res) => {
      let data;
      if (res.ok) {
        data = await res.json();
        resolve(data);
      }
    })
    .catch(reject);
});
const updateItem = (payload) => new Promise((resolve, reject) => {
  console.warn('Update Item URL:', `${dbUrl}/api/menuItem/${payload.id}`);
  console.warn('Update Item Headers:', {
    'Content-Type': 'application/json',
  });
  console.warn('Update Item Payload:', payload);

  fetch(`${dbUrl}/api/menuItem/${payload.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(async (res) => {
      console.warn('Response Status:', res.status);

      let data;
      if (res.ok) {
        data = await res.json();
        console.warn('Response Data:', data);
        resolve(data);
      } else {
        console.warn('Error Response:', await res.json());
        reject(new Error('Error updating item'));
      }
    })
    .catch((error) => {
      console.error('Fetch Error:', error);
      reject(error);
    });
});

const deleteItem = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/menuItem/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});
const deleteItemFromOrder = (orderId, itemId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/MenuItemsOrder/${orderId}/${itemId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getAllItems,
  getSingleItem,
  createItem,
  updateItem,
  deleteItem,
  // getCategoryItem,
  deleteItemFromOrder,
};
