import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdFastfood } from "react-icons/md";
import classes from "./Navbar.module.css";

const Navbar = React.memo((props) => {
  // console.log("Navbar.jsx");

  /*Inpur Ref*/
  const inputRef = React.useRef("");

  function onSubmitHandler(e) {
    e.preventDefault();
    props.handleSubmit(inputRef.current.value);
  }

  return (
    <nav className={classes.nav}>
      <ul className={classes.nav__items}>
        <form
          onSubmit={onSubmitHandler}
          className={classes.input__field}
        >
          <input type="text" placeholder="eg. pasta, chicken" ref={inputRef} />
          <AiOutlineSearch
            className={classes.search__icon}
            onClick={onSubmitHandler}
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
});

export default Navbar;
