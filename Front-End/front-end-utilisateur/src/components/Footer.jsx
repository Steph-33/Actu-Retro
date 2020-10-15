import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-left">
        &copy; Copyright ActuRetro 2020 - Tous droits réservés.{' '}
      </div>
      <div className="footer-right">
        <Link className="footer-link">Plan du site</Link>
        <Link className="footer-link" to="/login">
          Mon compte
        </Link>
        <Link className="footer-link">Nous contacter</Link>
      </div>
    </div>
  );
}
