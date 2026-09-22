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
    const { category } = await req.json()
    if (!category || typeof category !== "string") {
      return json({ success: false, error: "category is required" }, 400)
    }

    const mealResponse = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`,
    )
    if (!mealResponse.ok) {
      throw new Error("TheMealDB category request failed")
    }

    const mealData = await mealResponse.json()
    const meals = mealData.meals ?? []
    if (meals.length === 0) {
      return json({ success: true, count: 0 })
    }

    const rows = meals.map((meal: { idMeal: string; strMeal: string; strMealThumb: string }) => ({
      dish_id: meal.idMeal,
      dish: meal.strMeal,
      image_url: meal.strMealThumb,
      category,
    }))

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    )

    const { error } = await supabase.from("dishes").upsert(rows, { onConflict: "dish_id" })
    if (error) throw error

    return json({ success: true, count: rows.length })
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
