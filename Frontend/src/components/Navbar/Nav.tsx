import { useEffect, useState } from 'react'
import './Nav.css'

const Nav = () => {

    const [role, setRole] = useState('none')

    useEffect(() => {
        // Yehan Role Fetching Logic Ayega
        const random = setInterval(() => {
            setRole('admin')
        }, 6000)
        return () => clearInterval(random)
    }, [])

    return (
        <>
            
            <nav>
                <div className='NavTitle'>
                    <h1>SmartFAST Dashboard</h1>
                </div>
                <div className='NavBtns'></div>
            </nav>
        </>
    )
}

export default Nav
