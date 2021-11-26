import React, { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';
import useHttp from '../../hooks/use-http';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const { sendRequest: fetchMeals, error, isLoading } = useHttp();

  useEffect(() => {
    const handleMealsData = data => {
      const mealsData = Object.keys(data).map(key => {
        return {
          id: key,
          ...data[key],
        };
      });
      setMeals(mealsData);
    };

    fetchMeals(
      {
        url: 'https://react-custom-hooks-5f0f7-default-rtdb.firebaseio.com/meals.json',
      },
      handleMealsData
    );
  }, [fetchMeals]);

  const mealsList = meals.map(meal => {
    return <MealItem key={meal.id} {...meal} />;
  });

  let content = <p>Meals not found</p>;
  if (isLoading) content = <p>Loading meals...</p>;
  if (meals.length > 0) content = <ul>{mealsList}</ul>;
  if (error) content = <p>{error}</p>;

  return (
    <section className={classes.meals}>
      <Card>{content}</Card>
    </section>
  );
};

export default AvailableMeals;
