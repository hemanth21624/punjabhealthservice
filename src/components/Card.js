import React from 'react';
import { Card } from 'react-bootstrap';

const CustomCard = ({ title, children }) => {
  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        {title && <Card.Title className="text-primary">{title}</Card.Title>}
        {children}
      </Card.Body>
    </Card>
  );
};

export default CustomCard;