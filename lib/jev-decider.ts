"use server";

import { createVercelGatewayDecider } from "@tanstack/ai-vercel-gateway";

type JevProvider = "vercel" | "typesafe" | "openrouter";

export async function getJevDecider() {
  const provider = (process.env.JEV_PROVIDER || "vercel") as JevProvider;

  switch (provider) {
    case "vercel": {
      const apiKey = process.env.AI_GATEWAY_API_KEY;
      if (!apiKey) {
        throw new Error("AI_GATEWAY_API_KEY ortam değişkeni ayarlanmamış");
      }
      return createVercelGatewayDecider("typesafe-ai/jev", apiKey);
    }
    case "typesafe": {
      throw new Error(
        "TypeSafe sağlayıcısı için @tanstack/ai-typesafe paketi gerekli"
      );
    }
    case "openrouter": {
      throw new Error(
        "OpenRouter sağlayıcısı için @tanstack/ai-openrouter paketi gerekli"
      );
    }
    default:
      throw new Error(`Bilinmeyen sağlayıcı: ${provider}`);
  }
}
