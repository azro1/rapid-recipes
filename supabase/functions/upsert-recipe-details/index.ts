import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "jsr:@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const { id } = await req.json()
    if (!id || (typeof id !== "string" && typeof id !== "number")) {
      return json({ success: false, error: "id is required" }, 400)
    }

    const mealResponse = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(String(id))}`,
    )
    if (!mealResponse.ok) {
      throw new Error("TheMealDB recipe request failed")
    }

    const mealData = await mealResponse.json()
    const meal = mealData.meals?.[0]
    if (!meal) {
      return json({ success: false, error: "Recipe not found" }, 404)
    }

    const ingredients: string[] = []
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`]?.trim()
      const measure = meal[`strMeasure${i}`]?.trim()
      if (!ingredient) continue
      ingredients.push(measure ? `${measure} ${ingredient}` : ingredient)
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    )

    const { error } = await supabase.from("recipes").upsert({
      recipe_id: meal.idMeal,
      title: meal.strMeal,
      category: meal.strCategory,
      instructions: meal.strInstructions ?? "",
      image_url: meal.strMealThumb,
      youtube_url: meal.strYoutube || null,
      source_url: meal.strSource || null,
      ingredients,
    }, { onConflict: "recipe_id" })

    if (error) throw error

    return json({ success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    return json({ success: false, error: message }, 500)
  }
})

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  })
}
