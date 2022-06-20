import { useEffect, useState } from 'react'

export default function App() {
  const [route, setRoute] = useState('')

  const [stationList, setStationList] = useState([])
  const [errors, setErrors] = useState([])

  useEffect(() => {}, [stationList])

  function addStation() {
    setStationList([...stationList, { name: '', lat: '', long: '' }])
  }

  function hasError(index) {
    return errors.findIndex((error) => error === index) !== -1
  }

  const addDisabled = route.length === 0

  const saveEnabled =
    stationList.length > 0 &&
    errors.length === 0 &&
    stationList.every((station) =>
      Object.values(station).every((value) => value.length > 0)
    )

  function nameOnChangeHandle(e, index) {
    const { value } = e.target

    stationList[index].name = value
    setStationList([...stationList])

    const nameList = stationList.map((station) => station.name)
    const nameDuplicates = nameList
      .map((name, index) =>
        name.length > 0 && nameList.indexOf(name) !== index ? index : undefined
      )
      .filter((index) => index)
    setErrors(nameDuplicates)
  }

  return (
    <>
      <input
        type="text"
        placeholder="Güzergah"
        value={route}
        onChange={(e) => {
          setRoute(e.target.value)
        }}
      />
      <hr />
      <button disabled={addDisabled} onClick={addStation}>
        Yeni Ekle
      </button>
      <hr />
      {stationList.map((station, index) => (
        <div key={index} style={{ border: '1px solid red', padding: 10 }}>
          <input
            type="text"
            placeholder="Durak Adı"
            value={station.name}
            onChange={(e) => nameOnChangeHandle(e, index)}
          />
          {hasError(index) && <span>Değer aynı olamaz!</span>}
          <input
            type="text"
            placeholder="Enlem"
            onChange={(e) =>
              setStationList((prev) => {
                prev[index].lat = e.target.value
                return [...prev]
              })
            }
          />
          <input
            type="text"
            placeholder="Boylam"
            onChange={(e) =>
              setStationList((prev) => {
                prev[index].long = e.target.value
                return [...prev]
              })
            }
          />
        </div>
      ))}
      <hr />
      <button disabled={!saveEnabled}>Kaydet</button>
      <hr />
    </>
  )
}
