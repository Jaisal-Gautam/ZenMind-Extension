import {
  Users,
  Tv,
  Gamepad2,
  ShoppingBag,
  MessageCircle,
} from "lucide-react";

export const blocking_category = [
  {
    id: "social",
    name: "Social Media",
    icon: Users,
    color: "#3B82F6",
    domains: [
      "instagram.com",
      "facebook.com",
      "x.com",
      "twitter.com",
      "threads.net",
      "reddit.com",
      "snapchat.com",
      "linkedin.com",
      "pinterest.com",
      "tumblr.com",
    ],
  },

  {
    id: "entertainment",
    name: "Entertainment",
    icon: Tv,
    color: "#8B5CF6",
    domains: [
      "youtube.com",
      "netflix.com",
      "primevideo.com",
      "disneyplus.com",
      "twitch.tv",
      "hotstar.com",
      "hulu.com",
      "sonyliv.com",
      "zee5.com",
    ],
  },

  {
    id: "gaming",
    name: "Gaming",
    icon: Gamepad2,
    color: "#F97316",
    domains: [
      "store.steampowered.com",
      "steamcommunity.com",
      "epicgames.com",
      "roblox.com",
      "minecraft.net",
      "ea.com",
      "riotgames.com",
      "battle.net",
    ],
  },

  {
    id: "shopping",
    name: "Shopping",
    icon: ShoppingBag,
    color: "#10B981",
    domains: [
      "amazon.com",
      "amazon.in",
      "flipkart.com",
      "myntra.com",
      "ebay.com",
      "ajio.com",
      "meesho.com",
      "nykaa.com",
    ],
  },

  {
    id: "messaging",
    name: "Messaging",
    icon: MessageCircle,
    color: "#06B6D4",
    domains: [
      "web.whatsapp.com",
      "discord.com",
      "web.telegram.org",
      "messenger.com",
      "slack.com",
      "teams.microsoft.com",
    ],
  },
];