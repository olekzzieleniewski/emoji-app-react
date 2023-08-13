import { useEffect, useState } from "react"
import axios from "axios"
import ReactDOM from "react-dom"

//aacdcd27a28f68139f9e37b83dadc481518bbf83
function Container() {
  const [data, setData] = useState([])
  const [search, setSearch] = useState("")

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
      <div className="result">
        {data.map((e, i) => (
          <div className="card" key={e.slug}>
            <p>{e.character}</p>
            <p>{e.unicodeName}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Container
