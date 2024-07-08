import { Outlet ,Link} from "react-router-dom";
import { Fragment } from "react";
import {ReactComponent as CrwnLogo } from "../../assets/crown.svg" ;
import './navigation.styles.scss';

const Navigation = () => {
    return <Fragment>
        <div className="navigation">
            <div className="logo" >
                <Link className="logo-container" to="/">
                    <CrwnLogo className="logo" />
                </Link>
            </div>
            <div className="nav-links-container">
                <Link className="nav-link" to="/shop">
                    SHOP
                </Link>
                <Link className="sign-in-link" to="/sign-in">
                  SignIn
                </Link>
            </div>

        </div>
      <div>
        <Outlet/>
      </div>   
    </Fragment> 
  }

export default Navigation;