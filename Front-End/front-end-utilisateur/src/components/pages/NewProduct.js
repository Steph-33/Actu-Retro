import React from 'react';
import { useEffect } from 'react';

export default function NewProduct() {
  useEffect(() => {
    document.title = 'ActuRetro | Produits Neufs';
  });
  return (
    <div>
      <p>Voici les nouveaux produits</p>
    </div>
  );
}
