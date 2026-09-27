const fetchRandomMeal = async (avoidId) => {
  let meal = null

  for (let attempt = 0; attempt < 4; attempt += 1) {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    if (!response.ok) throw new Error('Could not choose a recipe')
    const data = await response.json()
    meal = data?.meals?.[0]
    if (!meal?.idMeal || !meal?.strMeal) throw new Error('Could not choose a recipe')
    if (avoidId == null || String(meal.idMeal) !== String(avoidId)) break
  }

  return { id: meal.idMeal, dish: meal.strMeal }
}

export default fetchRandomMeal
