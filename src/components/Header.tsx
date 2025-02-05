import { NavLink } from "react-router-dom"

export default function Header() {
    return (
        ///TODO ADD THE ROUTES HERE
        <header>
            <nav>
                <h1>Find Waldo</h1>
                <NavLink to="">New Game</NavLink>
                <NavLink to="">Scoreboard</NavLink>
            </nav>
        </header>
    )
};