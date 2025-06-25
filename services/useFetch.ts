//fetchMovies

import { useEffect, useState } from "react"

//fetchMovieDetails

//useFetch(fetchMovies)


//useFetch hook
const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    //states
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null)

//function that fetches the data
const fetchData = async () => {
    try{
      setLoading(true)
      setError(null)

      const result = await fetchFunction()

      setData(result)

    }catch(err){
        setError(err instanceof Error ? err : new Error('An error occured'));
    }finally{
        setLoading(false)
    }
}

//reset function
const reset = () => {
    setData(null)
    setLoading(false);
    setError(null)
}
//useEffect: which is called when you want to do something at the start of your compnent or want to mount your component.

useEffect(() => {
  if(autoFetch){
    fetchData()
  }

 
}, []);

//hooks have to return something so we return the following

return {data, loading, error, refetch: fetchData, reset}

}

export default useFetch