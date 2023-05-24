import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { bodyType, selectedCharacter } from "../../features/counter/counterSlice"
import { useDispatch } from "react-redux"

export default function NavbarComponent() {
    const dispatch = useDispatch()
    const defaultState = () => {
        dispatch(selectedCharacter(""))
        dispatch(bodyType(""))
    }
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">{""}</Navbar.Brand>
                    <Nav className="me-auto">
                        {/* <Nav.Link > */}
                        <Link className='nav-link' to="/admin">Admin</Link>
                        {/* </Nav.Link>
                        <Nav.Link > */}
                        <Link onClick={defaultState} className='nav-link' to="/">Features</Link>
                        {/* </Nav.Link> */}
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}
