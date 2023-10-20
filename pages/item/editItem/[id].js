import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ItemForm from '../../../components/forms/createItem';
import { getSingleItem } from '../../../api/ItemData';

export default function EditItem() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getSingleItem(id).then(setEditItem);
    }
  }, [id]);

  // Display a loading state or null if editItem is empty
  if (!Object.keys(editItem).length) {
    return null; // or loading state
  }

  console.warn(editItem);
  return <ItemForm obj={editItem} />;
}
