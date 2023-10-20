/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>CHANGE ME</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/OrdersOnDom">
              <Nav.Link>All Orders</Nav.Link>
            </Link>
            <Link passHref href="/itemsOnDom">
              <Nav.Link>All Items</Nav.Link>
            </Link>
            <Link passHref href="/order/new">
              <Nav.Link>Start Order</Nav.Link>
            </Link>
            <Link passHref href="/item/new">
              <Nav.Link>Create New Item</Nav.Link>
            </Link>
            <Link passHref href="/RevenueOnDom">
              <Nav.Link>Revenue</Nav.Link>
            </Link>
            <Button variant="danger" onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
