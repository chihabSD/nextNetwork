import React from "react";
import Link from "next/link";
import { Menu, Container, Icon } from "semantic-ui-react";

import { useRouter } from "next/router";
function Navbar() {
  const router = useRouter();

  // get the active route
  const isActive = (route) => router.pathname === route;
  return (
    <Menu fluid borderless>
      <Container>
        <Link href="/login">
          <Menu.Item header active={isActive("/login")}>
            <Icon size="large" name="sign in" />
            Login
          </Menu.Item>
        </Link>
        <Link href="/signup">
          {/* <Menu.Item header active={true}> */}
          <Menu.Item header active={isActive("/signup")}>
            <Icon size="large" name="signup" />
            Register
          </Menu.Item>
        </Link>
      </Container>
    </Menu>
  );
}

export default Navbar;
