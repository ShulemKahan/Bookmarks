import React, { useEffect, useState } from "react";
import axios from 'axios'
const Home = () => {
    const [topFive, setTopFive] = useState([])

    useEffect(() => {
        const getTopFive = async () => {
            const { data } = await axios.get('api/bookmark/gettopfive')
            setTopFive(data)
            console.log(data)
        }
        getTopFive()
    }, [])

    return (
        <div className="container">
            <div className="col-md-10">
                <div className="row"><h2>Welcome</h2></div>
                <div className="row"><h4>The Top Five</h4></div>
                <table className="table table-bordered bg-light">
                    <thead>
                        <tr>
                            <th>Url</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                            {topFive.map(b =>
                        <tr>
                            <td>{<a href={b.url} target="_blank">{b.url}</a>}</td>
                            <td>{b.count}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>)
}

export default Home