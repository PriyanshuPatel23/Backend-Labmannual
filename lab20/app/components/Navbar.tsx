'use client';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Navbar as BootstrapNavbar } from 'react-bootstrap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <BootstrapNavbar expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <BootstrapNavbar.Brand as={Link} href="/">MyApp</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} href="/" active={pathname === '/'}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} href="/about" active={pathname === '/about'}>
              About
            </Nav.Link>
            <Nav.Link as={Link} href="/contact" active={pathname === '/contact'}>
              Contact
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}