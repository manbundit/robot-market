import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { getRobots } from 'service/robot.api'
import { useCartState } from 'context/cart-context'
import Filter from 'components/general/Filter'
import RobotCard from 'components/robox-list/RobotCard'
import styles from 'styles/component/robot-list/robot-list.module.scss'

export default function RoboxList() {
  const { cartItems } = useCartState()
  const listRef = useRef()
  const [robots, setRobots] = useState([])
  const [filterValue, setFilterValue] = useState()
  const [filterList, setFilterList] = useState({})  
  const [page, setPage] = useState(1)
  const limit = 10
  const fetchRobots = useCallback(async () => {
    try {
      const response = await getRobots()
      setRobots(response.data.data)
      const filterMap = {}
      response.data.data.forEach((data) => {  
        filterMap[data.material] = true   
      })
      setFilterList(filterMap)
    } catch(e) {
      console.log(e)
    }
  }, [])

  useEffect(() => {
    fetchRobots()
  }, [fetchRobots])  

  useEffect(() => {
    setPage(1)    
  }, [filterValue])

  const robotsToShow = useMemo(() => {     
    let filteredRobots = [...robots]
    if (filterValue) {      
      filteredRobots = robots.filter((robot) => robot.material === filterValue)
    }
    return filteredRobots.map((data) => {
      const robotInCart = cartItems.find((item) => item.name === data.name)
      const mappedData = {
        ...data, 
        stockLeft: data.stock - (robotInCart ? robotInCart.quantity : 0)
      }
      return mappedData
   })
  }, [filterValue, robots, cartItems])
  
  const loadMoreRobots = useCallback(() => {
    if (page < Math.ceil(robotsToShow.length/limit)) {
      setPage(page + 1)
    }
  }, [robotsToShow, page])

  useInfiniteLoad(listRef, loadMoreRobots)
  
  return (
    <>
    <Filter list={Object.keys(filterList)} onChange={setFilterValue} selectedValue={filterValue}/>
    <div className={styles.grid} ref={listRef}>
      {robotsToShow.slice(0, page * limit).map((item) => (
        <RobotCard key={item.name} {...item} />
      ))}
    </div>
    </>
  )
}

const useInfiniteLoad = (ref, loadFunction) => {
  const infiniteLoad = useCallback(() => {
    const scrollPosition = window.scrollY + window.innerHeight + 40
    if (!ref) return
    if (scrollPosition >= ref.current.offsetTop + ref.current.clientHeight) {
      loadFunction()
    }
  }, [ref, loadFunction])

  useEffect(() => {
    window.addEventListener('scroll', infiniteLoad)
    return () => window.removeEventListener('scroll', infiniteLoad)
  }, [infiniteLoad])
}