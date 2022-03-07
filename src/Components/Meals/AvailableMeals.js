import classes from './AvailableMeals.module.css';
import MealItem from './MealsItem/MealItem';
import Card from '../Ui/Card';
import { useEffect ,useState} from 'react';



const AvailableMeals=()=>{

  const[meals,setMeals]=useState([])
  const[isloading,setIsLoading]=useState(true);
  const[httpError,setHttpError]=useState();

useEffect(()=>{
  const fetchMeals=async()=>{
    setIsLoading(true);
const response=await fetch('https://react-http-a3fe1-default-rtdb.firebaseio.com/meals.json');

if(!response.ok){
  throw new Error('Something went wrong!');
}

const responsedata=await response.json();
const loadedMeals=[];


for(const key in responsedata){
  loadedMeals.push({
    id:key,
    name:responsedata[key].name,
    description:responsedata[key].description,
    price:responsedata[key].price,
  })
}
setMeals(loadedMeals);
setIsLoading(false);
  }

  fetchMeals().catch((error)=>{
    setIsLoading(false);
    setHttpError(error.message);
  });
  
},[])

if(isloading){
  return <section className={classes.mealsLoading}>
    <p>Loading...</p>
  </section>
}

if(httpError){
  return<section className={classes.MealsError}>
    <p>{httpError}</p>
  </section>
}

    const mealslist=meals.map((meal)=>
    
    <MealItem 
    key={meal.id}
    id={meal.id}
     name={meal.name}
      description={meal.description} 
      price={meal.price}
      />);
    return <section className={classes.meals}>
        <Card>
        <ul>
        {mealslist}
        </ul>
        </Card>
    </section>
}

export default AvailableMeals;