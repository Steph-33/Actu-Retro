import React from 'react';
import { Link } from 'react-router-dom';

class UserCard extends React.Component {
  constructor() {
    super();

    this.state = {
      displayMenu: false,
    };

    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
  }

  showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener('click', this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });
  }

  render() {
    return (
      <div>
        <Link
          onClick={this.showDropdownMenu}
          style={{ textDecoration: 'none' }}
          className="dropdown-menu"
        >
          UTILISATEUR
        </Link>

        {this.state.displayMenu ? (
          <div
            className="menu"
            ref={(element) => {
              this.dropdownMenu = element;
            }}
          >
            <Link
              to="/register"
              style={{ textDecoration: 'none' }}
              className="menu-choice"
            >
              Créer un compte
            </Link>
            <Link
              to="/login"
              style={{ textDecoration: 'none' }}
              className="menu-choice"
            >
              Se connecter
            </Link>
          </div>
        ) : null}
      </div>
    );
  }
}

export default UserCard;
