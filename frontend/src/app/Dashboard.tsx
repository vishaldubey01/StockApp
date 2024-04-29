import { useState } from "react";

function Dashboard() {
    const [count, setCount] = useState(0);

    return (
        <>
            <h1>Dashboard</h1>
            <h1>Dashboard</h1>
            <div className='card'>
                <button
                    onClick={() => {
                        setCount((count) => count + 1);
                    }}
                >
                    count is {count}
                </button>
            </div>
        </>
    );
}

export default Dashboard;
