import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <header>
        <nav className="navbar navbar-light bg-dark">
          <Link className="navbar-brand text-light" to='/'>CRUX - The Collaborative Resource Understanding and Exchange Program</Link>
        </nav>
      </header>
    )
  }
}