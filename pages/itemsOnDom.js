import React, { useEffect, useState } from 'react';
// import { Button } from 'react-bootstrap';
import { getAllItems } from '../api/ItemData';
import ItemCard from '../components/cards/itemCard';

export default function ItemsOnDom() {
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    getAllItems().then((items) => {
      setAllItems(items);
    });
  }, []);

  return (
    <div className="animate__animated animate__bounceInDown">
      <div className="text-center my-4">
        <div className="d-flex flex-wrap">
          {allItems.map((item) => (
            <ItemCard key={item.id} itemObj={item} onUpdate={() => {}} />
          ))}
        </div>
      </div>
    </div>
  );
}
