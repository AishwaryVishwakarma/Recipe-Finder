import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdFastfood } from "react-icons/md";
import classes from "./Navbar.module.css";

const Navbar = (props) => {
  /*Inpur Ref*/
  const inputRef = React.useRef("");

  return (
    <nav className={classes.nav}>
      <ul className={classes.nav__items}>
        <form
          onSubmit={(event) => {
            props.handleSubmit(event, inputRef.current.value);
          }}
          className={classes.input__field}
        >
          <input type="text" placeholder="eg. pasta, chicken" ref={inputRef} />
          <AiOutlineSearch
            className={classes.search__icon}
            onClick={props.handleSubmit}
          />
        </form>
        <li className={classes.subTitle}>Find your perfect recipe</li>
        <li className={classes.title}>
          <MdFastfood className={classes.food__icon} />
          Recipe Finder
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
