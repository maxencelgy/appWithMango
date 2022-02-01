import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

const Nav = styled.nav`
  background: #27273f;
`;
const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
`;

const StyledLink = styled.a`
  padding: 0rem 2rem;
  font-size: 3rem;
  color: #fff;
  text-decoration: none;
`;
const StyledLinkTomato = styled.a`
  color: #fff;
  text-decoration: none;
  padding: 0.8rem 2rem;
  border-radius: 0.3rem;
  border: none;
  background: linear-gradient(109deg, #ff5e00, #f54562 54%, #c32de1);
  font-size: 1em;
  box-shadow: 0 8px 8px -4px rgb(245 69 98 / 12%),
    0 16px 24px 0 rgb(245 69 98 / 24%), 0 2px 4px -1px rgb(27 10 82 / 12%),
    0 0 1px 0 rgb(245 69 98 / 24%);
`;

export const Navbar = () => {
  const router = useRouter();
  return (
    <Nav>
      <Wrapper>
        <div>
          <Link href="/" passHref>
            <StyledLink>NXT</StyledLink>
          </Link>
        </div>

        <div>
          <Link
            href="/tasks/new"
            passHref
            onClick={() => router.push("/tasks/new")}
          >
            <StyledLinkTomato>New task</StyledLinkTomato>
          </Link>
        </div>
      </Wrapper>
    </Nav>
  );
};
