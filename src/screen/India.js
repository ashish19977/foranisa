import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, FlatList, Button } from 'react-native'
import Searchbar from '../components/Searchbar'
import axios from 'axios'
import { ScrollView } from 'react-native-gesture-handler'

const India = () => {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [fetched, setFetched] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [stateSearchedByUser, setState] = useState()
  const [isStateFound, setIsStateFound] = useState(true)
  const [distDataAr, setDistDataAr] = useState([])
  function searchState(state) {
    console.log(data)
    console.log('here in search', state)
    const states = Object.keys(data)
    const searchedState = states.filter(item =>
      item.trim().toLowerCase().match(state.trim().toLowerCase())
    )
    if (searchedState.length === 0) {
      setIsStateFound(false)
    } else {
      setIsStateFound(true)
      setState(data[searchedState[0]])
      const distDataAr = Object.keys(data[searchedState[0]].districtData).map(key => ({
        ...data[searchedState[0]].districtData[key],
        name: key,
      }))
      setDistDataAr(distDataAr)
      console.log(distDataAr)
    }
  }

  //Making API
  useEffect(() => {
    fetch('https://api.covid19india.org/state_district_wise.json')
      .then(res => res.json())
      .then(res => {
        setData(res)
        setIsLoading(false)
        setHasError(false)
        setFetched(true)
      })
      .catch(e => {
        console.log(e)
        setHasError(true)
      })
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <View>
      <Searchbar searchState={searchState} />
      <Button title='search' onPress={() => searchState('haryana')} />
      <FlatList
        data={distDataAr}
        extraData={distDataAr}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  )
}

const style = StyleSheet.create({})

export default India

/*

const StateWise = props => {
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [stateSearchedByUser, setState] = useState()
  const [isStateFound, setIsStateFound] = useState(false)

  function search(state) {
    const states = Object.keys(results)
    const searchedState = states.filter(item =>
      item.trim().toLowerCase().match(state.trim().toLowerCase())
    )
    if (searchedState.length === 0) {
      setIsStateFound(false)
    } else {
      setIsStateFound(true)
      setState(results[searchedState[0]])
      console.log(stateSearchedByUser)
    }
  }

  const handleSearch = searchedState => {
    setIsLoading(true)
    console.log(search)
    if (results === null) {
      fetch('https://api.covid19india.org/state_district_wise.json')
        .then(res => res.json())
        .then(res => {
          console.log('searching from results that are being fetched')
          setResults(res.data)
          setIsLoading(false)
          setHasError(false)
          search(searchedState)
        })
        .catch(e => {
          setHasError(true)
        })
        .finally(() => setIsLoading(false))
    } else {
      setIsLoading(false)
      console.log('searching from fetched results')
      setHasError(false)
      search(searchedState)
    }
  }
  return (
    <View style={styles.main}>
      <Searchbar ph={'Search for state data'} handleSearch={handleSearch} />
      {isLoading && (
        <Text style={{ textAlign: 'center', backgroundColor: 'pink', marginVertical: 5 }}>
          Searching state data ...
        </Text>
      )}
      {hasError && (
        <Text style={{ textAlign: 'center', backgroundColor: 'pink', marginVertical: 5 }}>
          Something wrong search again ...
        </Text>
      )}
      {!isStateFound && (
        <Text style={{ textAlign: 'center', backgroundColor: 'pink', marginVertical: 5 }}>
          No State Found with this name...
        </Text>
      )}
      <View style={styles.stateDataView}></View>
    </View>
  )
}

*/
