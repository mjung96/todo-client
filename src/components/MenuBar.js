import React, { useState, useContext } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth.js';
import plainback from '../white.png'

function MenuBar() {
  const pathname = window.location.pathname;
  const path = pathname === '/' ? 'home' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path)
  const { user, logout } = useContext(AuthContext);

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
    //window.location.reload(true);
  }
    //setActiveItem(name);

  const menuBar = user ? (
    <Menu pointing secondary size="massive">
          <Menu.Item
            name={user.username}
            active
            as={Link}
            to="/"
            style={{color:'red'}}
          />
          <Menu.Menu position='right'>
            <Menu.Item
                name='logout'
                onClick={logout}
                style={{color:'#BF40BF'}}
            />
          </Menu.Menu>
        </Menu>
  ) : (
    <Menu pointing secondary size="massive" style={{backgroundImage: `url(${plainback})`}}>
          <Menu.Item
            name='Log in pls'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to="/"
            style={{color:'yellow'}}
          />
          <Menu.Menu position='right'>
            <Menu.Item
                name='login'
                active={activeItem === 'login'}
                onClick={handleItemClick}
                as={Link}
                to="/login"
                style={{color:'orange'}}
            />
            <Menu.Item
                name='register'
                active={activeItem === 'register'}
                onClick={handleItemClick}
                as={Link}
                to="/register"
                style={{color:'pink'}}
            />
          </Menu.Menu>
        </Menu>
  )

    return (menuBar
        // <Menu pointing secondary size="massive">
        //   <Menu.Item
        //     name='home'
        //     active={activeItem === 'home'}
        //     onClick={handleItemClick}
        //     as={Link}
        //     to="/"
        //   />
        //   <Menu.Menu position='right'>
        //     <Menu.Item
        //         name='login'
        //         active={activeItem === 'login'}
        //         onClick={handleItemClick}
        //         as={Link}
        //         to="/login"
        //     />
        //     <Menu.Item
        //         name='register'
        //         active={activeItem === 'register'}
        //         onClick={handleItemClick}
        //         as={Link}
        //         to="/register"
        //     />
        //   </Menu.Menu>
        // </Menu>
    )
}

export default MenuBar