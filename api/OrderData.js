const dbUrl = 'https://localhost:7015';
const getAllOrders = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch orders: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then(resolve)
    .catch(reject);
});

const getSingleOrder = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/orders/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const createOrder = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/orders`, {
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
const updateOrder = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/orders/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      console.warn(response); // Log the response for debugging
      return response.json();
    })
    .then((data) => {
      console.warn(data); // Log the parsed JSON data for debugging
      resolve(data);
    })
    .catch((error) => {
      console.error(error); // Log any errors for debugging
      reject(error);
    });
});

const deleteOrder = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/orders/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});
const getAllItemsOnOrder = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/orderItems/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});
const addItemsToOrder = (itemId, orderId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/MenuItemsOrder/${itemId}/${orderId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  createOrder,
  updateOrder,
  getAllOrders,
  getSingleOrder,
  dbUrl,
  deleteOrder,
  getAllItemsOnOrder,
  addItemsToOrder,
};
