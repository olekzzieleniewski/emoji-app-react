import { useEffect, useState } from "react"
import axios from "axios"

function Container() {
  const [data, setData] = useState([])
  const [search, setSearch] = useState("")
  function catchError() {
    let renderedData

    try {
      renderedData = data.map((e, i) => (
        <div className="card" key={e.slug}>
          <p>{e.character}</p>
          <p>{e.unicodeName}</p>
        </div>
      ))
    } catch (error) {
      renderedData = <p className="error">❌Emoji not found. Try again...❌</p>
    }
    return <div className="result">{renderedData}</div>
  }

  useEffect(() => {
    axios
      .get(
        `https://emoji-api.com/emojis?access_key=0f95738b26e7dd018683277b6e552c6b2f8dac60`
      )
      .then((res) => {
        setData(res.data)
      })
  }, [])

  const handleClick = () => {
    if (search !== "") {
      axios
        .get(
          `https://emoji-api.com/emojis?search=${search}&access_key=0f95738b26e7dd018683277b6e552c6b2f8dac60`
        )
        .then((res) => {
          setData(res.data)
          console.log(res)
        })
        .then((err) => {
          console.log(err)
        })
      console.log(search)
    }
  }
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }
  return (
    <div className="container">
      <center>
        <div className="serchsection">
          <input
            type="text"
            name="search"
            placeholder="Type your emoji..."
            value={search}
            onChange={(e) => handleSearch(e)}
          ></input>
          <button
            type="button"
            className="searchbutton"
            onClick={() => handleClick()}
          >
            Search
          </button>
        </div>
      </center>
      <div className="result">{catchError()}</div>
    </div>
  )
}
export default Container
